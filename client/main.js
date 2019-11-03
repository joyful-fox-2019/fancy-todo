$(document).ready(function(){
    if(localStorage.getItem('token')) {
        showTodo()
        $('.homepage').show()
        $('.login').hide()
    } else {
        $('.login').show()
        $('.homepage').hide()
    }
})

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: "http://localhost:3000/users/googleSignIn",
        method: 'POST',
        data: {
            token: id_token
        }
    })
        .done(token => {
            console.log(token.token);
            localStorage.setItem('token', token.token)
            showTodo()
            $('.homepage').show()
            $('.login').hide()
        })
        .fail(err => {
            console.log(err);
        })
}

// $('#form-login').on('submit'), (event) => { // form-login id dari form login line 27
//     event.preventDefault()
//     let email = $('#login-email').val()
//     let password = $('#login-password').val()
//     signIn(email, password)
// }

function signIn(event) {
    event.preventDefault()
    $.ajax({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(token => {
            localStorage.setItem('token', token.token)
            showTodo()
            $('.homepage').show()
            $('.login').hide()
        })
        .fail(err => {
            console.log(err);
        })
}
function signUp(event) {
    event.preventDefault()
    $.ajax({
        url: "http://localhost:3000/users/register",
        method: "POST",
        data: {
            email: $('#signup-email').val(),
            password: $('#signup-password').val()
        }
    })
        .done(user => {
            console.log(user);
        })
        .fail(err => {
            console.log(err);
        })
    
}
function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        $('.login').show()
        $('.homepage').hide()
        console.log('User signed out.');
    });
}

function showTodo() {
    $.ajax({
        url: 'http://localhost:3000/todos/',
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todos => {
            $('#todoList').empty()
            for(let i = 0; i < todos.length; i++) {
                $('#todoList').append(`
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">${todos[i].name}</h5>
                        <hr>
                        <span>Due Date: ${new Date(todos[i].dueDate).getDate()}-${new Date(todos[i].dueDate).getMonth()+1}-${new Date(todos[i].dueDate).getFullYear()}<span>
                        <p class="card-text">${todos[i].description}</p>
                        <button type="button" class="btn btn-primary" onclick="deleteTodo('${todos[i]._id}')">delete</button>
                        <button type="button" class="btn btn-primary" onclick="showUpdateWindow()">update</button>
                    </div>
                </div>
                `)
            }
        })
        .fail(err => {
            console.log(err);
        })
}

function deleteTodo(id) {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: "DELETE",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(()=> {
            showTodo()
            console.log('Successfully delete')
        })
        .fail(err => {
            console.log(err)
        })
}

function showUpdateWindow(){
    $('#updateTask').modal('show')
}
function updateTodo(id) {
    $.ajax({
        url: `http://localhost:3000/todos/:id`,
        method: 'PUT',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name: $('updateName').val(),
            description: $('updateDescription').val(),
            dueDate: $('updateDueData').val(),
            status: $('updateStatus').val()
        }
    })
        .done(()=> {
            $('#updateTask').modal('hide')
            showTodo()
            console.log('Successfully update todo')
        })
        .fail(err => {
            console.log(err)
        })
}

function showAddTask(){
    $('#addNewTask').modal('show')
}

function addTask(){
    $.ajax({
        url: `http://localhost:3000/todos`,
        method: 'POST',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name: $('#newName').val(),
            description: $('#newDescription').val(),
            dueDate: $('#newDueDate').val()
        }
    })
        .done(() => {
            $('#addNewTask').modal('hide')
            showTodo()
            console.log('Success add new task')
        })
        .fail(err => {
            console.log(err)
        })
}

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})