
$('#document').ready(function() {
    if (localStorage.getItem('token')) {
        $('head').append(`${headLink}`)
        $('#LOG-REG').hide()
        $('#image-register').hide()
        $('#image-login').hide()
        $('#png-register').hide()
        $('#png-login').hide()
        $('#login-form').hide()
        $('#register-form').hide()
        $('#MAINPAGE').show()
        $('#NAVBAR').show()
        getTodo()
    }else {
        isLogout()
    }


    //Button-Click
    $('#register-show').click(reqShow)
    $('#login-show').click(loginShow)
    $('#logout-button').click(logout)
    $('#mytodo-button').click(myTodo)
    $('#myproject-button').click(myProject)

    //Submit-Click
    $('#login-submit').click(loginSubmit)
    $('#register-submit').click(registerSubmit)
    $('#addtodo-button').click(addTodo)
})

const headLink = '<link id="boot-link" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">'
const baseUrl = 'http://localhost:3000'

function reqShow () {
    $('#login-form').fadeOut( 'fast',function () {
        $('#register-form').fadeIn('fast',function () {
            $('#image-login').fadeOut('fast',function () {
                $('#image-register').fadeIn('fast',function() {
                    $('#png-login').fadeOut('fast',function() {
                        $('#png-register').fadeIn('fast',function() {
                            
                        })
                    })
                })
            })
        })
    })
}

function loginShow () {

    $('#png-register').fadeOut('fast',function () {
        $('#png-login').fadeIn('fast', function () {
            $('#image-register').fadeOut('fast',function () {
                $('#image-login').fadeIn('fast',function() {
                    $('#register-form').fadeOut('fast',function () {
                        $('#login-form').fadeIn('fast',function() {
                            
                        })
                    })
                }) 
            })
        })
    })
}

function mainPageShow () {
    getTodo()
    $('#LOG-REG, #png-login').fadeOut('slow', function () {
        mainPageComponents()
    })
}

function mainPageComponents () {
    $('head').append(`${headLink}`)
    $('#addproject-button').hide()
    $('#MAINPAGE').slideDown('slow', function() {
        $('#NAVBAR').show('slow')
    })
}

function isLogin () {
   $('#LOGREG').hide()
   $('#image-register').hide()
   $('#image-login').hide()
   $('#png-register').hide()
   $('#png-login').hide()
   $('#login-form').hide()
   $('#register-form').hide()
   getTodo()
   $('#MAINPAGE').show()
   $('#NAVBAR').show()
}

function loginSubmit () {

    event.preventDefault()
    let username = $('#username-login').val()
    let password = $('#password-login').val()
    
    $.ajax({
        url: `${baseUrl}/users/login`,
        method: 'POST',
        data: {
            username,
            password
        }
    })
    .then(function (response) {
        localStorage.setItem('token', response.access_token)
        $('#username-login').val('')
        $('#password-login').val('')
        mainPageShow()
    })
    .fail(function (err) {

    })
}

function getTodo () {
    $('#todos-list').empty();
    $.ajax({
        url: `${baseUrl}/todos`,
        method: 'GET',
        headers: { token: localStorage.token }
    })
    .done(function (todos) {
        
        todos.forEach(function (todo) {
            console.log(todo._id)
            let id = todo._id
            let status;
            if (todo.status == true) {
                status = 'Completed'
            }else {
                status = 'Uncompleted'
            }
            $('#todos-list').prepend(`

            <li class="list-group-item">
            <div class="content-todo-title" style="height: 5px; margin-bottom: 10px;">
                <h6><strong>${todo.title}</strong></h6>
            </div>
            <div class="content-todo-description" style="height: 100%; margin-top: 20px; font-size: 13px">
              <p>${todo.description}</p>
              <span style="font-size: 10px; color: blue; font-style: italic; margin-top: 10px;">Status : ${status}</span>
              <br>
              <p style="font-size: 10px;">created: ${todo.due_date}</p> 
            </div>
            <div class="action-todo" style="margin-top: 20px;">
            <button class="button is-info is-light" onclick="updateTodoStatus(${id})">Status Update</button>
            <button class="button is-danger is-light" onclick="deleteTodo(${id})">Delete</button>
            </div>
        </li>
            
            `)
        })
    })
    .fail(function(err) {
        swal({
            title: "Upps Error",
            text: `${err.msg}`,
            icon: "error",
          });
    })
}

function registerSubmit () {
    event.preventDefault()
    let username = $('#username-register').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    $.ajax({
        url: `${baseUrl}/users`,
        method: 'POST',
        data: {
            username,
            email,
            password
        } 
    })
    .done(function (response) {
        swal({
            title: `Welcome ${response.username}`,
            text: "Process Your Login Now",
            icon: "success",
            button: "Aww yiss!",
          });
          $('#username-register').val('')
          $('#email-register').val('')
          $('#password-register').val('')
          loginShow()
    })
    .fail(function (err) {
        swal({
            title: "Upps Error",
            text: `${err.msg}`,
            icon: "error",
          });
    })
}

function isLogout () {
    
    $('#MAINPAGE').hide()
    $('#NAVBAR').hide()
    $('#register-form').hide()
    $('#png-register').hide()
    $('#image-register').hide()
    $('#png-login').show()
    $('#image-login').show()
    $('#login-form').show()
}

function logout () {
        $('head').remove('#boot-link')
        
        localStorage.removeItem('token')
        $('#MAINPAGE').slideUp('slow', function () {
            $('#NAVBAR').hide('slow', function () {
                $('#LOG-REG').show('slow')
                $('#png-login').show('slow')
                $('#image-login').show('slow')
                $('#login-form').show('slow')
            })
        })
}

function deleteTodo (todoId) {
    event.preventDefault()
    $.ajax({
        url: `http://localhost:3000/todos/${todoId}`,
        method: 'DELETE',
        headers: { token: localStorage.getItem('token') }
    })
    .done(function (response) {
        swal({
            title: "Success",
            text: `${response.msg}`,
            icon: "success",
          });
          getTodo()
    })
    .fail (function (err) {
        swal({
            title: "Upps Error",
            text: `${err.msg}`,
            icon: "error",
          });
    })
}

function addTodo () {
    event.preventDefault()
    let title = $('#title-todo').val()
    let description = $('#description-todo').val()
    $.ajax({
        url: `http://localhost:3000/todos`,
        method: 'POST',
        data: {
            title: title,
            description: description
        },
        headers: {token: localStorage.getItem('token')}
    })
    .done(function (todo) {
        swal({
            title: todo.title,
            text: "Successfully added",
            icon: "success",
          });
        $('#title-todo').val('')
        $('#description-todo').val('')
        getTodo()
    })
    .fail(function(err) {
        swal({
            title: "Upps Error",
            text: `${err.msg}`,
            icon: "error",
          });
    })
}

function updateTodo () {
    event.preventDefault()
    let title = $('#')
}

function updateStatus (id) {
    event.preventDefault()
    $.ajax({
        url: `http://localhost:3000/todos/${id}/status`,
        method: 'PATCH',
        headers: {token: localStorage.getItem('token')}
    })
    .done(function (todo) {
        swal({
            title: todo.title,
            text: "Successfully Updated",
            icon: "success",
          });
          getTodo()
    })
    .fail(function (err) {
        swal({
            title: "Upps Error",
            text: `${err.msg}`,
            icon: "error",
          });
    })
}

// function playMusic () {
//     var audioElement = new Audio('sparkle-piano.mp3');
//     audioElement.play();
//     console.log('hallo')
// }

function myTodo () {
    getTodo()
    $('#addproject-button').hide()
}

function myProject () {
    $('#addproject-button').show()
    $('#todos-list').empty()
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const config = {
        host: 'http://localhost:3000'
    }
    const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: 'POST',
            url: `${config.host}/users/googlin`,
            data: {
                id_token: googleToken
            }
        })
        .done(token => {
            // $('#mainPage').show()
            localStorage.setItem('token', token)
            mainPageShow()
        })
        .fail(err => {
            swal("Good job!", "You clicked the button!", "error");
        })

} //



