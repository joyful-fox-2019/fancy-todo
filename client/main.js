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
	$('#create-todo-section').hide();
	$('#todo-detail-section').hide();
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
	$('#todos-section').hide();
	$('#signin-section').hide();
	$('#create-todo-section').hide();
	$('#todo-detail-section').hide();
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
	$('#create-todo-section').hide();
	$('#todo-detail-section').hide();
	$('#todos-section').show();
	addSignOut();
	$('#todo-list').empty().append(`
		<div class="col-12 col-md-6 col-lg-4 mb-4" id="todo-create">
			<div class="fdb-box fdb-touch pb-3 pt-4">
				<h2>Create New Todo</h2>
				<p>
					Here is your todo lists, ordered by the nearest due date. You can click Details on
					any todo to see the full description of your todo, and make changes if necessary.
					To create new todo, click the link below.
				</p>
				<p><a href="" id="btn-create-new">Create New Todo</a></p>
			</div>
		</div>
	`);
	$('#btn-create-new').click(showCreateTodo);
	const user = await getUserTodos().catch(err => console.log(err));
	if (!user) return;
	if (user.todos.length < 1) {
		$('#todo-create h2').text('Your Todo Is Empty');
		$('#todo-create p:first').text(
			'Looks like your todo is empty. You can create new todo by clicking the link below.'
		);
		return;
	}
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
					<p><a href="" class="btn-todo-detail">Details</a></p>
				</div>
			</div>
    `);
	}
	$('.btn-todo-detail').click(showTodoDetail);
}

async function getUserTodos() {
	let payload = await verifyToken(localStorage.getItem('jwt_token'));
	let user = await $.ajax({
		method: 'GET',
		url: `http://localhost:3000/user/${payload.id}`
	});
	return user;
}

function showCreateTodo(event) {
	if (event) event.preventDefault();
	$('#todos-section').hide();
	$('#create-todo-section').show();
	$('#c-form').submit(createTodo);
	$('#c-submit').click(loadingCreateTodo);
	// $('#signin-link').click(showSignIn);
}

function loadingCreateTodo(event) {
	$('#c-submit').empty();
	$('#c-submit').append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Creating Todo...
	`);
	$('#c-submit').addClass('disabled no-cursor');
}

function createTodo(event) {
	event.preventDefault();
	const name = $('#c-name')
		.val()
		.trim();
	const description = $('#c-desc')
		.val()
		.trim();
	const due_date = $('#c-due')
		.val()
		.trim();
	if (!name) {
		$('#c-name').addClass('is-invalid');
		resetCreateTodoButton();
	} else {
		const jwt_token = localStorage.getItem('jwt_token');
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/todos',
			data: {
				name,
				description,
				due_date: due_date || new Date(),
				jwt_token
			}
		})
			.done(response => {
				resetCreateTodoButton();
				$('#c-form input').each(function(index) {
					$(this).val('');
				});
				showTodos();
			})
			.fail(err => {
				console.log(err);
			});
	}
}

function resetCreateTodoButton() {
	$('#c-submit')
		.empty()
		.append('Create')
		.removeClass('disabled no-cursor');
}

async function showTodoDetail(event) {
	if (event) event.preventDefault();
	$('#todos-section').hide();
	$('#create-todo-section').hide();
	$('#todo-detail-section').show();
	await fillTodoDetail(event);
	$('#d-edit').click(showEditTodo);
	$('#d-back').click(showTodos);
}

async function fillTodoDetail(event) {
	const id = $(event.target).parents('.fdb-box')[0].id;
	const todo = await $.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/${id}`
	});
	if (!todo) return;
	$('#d-name').text(todo.name);
	$('#e-name').val(todo.name);
	$('#d-due').text(
		new Date(todo.due_date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);
	$('#e-due').val(new Date(todo.due_date).toJSON().slice(0, 10));
	$('#d-desc').text(todo.description);
	$('#e-desc').val(todo.description);
}

function showEditTodo(event) {
	event.preventDefault();
	$('#d-edit').hide();
	$('#d-back').hide();
	$('#e-form').show();
	$('#e-cancel').click(() => {
		resetTodoDetail();
		showTodos();
	});
	$('#e-form').submit(updateTodo);
	$('#e-submit').click(loadingUpdateTodo);
}

function resetTodoDetail() {
	$('#d-edit').show();
	$('#d-back').show();
	$('#e-form').hide();
}

function updateTodo(event) {
	event.preventDefault();
	
}

function loadingUpdateTodo() {
	$('#e-submit').empty();
	$('#e-submit').append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Updating Todo...
	`);
	$('#e-submit').addClass('disabled no-cursor');
}
