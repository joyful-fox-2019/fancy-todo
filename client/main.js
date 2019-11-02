$(document).ready(function() {
	$('#todo-create-modal').on('shown.bs.modal', function(event) {
		$('[data-toggle="datepicker"]').datepicker({ zIndex: 2000, format: 'yyyy/mm/dd' });
	});
	addScroll();
	isSignIn();
});

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
	$('.l-submit').click(loadingSignIn);
	$('#l-form').submit(signIn);
	$('.form-control').focusin(formReset);
}

function loadingSignIn(event) {
	event.preventDefault();
	$('#l-submit-loading').empty();
	$('#l-submit-loading').append(`
		<span class="spinner-border" role="status" aria-hidden="true"></span>
  Loading...
	`);
	$('#l-submit-loading')
		.parent()
		.addClass('disabled');
}

function formReset() {
	$(this).removeClass('is-invalid');
}

function signIn(event) {
	event.preventDefault();
	let username = $('#l-username')
		.val()
		.trim();
	let password = $('#l-password')
		.val()
		.trim();

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
			switch (err.responseJSON.message) {
				case 'Username/Password wrong.':
					$('#l-password').addClass('is-invalid');
					$('#l-username').addClass('is-invalid');
					break;
				default:
					console.log(err.responseJSON.message);
			}
		});
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
		$('.card-deck').empty();
		$('.card-deck').append(`
			<div class="card mb-3 col-3" id="">
			<div class="card-body">
				<p class="card-title">Click to Create new Todo!</p>
			</div>
			<small><a style="cursor: pointer;" class="btn stretched-link" data-toggle="modal" data-target="#todo-create-modal"></a></small>
      </div>
		`);
		return;
	}
	$('.card-deck').empty();
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
		$('.card-deck').append(`
      ${wrapper}
      <div class="card mb-3" id="${todo._id}">
        <div class="card-header d-inline-flex">
          <h5 class="mr-auto">${todo.name}</h5>
          <small><a style="cursor: pointer;" class="btn stretched-link" data-toggle="modal" data-target="#todo-detail-modal"></a></small>
        </div>
        <div class="card-body">
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
    `);
	}
	$('#todo-detail-modal').on('show.bs.modal', getTodoDetail);
}

function todoCreateCloseConfirmation() {}

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
