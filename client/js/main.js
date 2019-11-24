const config = {
    host: 'http://localhost:3000'
}

var temp_id = ''
var temp_tp_id = ''
var temp_project_id = ''
var temp_project_name = ''
var temp_user_id = ''

$(document).ready(() => {
    $('#login-email').val(''),
    $('#login-password').val('')
    $('#register-name').val(''),
    $('#register-email').val(''),
    $('#register-password').val('')
    displayTodos()
    checktoken()
});

function checktoken() {
    const token = localStorage.getItem('token')

    if(token) {
        $('#login-form').hide()
        $('#register-form').hide()
        $('#nav-logout').show()
        $('#nav-notifs').show()
        $('#nav-register').hide()
        $('#logo').hide()
        $('#nav-logo').show()
        $('#nav-login').hide()
        $('.container').show()
        $('#projects').hide()
        $('#todos').show()
        $('#create-project').hide()
        $('#indetails').hide()
        $('#notifications').hide()
        $('#notifs-header').hide()
        $('#projects-list').hide()
        $('#home').show()
        $('#profile').hide()
        $('#notification').hide()
        getAllUsers()
    } else {
        $('#register-form').hide()
        $('#nav-logout').hide()
        $('#nav-notifs').hide()
        $('#logo').show()
        $('#nav-logo').hide()
        $('#nav-register').show()
        $('#nav-login').show()
        $('.container').hide()
        $('#todos').hide()
        $('#projects').hide()
        $('#notifications').hide()
        $('#home').hide()
        $('#notification').hide()
    }
}

//=========================================================================EXTRA FEAUTURES

function displayProfile() {
    $('#profile').show()
    $('#todos').hide()
    $('#projects').hide()
    $('#projects-list').hide()
    $('#indetails').hide()
    $('#notifications').hide()
    $('#notifs-header').hide()
    $('#home').hide()
    $('#notification').hide()
    $('#following-list').empty()
    $('#followers-list').empty()
    getFollowing()
    getFollowers()
}

function getAllUsers() {
    const token = localStorage.getItem('token')
    $('#users-list').empty()

    $.ajax({
        method: 'get',
        url: `${config.host}/`,
        headers: {token}
    })
        .done(users => {
            for(let i = 0; i < users.length; i++) {
                $('#users-list').prepend(`
                    <div id="member"> 
                        <p>${users[i].name}</p> 
                        <button type="button" onclick="follow('${users[i].id}')" class="btn btn-primary">Follow</button>
                    </div>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function getUserId (id) {
    temp_user_id = id
}

function sendMessage() {
    const token = localStorage.getItem('token')

    $.ajax({
        method: 'post',
        url: `${config.host}/messages/${temp_user_id}`,
        headers: {token},
        data: {
            content: $('#input-content').val()
        }
    })
        .done(message => {
            Swal.fire(
                'Message Sent!',
                'Success',
                'success'
            )
        })
        .fail(err => {
            console.log(err)
        })
}

function deleteMessage(id) {
    const token = localStorage.getItem('token')

    $.ajax({
        method: 'delete',
        url: `${config.host}/messages/${id}`,
        headers: {token}
    })
        .done(message => {
            Swal.fire(
                'Message is deleted!',
                'Success',
                'success'
            )
            displayInbox()
        })
}

function getFollowing() {
    const token = localStorage.getItem('token')

    $.ajax({
        method: 'get',
        url: `${config.host}/following`,
        headers: {token}
    })
        .done(users => {
            $('#following-list').prepend(`
                <div class="modal fade" id="sendmessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Send a Message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <label>Content</label>
                                <input class="form-control" id="input-content"><br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" onclick="sendMessage()" data-dismiss="modal" class="btn btn-success">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
            for(let i = 0; i < users.length; i++) {
                $('#following-list').prepend(`
                    <center>
                        <div id="member"> 
                            <p>${users[i].name}</p> 
                            <div id="following-btns">
                                <button type="button" onclick="getUserId('${users[i]._id}')" class="btn btn-primary" data-toggle="modal" data-target="#sendmessage">Send Message</button>
                                <button type="button" onclick="unfollow('${users[i]._id}')" class="btn btn-danger">Unfollow</button>
                            </div>
                        </div>
                    </center>

                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function getFollowers() {
    const token = localStorage.getItem('token')

    $.ajax({
        method: 'get',
        url: `${config.host}/followers`,
        headers: {token}
    })
        .done(users => {
            for(let i = 0; i < users.length; i++) {
                $('#followers-list').prepend(`
                    <div id="member"> 
                        <p>${users[i].name}</p> 
                        <div id="following-btns">
                        <button type="button" onclick="getUserId('${users[i]._id}')" class="btn btn-primary" data-toggle="modal" data-target="#sendmessage">Send Message</button>
                        </div>
                    </div>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function follow(id) {
    const token = localStorage.getItem('token')
    $('#users-list').empty()

    $.ajax({
        method: 'patch',
        url: `${config.host}/follow/${id}`,
        headers: {token}
    })
        .done(users => {
            Swal.fire(
                'Followed!',
                'Success',
                'success'
            )
            getAllUsers()
        })
        .fail(err => {
            console.log(err)
        })
}

function unfollow(id) {
    const token = localStorage.getItem('token')
    $('#following-list').empty()

    $.ajax({
        method: 'patch',
        url: `${config.host}/unfollow/${id}`,
        headers: {token}
    })
        .done(users => {
            Swal.fire(
                'Unfollowed!',
                'Success',
                'success'
            )
            getFollowing()
        })
        .fail(err => {
            console.log(err)
        })
}

//=========================================================================LOGINS & REGISTER

function displayRegister() {
    $('#register-form').show()
    $('#login-form').hide()
}

function register(e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: `${config.host}/register`,
        data: {
            name: $('#register-name').val(),
            email: $('#register-email').val(),
            password: $('#register-password').val()
        }
    })
        .done(user => {
            localStorage.setItem('token', user.token)
            $('#register-name').val(''),
            $('#register-email').val(''),
            $('#register-password').val('')
            Swal.fire(
                'Registered',
                'Success',
                'success'
              )
              checktoken()
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function displayLogin() {
    $('#register-form').hide()
    $('#login-form').show()
}

function login(e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: `${config.host}/login`,
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(user => {
            localStorage.setItem('token', user.token)
            $('#login-email').val('')
            $('#login-password').val('')
            $('#login-form').hide()
            Swal.fire(
                'Logged in',
                'Success',
                'success'
            )
            checktoken()
        })
        .fail(err => {
            console.log(err)
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function onSignIn(googleUser) {
    var googleToken = googleUser.getAuthResponse().id_token;

    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $.ajax ({
        method: 'POST',
        url: `${config.host}/gsignin`,
        data: {
            id_token: googleToken
        }
    })
    .done(token => {
        localStorage.setItem('token', token.token)
        checktoken()
    })
    .fail(err => {
        console.log(err)
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        Swal.fire(
            'Logged out',
            'Success',
            'success'
        )
        $('#login-form').show()
        checktoken()
    });
}

//=========================================================================TODOS

function displayTodo() {
    $('#projects').hide()
    $('#todos').show()
    $('#projects-list').hide()
    $('#create-project').hide()
    $('#indetails').hide()
    $('#notifs-header').hide()
    $('#notifications').hide()
    $('#home').show()
    $('#profile').hide()
    $('#notification').hide()
}

function displayTodos() {
    $('#todos-list').empty()
    $('#notifs-header').hide()
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'get',
        url: `${config.host}/todos`,
        headers: {token}
    })
        .done(todos_data => {
            for (let i = 0; i < todos_data.length; i++) {
                $('#todos-list').prepend(`
                <div class="card w-75">
                    <div class="card-body">
                        <h5 class="card-title">${todos_data[i].title}</h5>
                        <p class="card-text">${todos_data[i].description}</p>
                        <button type="button" onclick="editTodo('${todos_data[i]._id}', '${todos_data[i].title}','${todos_data[i].description}')" class="btn btn-primary" data-toggle="modal" data-target="#edit">Edit</button> 
                        <button type="button" onclick="deleteTodo('${todos_data[i]._id}')" class="btn btn-danger">Delete</button>
                    </div>
                </div> <br>
                `)
            }
        })
}

function createTodo() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'post',
        url: `${config.host}/todos`,
        data: {
            title: $('#input-title').val(),
            description: $('#input-description').val()
        },
        headers: { token }
    })
        .done(todo => {
            $('#input-title').val(''),
            $('#input-description').val('')
            Swal.fire(
                'Todo has been successfully created',
                'Success',
                'success'
            )
            displayTodos()
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function deleteTodo(id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'delete',
        url: `${config.host}/todos/${id}`,
        headers: { token }
    })
        .done(todo => {
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
                    displayTodos()
                    displayTodosProject(temp_project_id)
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
              })
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function editTodo(id, title, description) {
    temp_id = id
    $('#edit-id').val(id)
    $('#edit-title').val(title)
    $('#edit-description').val(description)
}

function updateTodo() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'put',
        url: `${config.host}/todos/${temp_id}`,
        data: {
            title: $('#edit-title').val(),
            description: $('#edit-description').val()
        },
        headers: { token }
    })
        .done(todo => {
            Swal.fire(
                'Todo has been successfully updated',
                'Success',
                'success'
            )
            displayTodos()
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

//=========================================================================NOTIFICATIONS

function displayNotifications() {
    $('#projects').hide()
    $('#todos').hide()
    $('#notifications').empty()
    $('#notifications').show()
    $('#create-project').hide()
    $('#project-btn').hide()
    $('#projects-list').hide()
    $('#create-project').hide()
    $('#indetails').hide()
    $('#notifs-header').show()
    $('#home').hide()
    $('#profile').hide()
    $('#notification').show()
    displayInbox()
    const token = localStorage.getItem('token')


    $.ajax({
        method: 'get',
        url: `${config.host}/notifications/`,
        headers: {token}
    })
        .done(notifs => {
            $('#notifs-header').empty()
            $('#notifs-header').append(`
            <h2 id="for-border">Project's Invitations</h2> <br>
            `)
            for (let i = 0; i < notifs.length; i++) {
                $('#notifications').prepend(`
                <div class="card w-75">
                    <div class="card-body">
                        <h5 class="card-title">${notifs[i].name}</h5>
                        <button type="button" onclick="acceptInvitation('${notifs[i].id}', '${notifs[i].name}')" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">Accept</button> 
                        <button type="button" onclick="declineInvitation('${notifs[i].id}', '${notifs[i].name}')" class="btn btn-danger">Decline</button>
                    </div>
                </div> <br>
                `)
            }
        })
}

function displayInbox() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'get',
        url: `${config.host}/inbox`,
        headers: {token}
    })  
        .done(user => {
            $('#inbox-list').empty()
            for (let i = 0; i < user.inbox.length; i++) {
                $('#inbox-list').prepend(`
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                    <h5 class="card-title">From: <strong>${user.inbox[i].from}</strong></h5>
                    <p class="card-text">${user.inbox[i].content}</p>
                    <a href="#" onclick="deleteMessage('${user.inbox[i]._id}')" class="btn btn-danger">Delete</a>
                    </div>
                </div> <br>
                `)
            }
        })
}

//=========================================================================PROJECTS

function displayProject() {
    displayProjects()
    $('#projects').show()
    $('#todos').hide()
    $('#invite-list').empty()
    $('#create-project').hide()
    $('#project-btn').show()
    $('#projects-list').show()
    $('#create-project').hide()
    $('#indetails').hide()
    $('#notifs-header').hide()
    $('#notifications').hide()
    $('#notification').hide()
    $('#home').hide()
    $('#profile').hide()
}

function displayProjects() {
    $('#projects-list').empty()
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'get',
        url: `${config.host}/projects`,
        headers: {token}
    })
        .done(projects_data => {
            for (let i = 0; i < projects_data.length; i++) {
                $('#projects-list').prepend(`
                <div class="card w-75">
                    <div class="card-body">
                        <button type="button" onclick="displayDetailsProject('${projects_data[i]._id}', '${projects_data[i].name}')" 
                        class="btn btn-outline-dark btn-lg">${projects_data[i].name}</button><br><br>
                        <span class="badge badge-pill badge-warning"><strong>Members:</strong> ${projects_data[i].user.length}</span><br><br>
                        <button type="button" onclick="displayDetailsProject('${projects_data[i]._id}', '${projects_data[i].name}')" class="btn btn-primary">Enter</button> 
                        <button type="button" onclick="deleteProject('${projects_data[i]._id}')" class="btn btn-danger">Delete</a>
                    </div>
                </div> <br>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function displayDetailsProject(id, name) {
    temp_project_id = id
    temp_project_name = name
    $('#project-id').val(id)
    $('#project-title').val(name)
    $('#details-header').empty()
    $('#create-tp-btn').empty()
    $('#projects').hide()
    $('#todos').hide()
    $('#invite-list').empty()
    $('#create-project').hide()
    $('#project-btn').hide()
    $('#projects-list').hide()
    $('#create-project').hide()
    $('#indetails').show()
    $('#notifs-header').hide()
    $('#notifications').hide()
    $('#home').hide()
    $('#profile').hide()
    getAllUsersToInvite()
    getAllMembers()
    displayTodosProject(id)

    $('#details-header').append(`
        <center>
            <h2 id="for-border">${name}</h2><br>
        </center>
    `)

    $('#create-tp-btn').append(`
        <button id="create-in-project" type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#create-tp">Create New Todo</button> <br><br>
        <div class="modal fade" id="create-tp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create New Todo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="exampleInputEmail1">Title</label>
                        <input class="form-control" id="input-title-tp" placeholder="Enter title"><br>
                        <label for="exampleInputEmail1">Description</label>
                        <input class="form-control" id="input-description-tp" placeholder="Enter description">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" onclick="createTodoProject('${id}')" data-dismiss="modal" class="btn btn-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `)
}

function createProject() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'post',
        url: `${config.host}/projects`,
        data: {
            name: $('#project-name').val()
        },
        headers: {token}
    })
        .done(project => {
            $('#project-name').val('')
            Swal.fire(
                'Project has been successfully created',
                'Success',
                'success'
            )
            displayProjects()
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function deleteProject(id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'delete',
        url: `${config.host}/projects/${id}`,
        headers: { token }
    })
        .done(todo => {
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
                    displayProjects()
                    displayTodosProject(temp_project_id)
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
              })
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function displayTodosProject (id) {
    $('#project-todos').empty()
    temp_project_id = id
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'get',
        url: `${config.host}/projects/todos/${id}`,
        headers: {token}
    })
        .done(projects_data => {
            for (let i = 0; i < projects_data.length; i++) {
                $('#project-todos').prepend(`
                <center>
                    <div class="card w-75">
                        <div class="card-body">
                            <h5 class="card-title">${projects_data[i].title}</h5>
                            <p class="card-text">${projects_data[i].description}</p>
                            <button type="button" onclick="editTodoProject('${projects_data[i]._id}', '${projects_data[i].title}','${projects_data[i].description}')" class="btn btn-primary" data-toggle="modal" data-target="#edit-tp">Edit</button> 
                            <button type="button" onclick="deleteTodo('${projects_data[i]._id}')" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </center> <br>
                `)
            }
        })

}

function createTodoProject(id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'post',
        url: `${config.host}/todos/${id}`,
        data: {
            title: $('#input-title-tp').val(),
            description: $('#input-description-tp').val()
        },
        headers: { token }
    })
        .done(todo => {
            $('#input-title-tp').val(''),
            $('#input-description-tp').val('')
            Swal.fire(
                'Todo has been successfully created',
                'Success',
                'success'
            )
            displayTodosProject(id)
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function editTodoProject(id, title, description) {
    temp_tp_id = id
    $('#edit-tp-id').val(id)
    $('#edit-tp-title').val(title)
    $('#edit-tp-description').val(description)
}

function updateTodoProject() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'put',
        url: `${config.host}/todos/${temp_tp_id}`,
        data: {
            title: $('#edit-tp-title').val(),
            description: $('#edit-tp-description').val()
        },
        headers: { token }
    })
        .done(todo => {
            Swal.fire(
                'Todo has been successfully updated',
                'Success',
                'success'
            )
            displayTodos()
            displayTodosProject(temp_project_id)
        })
        .fail(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        })
}

function invite (id, projectId, projectName) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'patch',
        url: `${config.host}/invite/${id}`,
        headers: {token},
        data: {
            id: projectId,
            name: projectName
        }
    })
        .done(user => {
            Swal.fire(
                'Invitation sent',
                'Success',
                'success'
            )
            displayProjects()
            getAllUsersToInvite()
        })
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
}


function acceptInvitation(id, name) {
    const token = localStorage.getItem('token')

    $.ajax({
        method: 'patch',
        url: `${config.host}/accept`,
        data: {
            id, name
        },
        headers: {token}
    })
        .then(user => {
            displayNotifications()
            Swal.fire(
                'Joined the project!',
                'Success',
                'success'
            )
        })
        .catch(err => {
            console.log(err)
        })
}

function declineInvitation(id, name) {
    const token = localStorage.getItem('token')

    $.ajax({
        method: 'patch',
        url: `${config.host}/decline`,
        data: {
            id, name
        },
        headers: {token}
    })
        .then(user => {
            displayNotifications()
            Swal.fire(
                'Invitation declined successfully!',
                'Success',
                'success'
            )
        })
        .catch(err => {
            console.log(err)
        })
}

function getAllMembers() {
    const token = localStorage.getItem('token')
    $('#project-members').empty()
    $.ajax({
        method: 'get',
        url: `${config.host}/projects/members/${temp_project_id}`,
        headers: {token}
    })
        .done(users => {
            for(let i = 0; i < users.length; i++) { 
                $('#project-members').prepend(`
                <div id="member"> 
                    <p>${users[i].name}</p> 
                    <button type="button" onclick="removeUser('${users[i]._id}')" class="btn btn-danger">Remove</button>
                </div>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function getAllUsersToInvite() {
    const token = localStorage.getItem('token')
    $('#project-invites').empty()
    $.ajax({
        method: 'get',
        url: `${config.host}/projects/members/invite/${temp_project_id}`,
        headers: {token}
    })
        .done(users => {
            for(let i = 0; i < users.length; i++) {
                $('#project-invites').prepend(`
                    <div id="member"> 
                        <p>${users[i].name}</p> 
                        <button type="button" onclick="invite('${users[i].id}', '${temp_project_id}', '${temp_project_name}')" class="btn btn-primary">Invite</button>
                    </div>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function removeUser(id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'patch',
        url: `${config.host}/projects/members/${temp_project_id}`,
        headers: {token},
        data: {
            id
        }
    })
        .done(project => {
            getAllMembers()
            getAllUsersToInvite()
            Swal.fire(
                'Member is successfully removed',
                'Success',
                'success'
            )
        })
        .fail(err => {
            console.log(err)
        })
}