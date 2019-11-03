$(document).ready(function() {
	addDatePicker();
	addScroll();
	isSignIn();
});

function addDatePicker() {
	$('[data-toggle="datepicker"]').datepicker({ zIndex: 2000, format: 'yyyy/mm/dd' });
}

function addScroll() {
	$('.to-top').click(function() {
		$('html,body').animate({ scrollTop: $('#top').offset().top }, '1000');
		return false;
	});
}

function isSignIn() {
	jwt_token = localStorage.getItem('jwt_token');
	if (!localStorage.jwt_token) {
		showSignIn();
	} else {
		verifyToken(jwt_token)
			.done(() => {
				showTodos();
			})
			.fail(() => {
				showSignIn();
			});
	}
}

function verifyToken(jwt_token) {
	return $.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/verify-token',
		data: {
			jwt_token
		}
	});
}

function showSignIn() {
	$('.navbar').hide();
	$('#todos-section').hide();
	$('#l-form').submit(signIn);
	$('.l-submit').click(loadingSignIn);
	$('.form-control').focusin(formReset);
}

function loadingSignIn(event) {
	event.preventDefault();
	$('#l-submit-loading').empty();
	$('#l-submit-loading').append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Signing In...
	`);
	$('#l-submit-loading').addClass('disabled no-cursor');
	$('#l-form').submit();
}

function formReset() {
	$(this).removeClass('is-invalid');
}

function signIn(event) {
	console.log('masuk');
	event.preventDefault();
	const username = $('#l-username')
		.val()
		.trim();
	const password = $('#l-password')
		.val()
		.trim();
	if (!username) {
		$('#l-username')
			.addClass('is-invalid')
			.next()
			.text('username cannot empty!');
		resetSignInButton();
	}
	if (!password) {
		$('#l-password')
			.addClass('is-invalid')
			.next()
			.text('password cannot empty!');
		resetSignInButton();
	} else {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/user/signin',
			data: {
				username,
				password
			}
		})
			.done(response => {
				console.log('sukses');
				localStorage.setItem('jwt_token', response.jwt_token);
				showTodos();
			})
			.fail(err => {
				console.log(err);
				switch (err.responseJSON.message) {
					case 'Username/Password wrong.':
						$('#l-password')
							.addClass('is-invalid')
							.next()
							.text('Username/Password wrong.');
						break;
					default:
						console.log(err.responseJSON.message);
				}
			})
			.always(() => {
				resetSignInButton();
			});
	}
}

function resetSignInButton() {
	$('#l-submit-loading')
		.empty()
		.append('Sign In')
		.removeClass('disabled no-cursor');
}

function googleSignin(googleUser) {
	const g_token = googleUser.getAuthResponse().id_token;
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/google-signing',
		data: {
			g_token
		}
	}).done(response => {
		console.log('sukses');
		localStorage.setItem('jwt_token', response.jwt_token);
		showTodos();
	});
}

function addSignOut() {
	$('#btn-signout').click(function(event) {
		// event.preventDefault();
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function() {
			console.log('User signed out.');
		});
		localStorage.removeItem('jwt_token');
	});
}

async function showTodos() {
	$('.navbar').show();
	$('#nav-brand').addClass('d-lg-flex');
	$('#signin-section').hide();
	$('#todos-section').show();
	addSignOut();
	const user = await getUserTodos().catch(err => console.log(err));
	if (!user) return;
	if (user.todos.length < 1) {
		$('.masonry').empty();
		$('.masonry').append(`
			<div class="masonry-brick">
				<div class="card masonry-content">
					<div class="card-body">
						<p class="card-title">Click to Create new Todo!</p>
					</div>
					<small><a style="cursor: pointer;" class="btn stretched-link" data-toggle="modal" data-target="#todo-create-modal"></a></small>
				</div>
			</div>
			
		`);
		createTodo();
		return;
	}
	$('.masonry').empty();
	let counter = 0;
	for (const todo of user.todos) {
		let wrapper = '';
		if (counter % 2 === 0) {
			wrapper += '<div class="w-100 d-none d-sm-block d-md-none"></div>';
		}
		if (counter % 3 === 0) {
			wrapper += '<div class="w-100 d-none d-md-block d-lg-none"></div>';
		}
		if (counter % 4 === 0) {
			wrapper += '<div class="w-100 d-none d-lg-block"></div>';
		}

		counter++;
		$('.masonry').append(`
			<div class="masonry-brick">
				<div class="card masonry-content" id="${todo._id}">
					<div class="card-header ">
						<h5 class="mr-auto">${todo.name}</h5>
					</div>
					<div class="card-body">
						<small><a href="" class="v-hidden stretched-link" data-toggle="modal" data-target="#todo-detail-modal"></a></small>
						<h6 class="card-subtitle mb-2"><small class="text-muted">Due ${new Date(
							todo.due_date
						).toLocaleDateString('en-US', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}</small></h6>
						<p class="card-text">${todo.description}</p>
					</div>
				</div>
			</div>
    `);
	}
	$('#todo-detail-modal').on('show.bs.modal', getTodoDetail);
	resizeAllMasonryItems();
	var masonryEvents = ['load', 'resize'];
	masonryEvents.forEach(function(event) {
		window.addEventListener(event, resizeAllMasonryItems);
	});
	createTodo();
}

async function getUserTodos() {
	let payload = await verifyToken(localStorage.getItem('jwt_token'));
	let user = await $.ajax({
		method: 'GET',
		url: `http://localhost:3000/user/${payload.id}`
	});
	return user;
}

async function getTodoDetail(event) {
	const id = $(event.relatedTarget).parents('.card')[0].id;
	const todo = await $.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/${id}`
	});
	if (!todo) return;
	$('#m-todo-title').text(todo.name);
	$('#m-todo-due').text(
		new Date(todo.due_date).toLocaleDateString('id-ID', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);
	$('#m-todo-desc').text(todo.description);
}

function createTodo() {
	const name = $('#t-name')
		.val()
		.trim();
	const description = $('#t-desc')
		.val()
		.trim();
	const due_date = $('#t-due')
		.val()
		.trim();
	const jwt_token = localStorage.getItem('jwt_token');
	$('#t-form').submit(function(event) {
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/todos/',
			data: {
				name,
				description,
				due_date,
				jwt_token
			}
		})
			.done(response => {
				console.log(response);
			})
			.fail(err => {
				console.log(err);
			});
	});
	// $('#t-submit').click(function(event) {
	// 	event.preventDefault();
	// 	$('#t-form').submit();
	// });
}

function resizeMasonryItem(item) {
	/* Get the grid object, its row-gap, and the size of its implicit rows */
	var grid = document.getElementsByClassName('masonry')[0],
		rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
		rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

	var rowSpan = Math.ceil(
		(item.querySelector('.masonry-content').getBoundingClientRect().height + rowGap) /
			(rowHeight + rowGap)
	);

	/* Set the spanning as calculated above (S) */
	item.style.gridRowEnd = 'span ' + rowSpan;
}

function resizeAllMasonryItems() {
	// Get all item class objects in one list
	var allItems = document.getElementsByClassName('masonry-brick');

	/*
	 * Loop through the above list and execute the spanning function to
	 * each list-item (i.e. each masonry item)
	 */
	for (var i = 0; i < allItems.length; i++) {
		resizeMasonryItem(allItems[i]);
	}
}
