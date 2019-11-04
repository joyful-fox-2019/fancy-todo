console.log('js')
$(document).ready(() => {
    // mainPage()
    // register()
    if (localStorage.getItem('token')) {
        mainPage()
        todo()
        $('#NAVBAR').show()
    } else {
        loginPage()
        $('#NAVBAR').hide()
    }
    $('#logForm').on("submit", login)
    $('#register-button').click(register)
    $('#register-page').click(registerPage)
    $('#login-page').click(loginPage)
    $('#logout-button').click(signOut)
})

function loginPage() {
    $('#email-login').val('')
    $('#password-login').val('')
    $('#errTemplateLog').empty()

    $('#NAVBAR').hide()
    $('#REGISTER').hide()
    $('#MAIN').hide()
    $('#LOGIN').show()
}

function registerPage() {
    $('#errTemplateReg').empty()
    $('#name-register').val('')
    $('#email-register').val('')
    $('#password-register').val('')

    $('#NAVBAR').hide()
    $('#REGISTER').show()
    $('#LOGIN').hide()
    $('#MAIN').hide()
}

function mainPage() {
    $('#MAIN').show()
    $('#NAVBAR').show()
    $('#REGISTER').hide()
    $('#LOGIN').hide()
}

function logout(event) {
    // event.preventDefault()
    // localStorage.removeItem('token')
    // $('#NAVBAR').hide()
    // $('#REGISTER').hide()
    // $('#MAIN').hide()
    // $('#LOGIN').show()
}

function login(event) {
    event.preventDefault()
    $('#NAVBAR').hide()
    $('#LOGIN').show()
    $('#MAIN').hide()
    $('#errTemplateLog').empty()
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    console.log(email, password);
    $.ajax({
        url: 'http://localhost:3000/signin',
        method: 'POST',
        data: { email, password }
    })
        .done(response => {
            console.log(`masuk`);
            $('#errTemplate').empty()
            console.log(response);
            // $('#LOGIN').slideToggle(500, () => {
            localStorage.setItem('token', response.token)
            localStorage.setItem('name', response.name)
            localStorage.setItem('email', response.email)
            localStorage.setItem('_id', response._id)
            // })
            // $('#NAVBAR').show()
            mainPage()
            todo()
            $('#name-login').val('')
            $('#email-login').val('')
            $('#password-login').val('')
        })
        .fail(error => {
            $('#errTemplateLog').empty()
            let err = ''
            if (typeof error.responseJSON.message === 'string') {
                err = error.responseJSON.message
            } else {
                err = error.responseJSON.message.reduce((acc, val) => {
                    return acc + `<li>${val}</li>\n`
                }, '')
            }
            console.log(err);
            $('#errTemplateLog').append(`
                <div class="ui mini error message">
                    <div class="header" style="text-align: start;">We had some issues</div>
                    <ul class="list">
                        ${err}
                    </ul>
                </div>
            `)
        })
}

function register(event) {
    event.preventDefault()
    $('#NAVBAR').hide()
    $('#REGISTER').show()
    $('#LOGIN').hide()
    $('#MAIN').hide()
    $('#errTemplateReg').empty()

    let name = $('#name-register').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    console.log(name, email, password);
    $.ajax({
        url: 'http://localhost:3000/signup',
        method: 'POST',
        data: { name, email, password }
    })
        .done(data => {
            $('#errTemplateReg').empty()
            console.log(data);
            $('#username-register').val('')
            $('#email-register').val('')
            $('#password-register').val('')
            loginPage()
        })
        .fail(function (error) {
            $('#errTemplateReg').empty()
            let err = ''
            if (typeof error.responseJSON.message === 'string') {
                err = error.responseJSON.message
            } else {
                err = error.responseJSON.message.reduce((acc, val) => {
                    return acc + `<li> ${val} </li>\n`
                }, '')
            }
            console.log(err);
            $('#errTemplateReg').append(`
                <div class="ui mini error message">
                    <div class="header" style="text-align: start;">We had some issues</div>
                    <ul class="list">
                        ${err}
                    </ul>
                </div>
            `)
            console.log(err)
        })
}


function todo(event) {
    // event.preventDefault()
    mainPage()
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'GET',
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(todos => {
            $("#main-header").append(`
            <p>Hi <strong style=color:rgb(71,186,188);>${localStorage.getItem("name")}</strong> , lets take a note!</p>
            `)
            console.log(todos);
            todos.forEach(todo => {
                if (todo.status === false) {
                    $("#note").append(`
                        <div id="noteId">
                            <div class="note-header">
                            <p style="text-align: center; border-bottom:1px solid olive"> ${todo.title} </p>
                            <div class="meta" style="display:flex; flex-direction: column">
                                <span class="right floated date" style="font-size: 10px"> created: ${new Date(todo.createdAt).toDateString().slice(4)}</span>
                                <span class="right floated date" style="font-size: 10px"> due: ${ todo.dueDate ? new Date(todo.dueDate).toDateString().slice(4) : "-"}</span>
                            </div>
                            </div>
                            <div class="note-list"  style="display:flex; flex-direction: row;">
                                <span class="done" id="done" onclick="done('${todo.id}')">done</span>
                                <p <p>${todo.description}</p></p>
                                <span class="delete" id="delete" onclick="remove('${todo.id}')">delete</span>
                            </div>
                        </div>
                        `)
                } else {
                    $("#note").append(`
                    <div id="noteId">
                        <div class="note-header">
                        <p style="text-align: center; border-bottom:1px solid olive; color: grey"> ${todo.title} </p>
                        <div class="meta" style="display:flex; flex-direction: column">
                            <span class="right floated date" style="font-size: 10px; color: grey"> created: ${new Date(todo.createdAt).toDateString().slice(4)}</span>
                            <span class="right floated date" style="font-size: 10px"; color: grey> due: ${new Date(todo.dueDate).toDateString().slice(4)}</span>
                        </div>
                        </div>
                        <div class="note-list"  style="display:flex; flex-direction: row;">
                            <span style="color: grey;" class="done" id="done" onclick="done('${todo.id}')">done</span>
                            <p style="color: grey;">${todo.description}</p>
                            <span class="delete" id="delete" onclick="remove('${todo.id}')">delete</span>
                        </div>
                    </div>
                    `)
                }
            });
        })
        .fail(function (err) {
            console.log(err)
        })
}

function showModalAdd() {
    $('.ui.modal').modal('show');
}

function addTask(event) {
    // event.preventDefault()
    mainPage()
    let title = $('#title').val()
    let dueDate = $('#dueDate').val()
    let description = $('#description').val()
    console.log(title, dueDate, description);
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'POST',
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
            userId: localStorage.getItem("_id")
        },
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(todo => {
            todo()
        })
        .fail(function (error) {
            showModalAdd()
            $('#errTemplateTask').empty()
            let err = ''
            if (typeof error.responseJSON.message === 'string') {
                err = error.responseJSON.message
            } else {
                err = error.responseJSON.message.reduce((acc, val) => {
                    return acc + `<li> ${val} </li>\n`
                }, '')
            }
            console.log(err);
            $('#errTemplateTask').append(`
                <div class="ui mini error message">
                    <div class="header" style="text-align: start;">We had some issues</div>
                    <ul class="list">
                        ${err}
                    </ul>
                </div>
            `)
            console.log(err)
            showModalAdd()
        })
}

function done(id) {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'PATCH',
        data: {
            status: true
        },
        headers: {
            token: localStorage.getItem("token")
        }
    })
        .done(todos => {
            console.log(todos);

            todos.forEach(res => {
                todo()
            });
        })
        .fail(function (err) {
            // registerPage()
            // error(err)
            console.log(err)
        })
}

function remove(id) {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: `DELETE`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            console.log(`task successfuly deleted`);
            todo()
        })
        .fail(err => {
            console.log(err);
            console.log(`Delete failed`);
        })
        .always(() => {
            console.log(`complete`);
        })
}


function error(error) {
    let err = ''
    if (typeof error.responseJSON.message === 'string') {
        err = error.responseJSON.message
    } else {
        err = error.responseJSON.message.reduce((acc, val) => {
            return acc + `<li> ${val} </li>\n`
        }, '')
    }
    console.log(err);
    $('#errTemplate').append(`
        <div class="ui mini error message">
            <div class="header" style="text-align: start;">We had some issues</div>
            <ul class="list">
                ${err}
            </ul>
        </div>
    `)
}



function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "post",
        url: `http://localhost:3000/googleLogin`,
        data: {
            token: id_token
        }
    })
        .done(response => {
            console.log(response);
            localStorage.setItem('token', response.token)
            localStorage.setItem('name', response.name)
            localStorage.setItem('email', response.email)
            localStorage.setItem('_id', response._id)
            mainPage()
            todo()
        })
        .fail(err => {
            console.log(err);
            alert(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
        .then(function () {
            localStorage.removeItem("token")
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('_id')
            $('#NAVBAR').hide()
            $('#REGISTER').hide()
            $('#MAIN').hide()
            $('#LOGIN').show()
            console.log('User signed out.');
        });
}