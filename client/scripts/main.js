$( document ).ready(function() {
    let isLoggedIn = localStorage.getItem('jwt_token');
    $('.error-message').hide();
    if (isLoggedIn) {
        $(".logged-out").hide()
        showTodos();
    } else {
        $(".logged-in").hide()
    }

    $(".login-form").hide();
    $('#register-form').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/register",
            data: $(this).serialize(),
        })
            .done( data => {
                
            })
            .fail( err => {
                showErrorMessage(err.responseText);
            })
    });

    $('#login-form').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/login",
            data: $(this).serialize()
        })
            .done( token => {
                localStorage.setItem('jwt_token', token);
                event.preventDefault();
                
                showSuccessMessage('Logged In');
                location.reload();
               

            })
            .fail( err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    type: 'error',
                    confirmButtonText: 'Cool'
                })
                showErrorMessage(err.responseText);
            })
    });
    
    $('#add-todo-form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/todos",
            data: $(this).serialize(),
            headers: {
                authorization: localStorage.getItem('jwt_token')
            }
        })
            .done( data => {
                window.location.reload();
                console.log(data);
            })
            .fail( err => {
                console.log(err);
            })
    })
    
    
    console.log( "hello, world!" );
});

function getDailyCatImage() {
    $.ajax({
        type: "GET",
        url: "https://api.thecatapi.com/v1/images/search"
    })
        .done( data => {
            $('.daily-pic').empty().append(`
                <img src="${data[0].url}">
            `)
            console.log(data[0].url)
        })
        .fail( err => {
            console.log(err)
        })
}

function showTodos(){
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/todos",
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
        .done( datas => {
            for (let todo in datas) {
                let id = datas[todo]._id;
                let description = datas[todo].description || 'No Description';
                let dueDate = datas[todo].dueDate || 'No Due Date';
                let isDone = (datas[todo].status == true) ? 'checked' : '';
              
                $('#all-todos').append(`
                    <tr>
                        <th scope="row">
                            <input type="checkbox" name="status" value="${datas[todo].status}" ${isDone} onclick="checkThis('${id}', '${datas[todo].status}')">
                        </th>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal"> ${datas[todo].name}</td>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${description}</td>
                        <td onclick="editTodo('${id}')" data-toggle="modal" data-target="#editTodoModal">${dueDate}</td>
                        <td onclick="deleteTodo('${id}')">X</td>
                    </tr>
                `)
            }
            
        })
        .fail( err => {
            console.log(err);
        })
}

function checkThis(id, status){
    $.ajax({
        type: 'PATCH',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
        },
        data: {status}
    })
        .done( data => {
        })
        .fail( err => {
            console.log(err)
        })
}

function deleteTodo(id){
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
    .done( data => {
        window.location.reload();
    })
}

function editTodo(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
			authorization: localStorage.getItem('jwt_token')
		}
    })
        .done(data => {
            $('#editTodoName').attr("value", `${data.name}`);
            $('#editTodoDescription').text(`${data.description}`);
            $('#editDate').attr("value", `${data.dueDate}`);

            $('#edit-todo-form').on('submit', function(event) {
                event.preventDefault();
                $.ajax({
                    type: 'PUT',
                    url: `http://localhost:3000/todos/${data._id}`,
                    data: $(this).serialize(),
                    headers: {
                        authorization: localStorage.getItem('jwt_token')
                    }
                })
                    .done( data => {
                        window.location.reload();
                    })
                    .fail( err => {
                        showErrorMessage(err.responseText);
                    })
            })
        })
        .fail( err => {
            console.log(err)
        })
}

function showErrorMessage(str){
    Swal.fire({
        title: 'Error!',
        text: str,
        type: 'error',
        confirmButtonText: 'Cool'
    })
}

function showSuccessMessage(str) {
    Swal.fire(
        'Success!',
        str,
        'success'
      )
}

function isLoggedIn() {
    $(".logged-in").show();
    $(".logged-out").hide();
}

function showLoginForm() {
    $(".login-form").show()
    $(".register-form").hide()
}

function showRegisterForm() {
    $(".login-form").hide()
    $(".register-form").show()
}

function logOut() {
    localStorage.removeItem('jwt_token');
    window.location.reload();
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax("http://localhost:3000/gSignIn", {
        method: "POST",
        data: {
            id_token
        }
    })
    .done( data => {
        localStorage.setItem('jwt_token', data.token);
    })
    .fail( err => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    logOut();
}