$(document).ready(function() {
	$('.form-control').focusin(formReset);
	addDatePicker();
	addScroll();
	emptyPasswordOnFocus();
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

function emptyPasswordOnFocus() {
	$('input[type=password]').focusin(function(event) {
		$(this).val('');
	});
}

function emptyAllPassword() {
	$('input[type=password]').focusin();
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

function showSignIn(event) {
	if (event) event.preventDefault();
	$('.navbar').hide();
	$('#signup-section').hide();
	$('#todos-section').hide();
	$('#signin-section').show();
	$('#l-form').submit(signIn);
	$('.l-submit').click(loadingSignIn);
	$('#signup-link').click(showSignUp);
}

function loadingSignIn(event) {
	event.preventDefault();
	$('#l-submit-loading').empty();
	$('#l-submit-loading').append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Signing In...
	`);
	$('#l-submit-loading').addClass('disabled no-cursor');
	if (!$(this).hasClass('g-signin2')) {
		$('#l-form').submit();
	}
}

function formReset() {
	$(this).removeClass('is-invalid');
}

function signIn(event) {
	event.preventDefault();
	const username = $('#l-username')
		.val()
		.trim();
	const password = $('#l-password')
		.val()
		.trim();
	let valid = true;
	if (!username) {
		$('#l-username')
			.addClass('is-invalid')
			.next()
			.text('username cannot empty!');
		resetSignInButton();
		valid = false;
	}
	if (!password) {
		$('#l-password')
			.addClass('is-invalid')
			.next()
			.text('password cannot empty!');
		resetSignInButton();
		valid = false;
	}
	if (valid) {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/user/signin',
			data: {
				username,
				password
			}
		})
			.done(response => {
				localStorage.setItem('jwt_token', response.jwt_token);
				showTodos();
			})
			.fail(err => {
				for (const msg of err.responseJSON.message) {
					switch (msg) {
						case 'Username/Password wrong.':
							$('#l-password')
								.addClass('is-invalid')
								.next()
								.text('Username/Password wrong.');
							$('#l-username')
								.addClass('is-invalid')
								.next()
								.text('');
							break;
						default:
							console.log(msg);
					}
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
	})
		.done(response => {
			localStorage.setItem('jwt_token', response.jwt_token);
			showTodos();
		})
		.always(() => {
			resetSignInButton();
		});
}

function showSignUp(event) {
	event.preventDefault();
	$('#signin-section').hide();
	$('#signup-section').show();
	$('#r-form').submit(signUp);
	$('.r-submit').click(loadingSignUp);
	signupClientValidation();
	$('#signin-link').click(showSignIn);
}

function loadingSignUp(event) {
	event.preventDefault();
	$('#r-submit-loading').empty();
	$('#r-submit-loading').append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Signing In...
	`);
	$('#r-submit-loading').addClass('disabled no-cursor');
	if (!$(this).hasClass('g-signin2')) {
		$('#r-form').submit();
	}
}

function resetSignUpButton() {
	$('#r-submit-loading')
		.empty()
		.append('Sign Up')
		.removeClass('disabled no-cursor');
}

function signupClientValidation() {
	$('#r-password').on('keyup', function(e) {
		if ($(this).val().length < 6) {
			$(this)
				.removeClass('is-valid')
				.addClass('is-invalid');
		} else {
			$(this)
				.removeClass('is-invalid')
				.addClass('is-valid');
		}
	});

	$('#r-password').on('focusout', function(e) {
		if ($(this).val() != $('#r-confirm-password').val()) {
			$('#r-confirm-password')
				.removeClass('is-valid')
				.addClass('is-invalid');
		} else {
			$('#r-confirm-password')
				.removeClass('invalid')
				.addClass('valid');
		}
	});

	$('#r-confirm-password').on('keyup', function(e) {
		if ($('#r-password').val() != $(this).val()) {
			$(this)
				.removeClass('is-valid')
				.addClass('is-invalid');
		} else {
			$(this)
				.removeClass('is-invalid')
				.addClass('is-valid');
		}
	});
}

function signUp(event) {
	event.preventDefault();
	const username = $('#r-username')
		.val()
		.trim();
	const password = $('#r-password')
		.val()
		.trim();
	const email = $('#r-email')
		.val()
		.trim();
	let valid = true;
	if (!username) {
		$('#r-username').addClass('is-invalid');
		resetSignUpButton();
		valid = false;
	}
	if (!password) {
		$('#r-password').addClass('is-invalid');
		resetSignUpButton();
		valid = false;
	}
	if (!email) {
		$('#r-email').addClass('is-invalid');
		resetSignUpButton();
		valid = false;
	}
	if (valid) {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/user/register',
			data: {
				username,
				email,
				password
			}
		})
			.done(response => {
				showSignIn();
			})
			.fail(err => {
				emptyAllPassword();
				$('input[type=password]').removeClass('is-valid');
				for (const msg of err.responseJSON.message) {
					switch (msg) {
						case 'Username must be unique.':
							$('#r-username')
								.addClass('is-invalid')
								.next()
								.text('Username already taken.');
							break;
						case 'Email must be unique.':
							$('#r-email')
								.addClass('is-invalid')
								.next()
								.text(
									'Email already used. If you never sign up before, use Google sign in instead.'
								);
							break;
						default:
							console.log(msg);
					}
				}
			})
			.always(() => {
				resetSignUpButton();
			});
	}
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
	$('#top').hide();
	$('.navbar').show();
	$('#nav-brand').addClass('d-lg-flex');
	$('#signin-section').hide();
	$('#signup-section').hide();
	$('#todos-section').show();
	addSignOut();
	const user = await getUserTodos().catch(err => console.log(err));
	if (!user) return;
	if (user.todos.length < 1) {
		$('#todo-create h2').text('Your Todo Is Empty');
		$('#todo-create p:first').text(
			'Looks like your todo is empty. You can create new todo by clicking the link below.'
		);

		return;
	}
	// $('#todo-list').empty();
	for (const todo of user.todos) {
		$('#todo-list').append(`
			<div class="col-12 col-md-6 col-lg-4 mb-4">
				<div class="fdb-box fdb-touch pb-3 pt-4" id="${todo._id}">
					<h2>${todo.name}</h2>
					<h6 class="mb-2"><small class="text-muted">Due ${new Date(todo.due_date).toLocaleDateString(
						'en-US',
						{
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						}
					)}</small></h6>
					<p>${todo.description}</p>
					<p><a href="https://www.froala.com">Details</a></p>
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
