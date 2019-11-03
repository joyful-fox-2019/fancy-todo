$(document).ready(function ($) {
	$('#todo_date').attr("placeholder", new Date().toLocaleDateString('en-CA'));
	tab = $('.tabs h3 a');

	tab.on('click', function (event) {
		event.preventDefault();
		tab.removeClass('active');
		$(this).addClass('active');

		tab_content = $(this).attr('href');
		$('div[id$="tab-content"]').removeClass('active');
		$(tab_content).addClass('active');
	});

	if (localStorage.getItem('ft_token')) {
		$('.main_content').show();
		$.ajax({
			method: 'get',
			url: 'http://localhost:3000/todos',
			headers: {
				ft_token: localStorage.getItem('ft_token')
			}
		})
			.done(todos => {
				console.log(localStorage.getItem('ft_picture'));
				$('#ft_username').html(localStorage.getItem('ft_username'));
				if (localStorage.getItem('ft_picture') !== 'undefined') {
					$('#ft_picture').attr('src', `data:image/png;base64,${localStorage.getItem('ft_picture')}`)
				}
				else{
					$('#ft_picture').attr('src', `./images/img_avatar5.png`)
				}
				printTodos(todos);

			})
			.fail(err => {
				console.log(err);
			})
	}
	else {
		$('.form-wrap').show();
	}
});


function signOut() {
	Swal.fire({
		title: 'Done for today?',
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yup'
	}).then((result) => {
		if (result.value) {
			Swal.fire({
				title: `See you again!`,
				type: 'success',
				confirmButtonText: `K Thx Bye`
			})
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('User signed out.');
				localStorage.removeItem('ft_token');
				localStorage.removeItem('ft_username');
				localStorage.removeItem('ft_picture');
				$('.form-wrap').show();
				$('.main_content').hide();
			});
		}
	})
}

$('#register_submit').click(function (event) {
	event.preventDefault();
	$.ajax({
		method: 'post',
		url: 'http://localhost:3000/register',
		data: {
			email: $('#user_email').val(),
			username: $('#user_name').val(),
			password: $('#user_pass').val()
		}
	})
		.done(response => {
			console.log(response);
			Swal.fire({
				title: `Welcome, ${response.msg}!`,
				text: `You can now enter Fancy Todo from Login tab`,
				type: 'success',
				confirmButtonText: `Wait, it's not automatic?`
			})
		})
		.fail(err => {
			console.log(err);
			if (err.responseJSON.code == '11000') {
				Swal.fire({
					title: `That email is already registered!`,
					type: 'error',
					confirmButtonText: `Close`
				})
			}
		})
});

$('#login_submit').click(function (event) {
	event.preventDefault();
	$.ajax({
		method: 'post',
		url: 'http://localhost:3000/signin',
		data: {
			email: $('#user_login_email').val(),
			password: $('#user_login_pass').val()
		}
	})
		.done(response => {
			console.log(response.token);
			localStorage.setItem('ft_token', response.token);
			localStorage.setItem('ft_username', response.username);
			localStorage.setItem('ft_picture', response.picture);
			$('#ft_username').html(localStorage.getItem('ft_username'))
			if (localStorage.getItem('ft_picture') !== 'undefined') {
				$('#ft_picture').attr('src', `data:image/png;base64,${localStorage.getItem('ft_picture')}`)
			}
			else{
				$('#ft_picture').attr('src', `./images/img_avatar5.png`)
			}
			Swal.fire({
				title: `Welcome, ${localStorage.getItem('ft_username')}!`,
				type: 'success',
				confirmButtonText: `Hi`
			})
			$('.form-wrap').hide();
			$('.main_content').show();

			$.ajax({
				method: 'get',
				url: `http://localhost:3000/todos/`,
				headers: {
					ft_token: localStorage.getItem('ft_token')
				}
			})
				.done(todos => {
					printTodos(todos);
				})
		})
		.fail(err => {
			console.log(err)
			if (err.responseJSON.msg == 'Incorrect email and / or password') {
				Swal.fire({
					title: `Wrong password!`,
					type: 'error',
					confirmButtonText: `Close`
				})
			}
			else if (err.responseJSON.msg == 'Invalid email') {
				Swal.fire({
					title: `Email not found!`,
					type: 'error',
					confirmButtonText: `Close`
				})
			}
		})
});

function addPicture(event) {
	$('#pictureModal').modal('toggle');
	event.preventDefault();
	let form = $('#avatar-form')[0];
	let data = new FormData(form);

	$.ajax({
		method: 'post',
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false,
		cache: false,
		url: 'http://localhost:3000/profile-picture',
		headers: {
			ft_token: localStorage.getItem('ft_token')
		},
		data: data
	})
		.done(response => {
			Swal.fire({
				title: `Picture updated!`,
				text: 'Nice pic',
				type: 'success',
				confirmButtonText: `Ok`
			})
			$('#ft_picture').attr('src', `data:image/png;base64,${response}`)
		})
		.fail(err => {
			console.log(err);
		})
}

function addTodo(event) {
	event.preventDefault();
	$.ajax({
		method: 'post',
		url: 'http://localhost:3000/todos',
		headers: {
			ft_token: localStorage.getItem('ft_token')
		},
		data: {
			name: $('#todo_name').val(),
			description: $('#todo_desc').val(),
			due_date: $('#todo_date').val()
		}
	})
		.done(response => {
			$('#exampleModal').modal('toggle');
			Swal.fire(
				'New todo created!',
				'Good luck',
				'success'
			)
			$.ajax({
				method: 'get',
				url: 'http://localhost:3000/todos',
				headers: {
					ft_token: localStorage.getItem('ft_token')
				}
			})
				.done(todos => {
					printTodos(todos);
				})
				.fail(err => {
					console.log(`error retrieving todos after creating new todo`)
				})
		})
		.fail(err => {
			console.log(err)
			if (err.responseJSON.errors.due_date.message == `Please don't enter past date`) {
				Swal.fire({
					title: `Can't do that, chief`,
					text: `Due date must be at least 1 day from now`,
					type: 'error',
					confirmButtonText: `Close`
				})
			}
		})
}

function printTodos(todos) {
	$('#todo-list').empty();
	if(todos.length){
		bubbleSort(todos);
	}
	for (let i = 0; i < todos.length; i++) {
		$('#todo-list').append(`
			<div class="card w-100 mb-1 ${todos[i].status === 'done' ? 'bg-success text-white' : ""}">
				<div class="card-header">
					<h5 class="card-title">${todos[i].name} (${todos[i].status === 'done' ? "Completed" : getRemainingDays(todos[i].due_date)})</h5>
				</div>
				<div class="card-body">
					<p class="card-text">${todos[i].description}</p>
				</div>
				<div class="card-footer">	
					<a id=${todos[i]._id} onclick="deleteTodo(event, \`\${ id }\`)" class="btn bg-warning text-white">Delete</a>
					<a id=${todos[i]._id} onclick="markComplete(event, \`\${ id }\`)" class="btn bg-primary text-white ${todos[i].status === 'done' ? 'd-none' : ""}">Done</a>
				</div>
			</div>
		`)
	}
}


function getRemainingDays(due_date) {
	let remaining = Math.floor((new Date(due_date) - new Date()) / 86400000);
	if (remaining < 0) {
		return 'Expired'
	}
	return `${remaining} day${remaining > 1 ? 's' : ''} more`;
}

function deleteTodo(event, id) {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.value) {
			$.ajax({
				method: 'delete',
				url: `http://localhost:3000/todos/${id}`,
				headers: {
					ft_token: localStorage.getItem('ft_token')
				}
			})
				.done(response => {
					$.ajax({
						method: 'get',
						url: `http://localhost:3000/todos/`,
						headers: {
							ft_token: localStorage.getItem('ft_token')
						}
					})
						.done(todos => {
							printTodos(todos);
						})
				})
			Swal.fire(
				'Deleted!',
				'Your todo has been deleted.',
				'success'
			)
		}
	})
}

function markComplete(event, id) {
	$.ajax({
		method: 'patch',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			ft_token: localStorage.getItem('ft_token')
		}
	})
		.done(response => {
			Swal.fire({
				title: `Completed`,
				text: `Nice job!`,
				type: 'success',
				confirmButtonText: `Close`
			})
			$.ajax({
				method: 'get',
				url: 'http://localhost:3000/todos',
				headers: {
					ft_token: localStorage.getItem('ft_token')
				}
			})
				.done(todos => {
					printTodos(todos);
				})
				.fail(err => {
					console.log(`error retrieving todos after marking a todos as complete`)
				})
		})
		.fail(err => {
			console.log(`error during marking a todo as complete`);
		})
}

function bubbleSort(a) {
	for (let n = a.length - 1; n; n--) {
		for (let i = 0; i < n; i++) {
			if (new Date(a[i].due_date) > new Date(a[i + 1].due_date) || (a[i].status === 'done')) {
				let temp = a[i];
				a[i] = a[i + 1];
				a[i + 1] = temp;
			}
		}
	}
	return a;
}