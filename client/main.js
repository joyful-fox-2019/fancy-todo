$(document).ready(isSignIn);

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
	$('.form-control').focusin(formReset);
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

async function showTodos() {
	$('.navbar').show();
	$('#nav-brand').addClass('d-lg-flex');
	$('#signin-section').hide();
	$('#todos-section').show();
	const user = await getUserTodos().catch(err => console.log(err));
	if (!user) return;
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
