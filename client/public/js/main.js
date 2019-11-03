$(document).ready(function () {
    if (!localStorage.getItem('token')) {
        $("#login-wrap").show();
        $(".navbar").hide();
        $("#slideshow").hide();
        $("#todoList").hide();
    } else {
        $("#login-wrap").hide();
        $("#register-wrap").hide();
        $(".navbar").show();
        $("#slideshow").show();
        $("#todoList").show();
    }
})

//popup message di menu search
$(function () {
    $('[data-toggle="popover"]').popover()
})

//nav hide
$(window).scroll(function (e) {

    // add/remove class to navbar when scrolling to hide/show
    $('.navbar')[$(window).scrollTop() >= 150 ? 'addClass' : 'removeClass']('navbar-hide');

});

function manualLogin(event) {
    event.preventDefault();
    const email = $('#email-login').val();
    const password = $('#pass-login').val();
    Swal.showLoading();
    $.ajax({
            url: "http://localhost:3000/users/login",
            method: "POST",
            data: {
                email,
                password
            }
        })
        .done(respone => {
            Swal.close();
            if (!localStorage.getItem('token')) {
                Swal.fire({
                    type: 'success',
                    title: 'Login success!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            console.log('success login manual');
            $("#login-wrap").hide();
            $("#register-wrap").hide();
            $(".navbar").show();
            $("#slideshow").show();
            $("#todoList").show();
            localStorage.setItem('token', respone.token);
        })
        .fail(function (err) {
            Swal.close()
            let msg = err.responseJSON.errors
            let text = ""
            msg.forEach(el => {
                text += el + ', '
            });
            Swal.fire({
                type: 'error',
                title: 'Oops....',
                text,
            })
        })
        .always(function () {
            $("#email-login").val('')
            $("#pass-login").val('')
        })
}

function manualRegister(event) {
    $("#login-wrap").hide()
    event.preventDefault();
    Swal.showLoading()
    const name = $('#name-register').val();
    const email = $('#email-register').val();
    const password = $('#pass-register').val();
    $.ajax({
            url: "http://localhost:3000/users/register",
            method: "POST",
            data: {
                name,
                email,
                password
            }
        })
        .done(respone => {
            Swal.close()
            Swal.fire({
                type: 'success',
                title: `Register success! 
                Please, login first!`,
                showConfirmButton: false,
                timer: 1500
            })
            console.log('success register manual');
            $("#register-wrap").hide();
            $("#login-wrap").show();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let msg = err.responseJSON.errors
            let text = ""
            msg.forEach(el => {
                text += el + ', '
            });
            Swal.fire({
                type: 'error',
                title: 'Oops....',
                text,
            })
        })
        .always(function () {
            $('#name-register').val('')
            $('#email-register').val('')
            $('#pass-register').val('')
        })
}

function onSuccess(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    Swal.showLoading();
    $.ajax({
            url: "http://localhost:3000/users/googleLogin",
            method: "POST",
            data: {
                id_token
            }
        })
        .done(respone => {
            Swal.close();
            if (!localStorage.getItem('token')) {
                Swal.fire({
                    type: 'success',
                    title: 'Login success!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            console.log('succes googleLogin =>', respone);
            $("#login-wrap").hide();
            $("#register-wrap").hide();
            $(".navbar").show();
            $("#slideshow").show();
            $("#todoList").show();
            localStorage.setItem('token', respone.token);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let msg = err.responseJSON.errors
            let text = ""
            msg.forEach(el => {
                text += el + ', '
            });
            Swal.fire({
                type: 'error',
                title: 'Oops....',
                text,
            })

        })
        .always(function () {
            console.log("complete");

        })
}

function onFailure(error) {
    console.log(error);
}

// window.onbeforeunload = function (e) {
//     gapi.auth2.getAuthInstance().signOut();
// };

function renderButton() {
    gapi.signin2.render('#my-signin2', {
        'scope': 'profile email',
        'width': 380,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function renderRegister() {
    $("#register-wrap").show();
    $("#login-wrap").hide();
}

function signOut() {
    localStorage.removeItem('token');
    console.log('success logout');
    $(".navbar").hide();
    $("#slideshow").hide();
    $("#todoList").hide();
    $("#login-wrap").show();
    $("#listTodos").empty()
    if (gapi.auth2 !== undefined) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User via google signed out.');
        });
    }
}

//add new todo
$("#btn-create").click('submit', function (event) {
    // event.preventDefault();
    console.log('masuk woi')
    let name = $("#inputName").val();
    let description = $("#inputDescription").val();
    let due = $("#inputDueDate").val();
    $.ajax({
            url: 'http://localhost:3000/todos/',
            method: "POST",
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                name,
                description,
                due
            }
        })
        .done(respone => {
            Swal.fire({
                type: 'success',
                title: `success add new Todo!`,
                showConfirmButton: false,
                timer: 1500
            })
            // todoList()
        })
        .fail(err => {
            let msg = err.responseJSON.errors
            let text = ""
            msg.forEach(el => {
                text += el + ', '
            });
            Swal.fire({
                type: 'error',
                title: 'Oops....',
                text,
            })
        })
        .always(function () {
            $('#inputName').val('')
            $('#inputDescription').val('')
            $('#inputDueDate').val('')
        })
})

//dashboard
function todoList() {
    Swal.showLoading();
    $("#listTodos").empty()
    $.ajax({
            url: 'http://localhost:3000/todos/',
            method: "GET",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(respone => {
            if (respone.length == 0) {
                Swal.close()
                Swal.fire({
                    type: 'error',
                    title: 'Oops....',
                    text: 'no have todo list'
                })
            } else {
                respone.forEach(e => {
                    Swal.close()
                    let date = new Date(e.due)
                    let resultDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
                    if (!e.description) e.description = " "
                    if (e.status) {
                        $("#listTodos").append(`
                        <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                            <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-success" >
                            <center>
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Due date : ${resultDate}</b></li>
                            <li class="list-group-item"><b>Status : Done<b></li>
                            <li class="list-group-item" onclick="markundone('${e._id}')"><button>Mark as undone</button></li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModalUpdate" onclick = "edittodo('${e._id}')">Edit</a>
                            <a href="#" class="card-link" onclick = "deleteone('${e._id}')">Delete</a>
                        </div>
                        </center>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${e.quote.content}.</p>
                                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">${e.quote.author}</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
                        `)
                    } else {
                        $("#listTodos").append(`
                        <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                            <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-success" >
                            <center>
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Due date : ${resultDate}</b></li>
                            <li class="list-group-item"><b>Status : UnDone<b></li>
                            <li class="list-group-item" onclick="markdone('${e._id}')"><button>Mark as done</button></li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModalUpdate" onclick = "edittodo('${e._id}')">Edit</a>
                            <a href="#" class="card-link" onclick = "deleteone('${e._id}')">Delete</a>
                        </div>
                        </center>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${e.quote.content}.</p>
                                <footer class="blockquote-footer">Someone famous : <cite title="Source Title">${e.quote.author}</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>            
                    `)
                    }
                })
            }
        })
        .fail(function (err) {
            Swal.close()
            let msg = err.responseJSON.errors
            let text = ""
            msg.forEach(el => {
                text += el + ', '
            });
            Swal.fire({
                type: 'error',
                title: 'Oops....',
                text,
            })
        })

}

function deleteone(id) {
    Swal.fire({
            title: "Are you sure want to delete this todo?",
            type: "question",
            showConfirmButton: true,
            showCancelButton: true,
        })
        .then(isConfirm => {
            if (isConfirm) {
                $.ajax({
                        url: `http://localhost:3000/todos/${id}`,
                        method: "DELETE",
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(respone => {
                        Swal.fire({
                            type: 'success',
                            title: 'ToDo has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        todoList();
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        let msg = err.responseJSON.errors
                        let text = ""
                        msg.forEach(el => {
                            text += el + ', '
                        });
                        Swal.fire({
                            type: 'error',
                            title: 'Oops....',
                            text,
                        })
                    })
            }
        })
}

function markdone(id) {
    Swal.fire({
            title: "Do You Want to Change This Todo Status to Done?",
            type: "question",
            showConfirmButton: true,
            showCancelButton: true,
        })
        .then(isConfirm => {
            if (isConfirm) {
                $.ajax({
                        url: `http://localhost:3000/todos/${id}`,
                        method: "PATCH",
                        headers: {
                            token: localStorage.getItem('token')
                        },
                        data: {
                            status: true
                        }
                    })
                    .done(respone => {
                        Swal.fire({
                            type: 'success',
                            title: 'Todo mark now is done!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        todoList();
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        let msg = err.responseJSON.errors
                        let text = ""
                        msg.forEach(el => {
                            text += el + ', '
                        });
                        Swal.fire({
                            type: 'error',
                            title: 'Oops....',
                            text,
                        })
                    })
            }
        })
}

function markundone(id) {
    console.log('masuukkk markun')
    Swal.fire({
            title: "Do You Want to Change This Todo Status to UnDone?",
            type: "question",
            showConfirmButton: true,
            showCancelButton: true,
        })
        .then(isConfirm => {
            if (isConfirm) {
                $.ajax({
                        url: `http://localhost:3000/todos/${id}`,
                        method: "PATCH",
                        headers: {
                            token: localStorage.getItem('token')
                        },
                        data: {
                            status: false
                        }
                    })
                    .done(respone => {
                        Swal.fire({
                            type: 'success',
                            title: 'Todo mark now is undone!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        todoList();
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        let msg = err.responseJSON.errors
                        let text = ""
                        msg.forEach(el => {
                            text += el + ', '
                        });
                        Swal.fire({
                            type: 'error',
                            title: 'Oops....',
                            text,
                        })
                    })
            }
        })
}

function edittodo(id) {
    $.ajax({
            url: `http://localhost:3000/todos/${id}`,
            method: "GET",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(respone => {
            $("#detail-update").append(`
            <div class="modal fade" id="exampleModalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Form Update Todo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="update-form">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Name</label>
                                <input type="text" class="form-control" id="updateName" value="${respone.name}">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">description</label>
                                <input type="text" class="form-control" id="updateDescription" value="${respone.description}">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Status</label>
                                <input type="text" class="form-control" id="updateStatus" value="${respone.status}">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Due Date</label>
                                <input type="text" class="form-control" id="updateDueDate" value="${respone.due}">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button id="btn-update" type="button" type="submit" class="btn btn-primary" 
                                    data-dismiss="modal">Update
                                    Todo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            `)
            //update
            $("#btn-update").click('submit', function (event) {
                // event.preventDefault();
                console.log('masukkkkkkk')
                let name = $("#updateName").val();
                let description = $("#updateDescription").val();
                let status = $("#updateStatus").val();
                let due = $("#updateDueDate").val();
                $.ajax({
                        url: `http://localhost:3000/todos/${id}`,
                        method: "PUT",
                        headers: {
                            token: localStorage.getItem('token')
                        },
                        data: {
                            name,
                            description,
                            status,
                            due
                        }
                    })
                    .done(respone => {
                        Swal.fire({
                            type: 'success',
                            title: `success update data Todo!`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        todoList()
                    })
                    .fail(err => {
                        let msg = err.responseJSON.errors
                        let text = ""
                        msg.forEach(el => {
                            text += el + ', '
                        });
                        Swal.fire({
                            type: 'error',
                            title: 'Oops....',
                            text,
                        })
                    })
                    .always(function () {
                        // $("#updateName").val('');
                        // $("#updateDescription").val('');
                        // $("#updateStatus").val('');
                        // $("#updateDueDate").val('');
                    })
            })
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let msg = err.responseJSON.errors
            let text = ""
            msg.forEach(el => {
                text += el + ', '
            });
            Swal.fire({
                type: 'error',
                title: 'Oops....',
                text,
            })
        })
}

function searchTodo(value) {
    console.log('masuk search')
    let todosSearch = [];
    let search = new RegExp(value, 'i')
    let result;
    $("#listTodos").empty()
    $.ajax({
            url: 'http://localhost:3000/todos/',
            method: "GET",
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(respone => {
            respone.forEach(e => {
                let todoName = e.name
                if (result = search.exec(todoName) !== null) {
                    todosSearch.push(e)
                }
            })

            todosSearch.forEach(e => {
                let date = new Date(e.due)
                let resultDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
                if (!e.description) e.description = " "
                if (e.status) {
                    $("#listTodos").append(`
                        <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                            <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-success" >
                            <center>
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Due date : ${resultDate}</b></li>
                            <li class="list-group-item"><b>Status : Done<b></li>
                            <li class="list-group-item" onclick="markundone('${e._id}')"><button>Mark as undone</button></li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModalUpdate" onclick = "edittodo('${e._id}')">Edit</a>
                            <a href="#" class="card-link" onclick = "deleteone('${e._id}')">Delete</a>
                        </div>
                        </center>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${e.quote.content}.</p>
                                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">${e.quote.author}</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
                        `)
                } else {
                    $("#listTodos").append(`
                        <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                            <div class="card mt-4 mb-4 ml-4 mr-4 text-dark border-success" >
                            <center>
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Due date : ${resultDate}</b></li>
                            <li class="list-group-item"><b>Status : UnDone<b></li>
                            <li class="list-group-item" onclick="markdone('${e._id}')"><button>Mark as done</button></li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModalUpdate" onclick = "edittodo('${e._id}')">Edit</a>
                            <a href="#" class="card-link" onclick = "deleteone('${e._id}')">Delete</a>
                        </div>
                        </center>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${e.quote.content}.</p>
                                <footer class="blockquote-footer">Someone famous : <cite title="Source Title">${e.quote.author}</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>            
                    `)
                }
            })
        })
}