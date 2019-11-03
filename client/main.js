$(document).ready(function() {
	$('section').hide();
	$('.form-control').focusin(inputValidationReset);
	addScroll();
	emptyPasswordOnFocus();
	isSignIn();
	$('html, body').click(function() {
		$('#navbarToggler').collapse('hide');
	});
	$('#to-create-todo').click(showCreateTodo);
});

function addScroll() {
	$('.to-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, '1000');
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
	if (localStorage.jwt_token) {
		verifyToken(localStorage.jwt_token)
			.done(() => {
				showTodos();
			})
			.fail(() => {
				showSignIn();
			});
	} else {
		showSignIn();
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
	$('#signup-section').hide();
	$('#todos-section').hide();
	$('#create-todo-section').hide();
	$('#todo-detail-section').hide();
	$('.navbar').hide();
	$('#signin-section').fadeIn('slow');
	$('#l-form')
		.unbind('submit')
		.submit(signIn);
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

function inputValidationReset() {
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
				$('#nav-brand').addClass('d-lg-flex');
				$('#top').slideUp('slow');
				$('#signin-section').hide();
				resetFormInputValue();
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
			$('#nav-brand').addClass('d-lg-flex');
			$('#top').slideUp('slow');
			$('#signin-section').hide();
			$('#signup-section').hide();
			showTodos();
		})
		.always(() => {
			resetSignInButton();
		});
}

function showSignUp(event) {
	event.preventDefault();
	$('#signin-section').hide();
	$('#signup-section').fadeIn('slow');
	$('#r-form')
		.unbind('submit')
		.submit(signUp);
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
				resetFormInputValue();
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
		event.preventDefault();
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
		localStorage.removeItem('jwt_token');
		isSignIn();
	});
}

async function showTodos() {
	$('#home-nav')
		.parent()
		.addClass('active');
	$('#to-create-todo')
		.parent()
		.removeClass('active');
	$('#todos-section').slideUp();
	$('#top').hide();
	$('.navbar').slideDown('slow');
	addSignOut();
	$('#todo-list').empty().append(`
		<div class="col-12 col-md-6 col-lg-4 mb-4" id="todo-create">
			<div class="fdb-box fdb-touch pb-3 pt-4">
				<h2>Your Todo Is Empty</h2>
				<p>
					Looks like your todo is empty. You can create new todo by clicking the link below.
				</p>
				<p><a href="" id="btn-create-new">Create New Todo</a></p>
			</div>
		</div>
	`);
	$('#btn-create-new').click(showCreateTodo);
	const user = await getUserTodos().catch(err => console.log(err));
	if (!user) return;
	if (user.todos.length > 0 && $('#todo-list').children().length <= 1) {
		$('#todo-create h2').text('Create New Todo');
		$('#todo-create p:first').text(
			'Here is your todo list, ordered by the nearest due date. ' +
				'You can click Details on any todo to see the full description of your todo, ' +
				'and make changes if necessary.	To create new todo, click the link below.'
		);
		for (const todo of user.todos) {
			$('#todo-list').append(`
			<div class="col-12 col-md-6 col-lg-4 mb-4 todo-card">
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
					<div class="row justify-content-center">
						<div class="btn-group btn-group-sm" role="group">
							<button href="" type="button" class="btn btn-primary btn-todo-detail">Details</button>
							${
								todo.status
									? '<button type="button" class="btn btn-success btn-todo-complete disabled no-cursor">Completed</button>'
									: '<button href="" type="button" class="btn btn-success btn-todo-complete">Mark Complete</button>'
							} 
							<button href="" type="button" class="btn btn-danger btn-todo-delete">Delete</button>
						</div>
					</div>
				</div>
			</div>
    `);
		}
	}
	activateTodoButton();
	$('#todos-section').show('slow');
}

async function getUserTodos() {
	let payload = await verifyToken(localStorage.getItem('jwt_token'));
	let user = await $.ajax({
		method: 'GET',
		url: `http://localhost:3000/user/${payload.id}`
	});
	return user;
}

function activateTodoButton() {
	$('.btn-todo-detail').click(showTodoDetail);
	$('.btn-todo-complete').click(completeTodo);
	$('.btn-todo-delete').click(deleteTodo);
}

function showCreateTodo(event) {
	if (event) event.preventDefault();
	$('#home-nav')
		.parent()
		.removeClass('active');
	$('#to-create-todo')
		.parent()
		.addClass('active');
	$('#todos-section').hide('slow');
	$('#create-todo-section').fadeIn('slow');
	$('#c-cancel').click(() => {
		resetFormInputValue();
		$('#create-todo-section').fadeOut('slow');
		showTodos();
	});
	$('#c-form')
		.unbind('submit')
		.submit(createTodo);
	$('#c-submit').click(loadingCreateTodo);
}

function loadingCreateTodo() {
	$('#c-submit')
		.empty()
		.append(
			`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Creating Todo...
	`
		)
		.addClass('disabled no-cursor');
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
				resetFormInputValue();
				$('#create-todo-section').fadeOut('slow');
				showTodos();
			})
			.fail(err => {
				console.log(err);
			});
	}
}

function resetFormInputValue() {
	$('form input, form textarea').each(function(index) {
		$(this).val('');
	});
}

function resetCreateTodoButton() {
	$('#c-submit')
		.empty()
		.append('Create')
		.removeClass('disabled no-cursor');
}

function completeTodo(event) {
	event.preventDefault();
	if ($(event.target).hasClass('disabled')) {
		return;
	}
	loadingCompleteTodo(event);
	const id = $(event.target).parents('.fdb-box')[0].id;
	$.ajax({
		method: 'PATCH',
		url: `http://localhost:3000/todos/${id}`,
		data: {
			status: true
		}
	})
		.done(response => {
			resetLoadingCompleteTodo(event);
			$(event.target)
				.addClass('disabled no-cursor')
				.removeAttr('href');
		})
		.fail(err => console.log(err));
}

function loadingCompleteTodo(event) {
	event.preventDefault();
	$(event.target).empty().append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Marking...
	`);
}

function resetLoadingCompleteTodo(event) {
	event.preventDefault();
	$(event.target)
		.empty()
		.text('Completed');
}

async function deleteTodo(event) {
	if (event) event.preventDefault();
	const sibling = loadingDeleteTodo(event);
	Swal.fire({
		title: 'Are you sure to delete this todo?',
		text:
			"You won't be able too see it again. " +
			'If you just need to move away this todo, just mark it as completed.',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Delete anyway'
	}).then(result => {
		if (result.value) {
			const id = $(event.target).parents('.fdb-box')[0].id;
			const top = $(this).offset().top;
			$.ajax({
				method: 'DELETE',
				url: `http://localhost:3000/todos/${id}`
			})
				.done(async response => {
					$(event.target)
						.parents('.fdb-box')
						.slideUp('slow');
					await Swal.fire('Deleted', 'Your todo has been deleted.');
					$(event.target)
						.parents('.fdb-box')
						.remove();

					showTodos().then(() => {
						$('html, body').animate({ scrollTop: top }, '1000');
					});
				})
				.fail(err => console.log(err));
		} else {
			resetLoadingDeleteTodo(event, sibling);
		}
	});
}

function loadingDeleteTodo(event) {
	event.preventDefault();
	const sibling = $(event.target)
		.siblings()
		.detach();
	$(event.target).empty().append(`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Deleting...
	`);
	return sibling;
}

function resetLoadingDeleteTodo(event, sibling) {
	event.preventDefault();
	$(event.target)
		.parent()
		.prepend(sibling);
	$(event.target)
		.empty()
		.text('Delete');
}

async function showTodoDetail(event) {
	if (event) event.preventDefault();
	$('#home-nav')
		.parent()
		.removeClass('active');
	$('#to-create-todo')
		.parent()
		.removeClass('active');
	$('#todos-section').slideUp('slow');
	$('#todo-detail-section').fadeIn('slow');
	const top = $(this).offset().top;
	await fillTodoDetail(event);
	if (
		$(event.target)
			.siblings()
			.hasClass('disabled')
	) {
		$('#d-edit').addClass('disabled no-cursor');
	} else {
		$('#d-edit').click(showEditTodo);
	}
	$('#d-back').click(function(event) {
		event.preventDefault();
		$('#todo-detail-section').fadeOut('slow');
		showTodos();
		$('html, body').animate({ scrollTop: top }, '1000');
	});
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
	$('#e-form').data('id', id);
}

function showEditTodo(event) {
	event.preventDefault();
	$('#todo-detail-section').fadeOut('fast');
	setTimeout(() => {
		$('#d-edit').hide();
		$('#d-back').hide();
		$('#d-name').text('Edit Todo');
		$('#d-due').text('');
		$('#d-desc').text(
			'Seems like you mistyped something? Wanna change ' +
				"your todo name? Can't accomplish the task and need more time? " +
				'simply edit as you wish and hit save.'
		);
		$('#e-form').show();
		$('#todo-detail-section').fadeIn('slow');
	}, 400);

	$('#e-cancel').click(() => {
		$('#todo-detail-section').fadeOut('slow');
		resetTodoDetail();
		showTodos();
	});
	$('#e-form')
		.unbind('submit')
		.submit(updateTodo);
	$('#e-submit').click(loadingUpdateTodo);
}

function resetTodoDetail() {
	$('#d-edit').show(1000, 'swing');
	$('#d-back').show(1000, 'swing');
	$('#e-form').hide(1000, 'swing');
}

function updateTodo(event) {
	event.preventDefault();
	const id = $('#e-form').data('id');
	const name = $('#e-name')
		.val()
		.trim();
	const description = $('#e-desc')
		.val()
		.trim();
	const due_date = $('#e-due')
		.val()
		.trim();
	if (!name) {
		$('#e-name').addClass('is-invalid');
		resetLoadingUpdateTodoButton();
	} else {
		$.ajax({
			method: 'PUT',
			url: `http://localhost:3000/todos/${id}`,
			data: {
				name,
				description,
				due_date: due_date || new Date()
			}
		})
			.done(response => {
				resetTodoDetail();
				resetLoadingUpdateTodoButton();
				$('#todo-detail-section').fadeOut('slow');
				showTodos();
			})
			.fail(err => {
				console.log(err);
			});
	}
}

function loadingUpdateTodo() {
	$('#e-submit')
		.empty()
		.append(
			`
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Updating Todo...
	`
		)
		.addClass('disabled no-cursor');
}

function resetLoadingUpdateTodoButton() {
	$('#e-submit')
		.empty()
		.text('Save')
		.removeClass('disabled no-cursor');
}
