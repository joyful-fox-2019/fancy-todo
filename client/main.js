let baseUrl = 'http://localhost:3000'
$(document).ready(function () {
    auth();

})


function auth() {
    if (localStorage.getItem("token")) {
        $("#beforeLogin").hide();
        $("#afterLogin").show();
        $('#avatar').append(`<img src="https://api.adorable.io/avatars/285/${localStorage.getItem('username')}" style="width: 40px;"/>`)
        $('#user-login-name').empty()
        $('#user-login-name').append(`<h3>${localStorage.getItem('username')}</h3>`)
        findAllTodos();
    } else {
        $("#afterLogin").hide();
        $("#beforeLogin").show();
    }

}


// Before Login
function login() {
    let email = $("#logusername").val();
    let password = $("#logpassword").val();
    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: {
            email,
            password
        }
    }).done((result) => {
        console.log(result);
        localStorage.setItem("username", result.name);
        localStorage.setItem("token", result.token);
        auth();
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.message,
        })
    })
}

function register() {
    let name = $("#name").val();
    let email = $("#username").val();
    let password = $("#password").val();

    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/register",
        data: {
            name,
            email,
            password
        }
    }).done((result) => {
        Swal.fire({
            type: 'success',
            title: 'Success',
            text: 'Register Successfully',
        })
        auth();
    }).fail((err) => {

        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.message,
        })
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/logingoogle",
        data: {
            token: id_token
        }
    }).done((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.name);
        auth();
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.message,
        })
    })

}

function signOut() {
    Swal.fire({
        title: 'Are you sure to signout ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                localStorage.removeItem("token");
                localStorage.removeItem("username")
                auth();
            });
            $("#avatar").empty();
            $('#logusername').val('')
            $('#logpassword').val('')
        }
    })
}

// After Login


function createTodo() {
    let title = $("#titleCreate").val();
    let description = $("#descriptionCreate").val();
    let dueDate = $("#dueDateCreate").val();
    let name = localStorage.getItem("username");
    let totalTodo = $(".card").length;

    if (totalTodo === 10) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "Max Todos Only 10 !!",
        })
    } else {
        $.ajax({
            method: "post",
            url: "http://localhost:3000/todo/create",
            data: {
                title: title,
                description: description,
                status: "false",
                dueDate: dueDate,
                username: name
            }
        }).done((result) => {
            console.log(result);
            $("#titleCreate").val("");
            $("#descriptionCreate").val("");
            $("#dueDateCreate").val("");
            Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Create Todo Successfully',
            })
            $("#todoItem").empty();
            findAllTodos();
        }).fail((err) => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.responseJSON.message,
            })
        })
    }



}

function findAllTodos() {
    $.ajax({
        method: "post",
        url: "http://localhost:3000/todo/find",
        data: {
            username: localStorage.getItem("username")
        }
    }).done((result) => {
        for (let i = 0; i < result.length; i++) {



            $("#todoItem").append(`<div class="card ml-3 col-md-2 mt-5" id="${result[i]._id}"
                style="width: 200px; height: 220px; background-color: #1abc9c;" onclick="select(this.id);">
                <div class="card-body">
                <h5 class="card-title">${result[i].title}</h5>
                <p class="card-text">${result[i].description}</p>
                <h5 class="card-title">${result[i].dueDate}</h5>
                </div>
                </div>`)
        }
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.message,
        })
    })
}

function select(id) {
    $.ajax({
            method: "post",
            url: "http://localhost:3000/todo/find",
            data: {
                username: localStorage.getItem("username")
            }
        })
        .then((result) => {
            let selected = "";
            let isSelect = false;
            let selectedTitle = "";
            let selectedDescription = "";
            let selectedDueDate = "";

            for (let i = 0; i < result.length; i++) {
                if (result[i].status === "true") {
                    isSelect = true
                    selected = result[i]._id
                }

                if (result[i]._id === id) {
                    selectedTitle = result[i].title;
                    selectedDescription = result[i].description;
                    selectedDueDate = result[i].dueDate;
                }
            }

            if (isSelect === false) {
                console.log(id);
                $(".deleteTodoClass").attr("id", `id:${id}`)
                $("#updateModalBody").empty();
                $("#updateModalBody").append(`<form id="formUpdate">
                <div class="form-group">
                    <label for="exampleInputTitle">Title</label>
                    <input type="text" class="form-control" id="titleUpdate" value="${selectedTitle}">
                </div>

                <div class="form-group">
                    <label for="exampleInputTitle">Description</label>
                    <input type="text" class="form-control" id="descriptionUpdate"
                        value="${selectedDescription}">
                </div>

                <div class="form-group">
                    <label for="exampleInputTitle">Due Date</label>
                    <input type="text" class="form-control" id="dueDateUpdate" value="${selectedDueDate}">
                    <small id="dateHelp" class="form-text text-muted">Format must be yy-mm-dd</small>
                </div>

            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal"
                onclick="updateTodo();">Update</button>
        </div>`);
                return $.ajax({
                    method: "post",
                    url: "http://localhost:3000/todo/findById",
                    data: {
                        id
                    }
                })
            } else if (isSelect === true && id === selected) {
                isSelect = false
                selected = "";
                $(".deleteTodoClass").attr("id", "")
                $("#updateModalBody").empty();
                $("#updateModalBody").append(`<h1> Select Todo First </h1>`)

                return $.ajax({
                    method: "post",
                    url: "http://localhost:3000/todo/findById",
                    data: {
                        id
                    }
                })
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: "Dont Select more than 1 Todo !!",
                })
            }
        })
        .done((result) => {
            if (result.status === "false") {
                $(`#${id}`).css("background-color", "white");
                return $.ajax({
                    method: "put",
                    url: "http://localhost:3000/todo/selected",
                    data: {
                        id: id,
                        status: "true"
                    }
                });

            } else if (result.status === "true") {
                $(`#${id}`).css("background-color", "#1abc9c");
                return $.ajax({
                    method: "put",
                    url: "http://localhost:3000/todo/selected",
                    data: {
                        id: id,
                        status: "false"
                    }
                });
            }
        })
        .fail((err) => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.responseJSON.message,
            })
        })
}



function deleteTodo(id) {
    if (id.length > 0) {
        Swal.fire({
            title: 'Are you sure to Delete This Todo?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                let idDelete = id.slice(3);
                $.ajax({
                        method: "delete",
                        url: "http://localhost:3000/todo/delete",
                        data: {
                            id: idDelete
                        }
                    })
                    .done((result) => {
                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: 'Delete Todo Successfully',
                        })
                        $("#todoItem").empty();
                        findAllTodos();
                    })
                    .fail((err) => {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: err.responseJSON.message,
                        })
                    })
            }
        })

    } else {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "Select Todo First !!",
        })
    }
}