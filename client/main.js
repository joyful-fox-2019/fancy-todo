const token = localStorage.getItem('JWT_TOKEN')

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
            url: 'http://localhost:3000/google',
            method: 'POST',
            data: {
                id_token
            }
        })
        .done(({
            token,
            name
        }) => {
            localStorage.setItem('JWT_TOKEN', token)
            $('.col-sm-6').empty()
            showTodo()
            $('.welcomeMSG').append(`Hello,${name}`)
            $('#googleout').show()
            checkToken()
        })
        .fail(err => {
            console.log(err)
        })
}

function normalLogin(event) {
    event.preventDefault()
    let email = $('#exampleInputEmail1').val()
    let password = $('#exampleInputPassword1').val()
    $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
                email,
                password
            }
        })
        .done(({
            message
        }) => {
            localStorage.setItem('JWT_TOKEN', message.token)
            $('.col-sm-6').empty()
            showTodo()
            $('.welcomeMSG').append(`Hello,${message.name} - `)
            $('#googleout').show()
            checkToken()
        })
        .fail(err => {
            let error = err.responseJSON.message
            $('#modalBodyLogin').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${error}!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `)
        })
}

function signOut(event) {
    event.preventDefault()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('JWT_TOKEN')
    $('.welcomeMSG').hide()
    $('.loginbtn').show()
    $('#googleout').hide()
    $('.home').show()
    $('#contentCard').hide()
}

function signUp(event) {
    event.preventDefault()
    let email = $('#exampleInputEmail1').val()
    let password = $('#exampleInputPassword1').val()
    $.ajax({
            url: 'http://localhost:3000/',
            method: 'POST',
            data: {
                email,
                password
            }
        })
        .done(({
            token,
            name
        }) => {
            localStorage.setItem('JWT_TOKEN', token)
            $('.col-sm-6').empty()
            showTodo()
            $('.welcomeMSG').append(`Hello,${name} - `)
            $('#googleout').show()
            checkToken()
        })
        .fail(err => {
            let error = err.responseJSON.message
            $('#modalBodyLogin').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${error}!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `)
        })
}

function showTodo() {
    $.ajax({
            url: 'http://localhost:3000/todo',
            method: 'GET',
            headers: {
                token
            }
        })
        .done(response => {
            if (response.length === 0) {
                $('.col-sm-6').empty()
                $(".col-sm-6").append(`
                    <h3 style="text-align:center;">Please create todo task</h3>
                `)
            } else {
                let content = ``
                response.forEach(element => {
                    content += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text" style="color: ${element.status === 'Unfinished' ? 'red':'green'};">${element.status}</p>
                        <p class="card-text">${element.due_date}</p>
                        <button type="button" class="btn btn-info loginbtn" data-toggle="modal"
                        data-target="#modalUpdate" onclick="updateTodo(event,'${element._id}')">
                            Update
                        </button>
                        <a href="#" class="btn btn-danger" onclick="deleteTodo(event,'${element._id}')">Delete</a>
                    </div>
                </div>
                    `
                });
                $('.col-sm-6').html(content)
            }
        })
}

function createTodo() {
    let name = $('#inputName').val()
    let description = $('#inputDesc').val()
    let date = $('#inputDate').val()
    $.ajax({
            url: 'http://localhost:3000/todo',
            method: 'POST',
            headers: {
                token
            },
            data: {
                name,
                description,
                date
            }
        })
        .done(response => {
            $('#modalCreate').modal('hide')
            $('.col-sm-6').prepend(`
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${response.todo.name}</h5>
                        <p class="card-text">${response.todo.description}</p>
                        <p class="card-text">${response.todo.status}</p>
                        <p class="card-text">${response.todo.due_date}</p>
                        <button type="button" class="btn btn-info loginbtn" data-toggle="modal"
                        data-target="#modalUpdate" onclick="updateTodo(event,'${response.todo._id}')">
                            Update
                        </button>
                        <a href="#" class="btn btn-danger" onclick="deleteTodo(event,'${response.todo._id}')">Delete</a>
                    </div>
                </div>
                `)
        })
        .fail(err => {
            let error = err.responseJSON.message
            $('#modalbodyCreate').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${error}!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `)
        })
}

function deleteTodo(event, id) {
    event.preventDefault()
    $.ajax({
            url: `http://localhost:3000/todo/${id}`,
            method: 'DELETE',
            headers: {
                token
            }
        })
        .done((response) => {
            $('.col-sm-6').empty()
            showTodo()
        })
        .fail(err => {
            console.log(err)
        })
}

function updateTodo(event, id) {
    event.preventDefault()
    $('#modalUpdateBody').empty()
    $.ajax({
            url: 'http://localhost:3000/todo',
            method: 'GET',
            headers: {
                token
            }
        })
        .done(response => {
            let content = ``
            response.forEach(element => {
                if (element._id === id) {
                    content += `
                <form>
                    <div class="form-group">
                        <label for="inputName">Name</label>
                        <input type="text" class="form-control" id="inputNameUD"
                            aria-describedby="emailHelp" value="${element.name}">
                    </div>
                    <div class="form-group">
                        <label for="inputDesc">Description</label>
                        <input type="text" class="form-control" id="inputDescUD"
                            value="${element.description}">
                    </div>
                    ${element.status === 'Finished'? '<fieldset disabled>' : ''}
                    <div class="form-group">
                        <label for=${element.status === 'Finished' ? 'disabledSelect': 'inputStatus'}>Status</label>
                        <select id=${element.status === 'Finished' ? 'disabledSelect' : 'inputStatus'}>
                            <option value="Unfinished">Unfinished</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </div>
                    ${element.status === 'Finished'? '</fieldset>' : ''}
                    <div class="form-group">
                        <label for="inputDate">Date</label>
                        <input type="date" class="form-control" id="inputDateUD"
                            value="${new Date(element.due_date).toISOString().split("T")[0]}">
                    </div>
                    <button type="submit" class="btn btn-primary" onclick="updatedTodo(event,'${element._id}')">Edit</button>
                </form> 
                `
                }
            })
            $('#modalUpdateBody').append(content)
        })
}

function updatedTodo(event, id) {
    event.preventDefault()
    let status = $('#inputStatus').val()
    let description = $('#inputDescUD').val()
    let name = $('#inputNameUD').val()
    let date = $('#inputDateUD').val()
    $.ajax({
            url: `http://localhost:3000/todo/${id}`,
            method: 'PUT',
            headers: {
                token
            },
            data: {
                name,
                description,
                status,
                date
            }
        })
        .done((response) => {
            $('.welcomeMSG').empty()
            $('#modalUpdate').modal('hide')
            $('.col-sm-6').empty()
            showTodo()
        })
}

function checkToken() {
    if (localStorage.getItem('JWT_TOKEN')) {
        $('#contentCard').show()
        $('.home').hide()
        $('#googleout').show()
        $('.loginbtn').hide()
        $('#exampleModalLong').modal('hide')
    } else {
        $('#contentCard').hide()
        $('#googleout').hide()
        $('#normalout').hide()
        $('.home').show()
    }
}

$(document).ready(function () {
    showTodo()
    checkToken()
    inputDate.min = new Date().toISOString().split("T")[0];
    inputDate.max = new Date("2030-12-31").toISOString().split("T")[0];
    $('#btnCreate').on('click', function (event) {
        event.preventDefault()
        createTodo()
    })
    $('#myonoffswitch').change(function () {
        $('body').toggleClass('bodyNight');
        $('.card-header').toggleClass('cardNight')
        $('.navbar').toggleClass('navNight')
        $('.welcomeMSG').toggleClass('welcomeNight')
        $('.list-group').toggleClass('listNight')
        $('.btn-info').toggleClass('btn-night')
        $('.card').toggleClass('contentNight')
        $('.home').toggleClass('homeNight')
    });
})