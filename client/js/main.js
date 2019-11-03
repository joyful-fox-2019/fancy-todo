$(document).ready(function(){
    $(document.body).addClass("modal-open");
    // Tilt Image
    $('.js-tilt').tilt({
        scale: 1.1
    });
    // Sign Up Button
    $("#signup-btn").click(function(event) {
        event.preventDefault();
        signUp();
    });
    // Sign In Button
    $("#signin-btn").click(function(event) {
        event.preventDefault();
        signIn();
    });
    // Add Todo List
    $("#add-todo-btn").click(function(event) {
        event.preventDefault();
        addTodo();
    });
    // Update Todo List
    $("#edit-todo-btn").click(function(event) {
        event.preventDefault();
        editTodo();
    });
    // Ongoing Todo List
    $("#ongoing-todo").click(function(event) {
        showOngoing();
    });
    // Completed Todo List
    $("#completed-todo").click(function(event) {
        showCompleted();
    });
    // Run Initial Function
    isSignIn();
});

function isSignIn() {
    if (!localStorage.getItem("jwt_token") && location.hash !== "#signin") {
        window.location.href = "#signin";
        swal({
            title: "Unauthorized!",
            text: "Please sign in first to access this page!",
            icon: "error"
        });
    } else {
        if (location.hash === "#home") {
            showOngoing();
        }
    }
}

function signUp() {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/signup",
        data: {
            email : $("#signup-email").val(),
            password : $("#signup-password").val()
        }
    })
    .done((response) => {
        if (response) {
            localStorage.setItem("jwt_token", response.jwt_token);
            window.location.href = "#home";
            setTimeout(function(){ location.reload(true); }, 1300);
            swal({
                title: "Success!",
                text: "User has been created successfully!",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        let errors = data.messages.join(", ");
        swal({
            title: "Error!",
            text: errors,
            icon: "error",
            buttons: false,
            timer: 1500
        });
        $("#signup-email").focus();
    });
}

function signIn() {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/signin",
        data: {
            email : $("#signin-email").val(),
            password : $("#signin-password").val()
        }
    })
    .done((response) => {
        if (response) {
            localStorage.setItem("jwt_token", response.jwt_token);
            $("#loginModal").modal("hide");
            $('.modal-backdrop').remove();
            $(document.body).removeClass("modal-open");
            window.location.href = "#home";
            setTimeout(function(){ location.reload(true); }, 1300);
            swal({
                title: "Success!",
                text: "Sign in successfully!",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
        $("#signin-email").focus();
    });
}

function showOngoing() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos?status=ongoing",
        headers: {
            jwt_token: localStorage.getItem("jwt_token")
        }
    })
    .done((responses) => {
        if (responses) {
            showOngoingLists(responses);
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
    });
}

function showCompleted() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos?status=completed",
        headers: {
            jwt_token: localStorage.getItem("jwt_token")
        }
    })
    .done((responses) => {
        if (responses) {
            showCompletedLists(responses);
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
    });
}

function addTodo() {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos/",
        headers: {
            jwt_token: localStorage.getItem("jwt_token")
        },
        data: {
            name : $("#add-todo-name").val(),
            description : $("#add-todo-description").val(),
            due_date : $("#add-todo-due-date").val()
        }
    })
    .done((response) => {
        $("#addModal").modal("hide");
        $('.modal-backdrop').remove();
        $(document.body).removeClass("modal-open");
        showOngoing();
        swal({
            title: "Success!",
            icon: "success",
            buttons: false,
            timer: 1500
        });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        $("#addModal").modal("hide");
        $('.modal-backdrop').remove();
        $(document.body).removeClass("modal-open");
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
    });
}

function complete(todoId) {
        $.ajax({
            method: "PATCH",
            url: `http://localhost:3000/todos/done/${todoId}`,
            headers: {
                jwt_token: localStorage.getItem("jwt_token")
            }
        })
        .done((response) => {
            if (response.n === 1) {
                showOngoing();
                swal({
                    title: "Success!",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            } else {
                swal({
                    title: "Error!",
                    icon: "error",
                    buttons: false,
                    timer: 1500
                });
            }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            let data = jqXHR.responseJSON;
            swal({
                title: "Error!",
                text: data.messages,
                icon: "error",
                buttons: false,
                timer: 1500
            });
        });
}

function uncomplete(todoId) {
    $.ajax({
        method: "PATCH",
        url: `http://localhost:3000/todos/undo/${todoId}`,
        headers: {
            jwt_token: localStorage.getItem("jwt_token")
        }
    })
    .done((response) => {
        if (response.n === 1) {
            showCompleted();
            swal({
                title: "Success!",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        } else {
            swal({
                title: "Error!",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
    });
}

function loadData(todoId) {
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${todoId}`,
        headers: {
            jwt_token: localStorage.getItem("jwt_token")
        }
    })
    .done((response) => {
        if (response) {
            $("#edit-todo-id").val(response._id);
            $("#edit-todo-name").val(response.name);
            $("#edit-todo-description").val(response.description);
            $("#edit-todo-due-date").val(response.due_date.slice(0, 10));
        } else {
            swal({
                title: "Error!",
                icon: "error",
                buttons: false,
                timer: 1500
            });
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
    });
}

function editTodo() {
    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/todos/${$("#edit-todo-id").val()}`,
        headers: {
            jwt_token: localStorage.getItem("jwt_token")
        },
        data: {
            name : $("#edit-todo-name").val(),
            description : $("#edit-todo-description").val(),
            due_date : $("#edit-todo-due-date").val()
        }
    })
    .done((response) => {
        $("#editModal").modal("hide");
        $('.modal-backdrop').remove();
        $(document.body).removeClass("modal-open");
        showOngoing();
        swal({
            title: "Success!",
            icon: "success",
            buttons: false,
            timer: 1500
        });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        let data = jqXHR.responseJSON;
        $("#editModal").modal("hide");
        $('.modal-backdrop').remove();
        $(document.body).removeClass("modal-open");
        swal({
            title: "Error!",
            text: data.messages,
            icon: "error",
            buttons: false,
            timer: 1500
        });
    });
}

function deleteTodo(todoId) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this todo list!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                method: "DELEtE",
                url: `http://localhost:3000/todos/${todoId}`,
                headers: {
                    jwt_token: localStorage.getItem("jwt_token")
                }
            })
            .done((response) => {
                if (response.n === 1) {
                    showOngoing();
                    swal({
                        title: "Success!",
                        icon: "success",
                        buttons: false,
                        timer: 1500
                    });
                } else {
                    swal({
                        title: "Error!",
                        icon: "error",
                        buttons: false,
                        timer: 1500
                    });
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                let data = jqXHR.responseJSON;
                swal({
                    title: "Error!",
                    text: data.messages,
                    icon: "error",
                    buttons: false,
                    timer: 1500
                });
            });
        } 
    });
}

function showOngoingLists (responses) {
    $("#todo-list").empty();
    for (let i = 0; i < responses.length; i++) {
        $("#todo-list").append(
        `<div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" id="complete-${responses[i]._id}" onclick="complete('${responses[i]._id}')" aria-label="Checkbox for following text input">
                </div>
            </div>
            <input type="text" class="form-control" value="${responses[i].name}" readonly aria-label="Text input with checkbox">
            <button class="edit-btn" href="#" id="show-edit-todo" onclick="loadData('${responses[i]._id}')" data-toggle="modal" data-target="#editModal">
                <img src="./images/icons/edit.png" style="width:25px">
            </button>
            <button class="delete-btn" id="delete-${responses[i]._id}" onclick="deleteTodo('${responses[i]._id}')">
                <img src="./images/icons/delete.png" style="width:25px">
            </button>
        </div>
        `);
    }   
}

function showCompletedLists (responses) {
    $("#todo-list").empty();
    for (let i = 0; i < responses.length; i++) {
        $("#todo-list").append(
        `<div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" id="uncomplete-${responses[i]._id}" onclick="uncomplete('${responses[i]._id}')" aria-label="Checkbox for following text input">
                </div>
            </div>
            <input type="text" class="form-control" value="${responses[i].name}" readonly aria-label="Text input with checkbox">
            <button class="edit-btn" href="#" id="show-edit-todo" onclick="loadData('${responses[i]._id}')" data-toggle="modal" data-target="#editModal">
                <img src="./images/icons/edit.png" style="width:25px">
            </button>
            <button class="delete-btn" id="delete-${responses[i]._id}" onclick="deleteTodo('${responses[i]._id}')">
                <img src="./images/icons/delete.png" style="width:25px">
            </button>
        </div>
        `);
    }   
}