$(document).ready(isSignIn);

function isSignIn() {
	jwt_token = localStorage.getItem('jwt_token');
	if (!localStorage.jwt_token) {
		showSignIn();
	} else {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/user/verify-token',
			data: {
				jwt_token
			}
		})
			.done(() => {
				showTodos();
			})
			.fail(() => {
				showSignIn();
			});
	}
}

function showSignIn() {
	$('.navbar').hide();
	$('#todos-section').hide();
	$('#l-form').submit(signIn);
	$('.form-control').focusin(formReset);
}

function showTodos() {
	$('.navbar').show();
	$('#nav-brand').addClass('d-lg-flex');
	$('#signin-section').hide();
	$('#todos-section').show();
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
