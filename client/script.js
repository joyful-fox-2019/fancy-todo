$(document).ready(function(){
  
  if(localStorage.getItem("access_token")){
    console.log("You Successfuly Login")
    renderHomePage()
    fetchListProject()
    // renderMemberListPage()
  } 
  else{
    renderLoginPage()
  }
  
  login()
  register()
})

var baseURL = "http://localhost:3000"

function parseMonth (num) {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }
  return months[`${num}`]
}

function parseDay (num) {
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  return days[`${num}`]
}

function parseDate (dateD) {
  let dateDate = new Date(dateD)
  let date = dateDate.getDate()
  let month = dateDate.getMonth() + 1
  let year = dateDate.getFullYear()
  return `${year}/${month}/${date}`
}

// Render Page Function
function renderLoginPage () {
  $("#loginPage").show()
  $("#registerPage").hide()
  $("#nav-bar").hide()
  $("#userHomeTodo").hide()
  $("#projectHomeTodo").hide()
  $("#projectMemberList").hide()
}

function renderRegisterPage () {
  $("#registerPage").show()
  $("#loginPage").hide()
}

function renderHomePage () {
  $("#nav-bar").show()
  $("#userHomeTodo").show()
  $("#projectHomeTodo").hide()
  $("#loginPage").hide()
  $("#registerPage").hide()
  $("#projectMemberList").hide()
  fetchUserTodo()
  fetchListProject()
}

function renderProjectPage (id) {
  $("#nav-bar").show()
  $("#projectHomeTodo").show()
  $("#userHomeTodo").hide()
  $("#loginPage").hide()
  $("#registerPage").hide()
  $("#projectMemberList").hide()
  fetchProjectTodo(id)
}

$("#backToProject").click(function(event){
  event.preventDefault()
  renderProjectPage(projectId)
})

function renderMemberListPage () {
  $("#nav-bar").show()
  $("#projectMemberList").show()
  $("#projectHomeTodo").hide()
  $("#userHomeTodo").hide()
  $("#loginPage").hide()
  $("#registerPage").hide()
  fetchDataMember()
}

// Asyncronus Function
function login () {
  $("#loginForm").submit(function(event){
    event.preventDefault()
    Swal.fire({
      heightAuto: false,
      text: "Processing your login...",
      onOpen: Swal.showLoading
    })
    let email = $("#loginEmail").val()
    let password = $("#loginPassword").val()
    $.ajax({
      url: `${ baseURL }/users/login`,
      method: 'post',
      data: {
        email,
        password
      }
    })
    .done(function(data){
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("name", data.name)
      localStorage.setItem("_id", data._id)
      renderHomePage()
      Swal.close()
    })
    .fail(function(err){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.message,
        heightAuto: false
      })
    })

  })
}

function register () {
  $("#registerForm").submit(function(event){
    event.preventDefault()
    Swal.fire({
      heightAuto: false,
      text: "Processing your data...",
      onOpen: Swal.showLoading
    })
    let email = $("#registerEmail").val()
    let password = $("#registerPassword").val()
    let name = $("#registerName").val()
    $.ajax({
      url: `${ baseURL }/users/register`,
      method: 'post',
      data: {
        email,password,name
      }
    })
    .done(function(data){
      console.log(data)
      renderLoginPage()
      Swal.fire({
        type: 'success',
        title: 'Register Completed!',
        text: "Please login to continue.",
        heightAuto: false
      })
    })
    .fail(function(err){
      console.log(err)
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors[0],
        heightAuto: false
      })
    })
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${ baseURL }/users/googleSignIn`,
    method: 'post',
    data: {
      id_token
    }
  })
  .done(function(data){
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("name", data.name)
    localStorage.setItem("_id", data._id)
    renderHomePage()
  })
  .fail(function(err){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err.responseText,
      heightAuto: false
    })
  })
}

function logout () {
  localStorage.removeItem("access_token")
  localStorage.removeItem("name")
  localStorage.removeItem("_id")
  localStorage.removeItem("project_name")
  var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
  $("#loginEmail").val('')
  $("#loginPassword").val('')
  renderLoginPage()
  $(".navbar-collapse").collapse('hide')
}

function fetchUserTodo () {
  $("#welcome-world-username").empty()
  $("#welcome-world-username").append(`${localStorage.getItem("name")}`)
  
  $.ajax({
    method: 'get',
    url: `${ baseURL }/todos`,
    headers: {
      authorization: localStorage.getItem('access_token')
    }
  })
  .done(function(data){
    console.log(data)
    $("#todo-place").empty()
    for(let i = 0; i < data.length; i++){
      let dueDate = new Date(data[i].dueDate)
      $("#todo-place").append(`
      <div class="card mb-2" onclick="updateTodo('${data[i]._id}')" style="cursor: pointer;">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-12 col-md-10">
              <p class="m-0">
                <b class="text-palegreen">
                  ${data[i].title}
                </b>
              </p>
              <p class="mt-1 mb-0 text-muted">
                ${parseDay(dueDate.getDay())}, ${dueDate.getDate()} ${parseMonth(dueDate.getMonth())} ${dueDate.getFullYear()} 
              </p>
            </div>
            <div class="col-12 col-md-2 text-md-center mt-1">
              <span class="badge badge-pill badge-secondary">${localStorage.getItem("name")}</span>
            </div>
          </div>
        </div>
      </div>
      `)
    }
  })
  .fail(function(err){
    console.log(err.responseJSON)
  })
}

var todoForUpdate

function updateTodo (id) {
  console.log(id)
  todoForUpdate = id
  $.ajax({
    method:'get',
    url: `${ baseURL }/todos/${id}`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editTitleTodo").val(data.title)
    $("#editDescriptionTodo").val(data.description)
    $("#editDateTodo").val( parseDate(data.dueDate) )
    $("#editTodo").modal('show')
  })
  .fail(function(err){
    console.log(err)
  })
}

function updateTodoProcess () {
  $.ajax({
    method: 'patch',
    url: `${ baseURL }/todos/${todoForUpdate}`,
    data: {
      title: $("#editTitleTodo").val(),
      description: $("#editDescriptionTodo").val(),
      dueDate: $("#editDateTodo").val()
    },
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editTodo").modal('hide')
    renderHomePage()
  })
  .fail(function(err){
    console.log(err)
  })
}

function createTodo () {
  $.ajax({
    method: 'post',
    url: `${ baseURL }/todos`,
    data: {
      title: $("#titleNewTodo").val(),
      description: $("#descriptionNewTodo").val(),
      dueDate: $("#dueDateNewTodo").val()
    },
    headers: {
      authorization:localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    renderHomePage()
    $("#createNewTodo").modal('hide')
    $("#titleNewTodo").val(''),
    $("#descriptionNewTodo").val(''),
    $("#dueDateNewTodo").val('')
  })
  .fail(function(err){
    console.log(err)
  })
}

function deleteTodo () {
  $.ajax({
    method: 'delete',
    url: `${ baseURL }/todos/${todoForUpdate}`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editTodo").modal("hide")
    renderHomePage()
  })
  .fail(function(err){
    console.log(err)
  })
}

// Project Function

var projectId

function createNewProject () {
  $.ajax({
    method: 'post',
    url: `${ baseURL }/projects`,
    headers: {
      authorization: localStorage.getItem('access_token')
    },
    data: {
      projectName: $("#titleNewProject").val()
    }
  })
  .done(function(data){
    fetchListProject()
    renderProjectPage(data._id)
    projectId = data._id
    $("#createNewProject").modal("hide")
  })
  .fail(function(err){
    console.log(err)
  })
}

function fetchListProject () {
  $.ajax({
    method: 'get',
    url: `${ baseURL }/projects`,
    headers:{
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    console.log(data)
    $("#nav-bar-project").empty()
    for(let i = 0; i < data.length; i++){
      $("#nav-bar-project").append(`
      <a class="dropdown-item" onclick="renderProjectPage('${data[i]._id}')" style="cursor: pointer;">${data[i].projectName}</a>
      `)
    }
  })
  .fail(function(err){
    console.log(err)
  })
}

function fetchProjectTodo (id) {
  projectId = id
  $.ajax({
    method: 'get',
    url: `${ baseURL }/projects/todo/${id}`,
    headers: {
      authorization: localStorage.getItem('access_token')
    }
  })
  .done(function({data,projectName}){
    console.log(data)
    // localStorage.setItem("project_name",projectName)
    $("#welcome-world-project").empty()
    $("#welcome-world-project").append(projectName)
    $("#welcome-world-project2").empty()
    $("#welcome-world-project2").append(projectName)
    $("#project-todo-place").empty()
    for(let i = 0; i < data.length; i++){
      let dueDate = new Date(data[i].dueDate)
      $("#project-todo-place").append(`
      <div class="card mb-2" onclick="updateProjectTodo('${data[i]._id}')" style="cursor: pointer;">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-12 col-md-10">
              <p class="m-0">
                <b class="text-palegreen">
                  ${data[i].title}
                </b>
              </p>
              <p class="mt-1 mb-0 text-muted">
                ${parseDay(dueDate.getDay())}, ${dueDate.getDate()} ${parseMonth(dueDate.getMonth())} ${dueDate.getFullYear()}
              </p>
            </div>
            <div class="col-12 col-md-2 text-md-center mt-1">
              <span class="badge badge-pill badge-info">${projectName}</span>
            </div>
          </div>
        </div>
      </div>
      `)
    }
  })
  .fail(function(err){
    console.log(err)
  })
}

var todoForProjectUpdate

function updateProjectTodo (id) {
  console.log(id)
  todoForProjectUpdate = id
  $.ajax({
    method:'get',
    url: `${ baseURL }/projects/todo/one/${id}`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editProjectTitleTodo").val(data.title)
    $("#editProjectDescriptionTodo").val(data.description)
    $("#editProjectDateTodo").val( parseDate(data.dueDate) )
    $("#editProjectTodo").modal('show')
  })
  .fail(function(err){
    console.log(err)
  })
}

function updateProjectTodoProcess () {
  $.ajax({
    method: 'patch',
    url: `${ baseURL }/projects/todo/one/${todoForProjectUpdate}`,
    data: {
      title: $("#editProjectTitleTodo").val(),
      description: $("#editProjectDescriptionTodo").val(),
      dueDate: $("#editProjectDateTodo").val()
    },
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    $("#editProjectTodo").modal('hide')
    fetchProjectTodo(projectId)
  })
  .fail(function(err){
    console.log(err)
  })
}

function deleteProjectTodo () {
  $.ajax({
    method: 'delete',
    url: `${ baseURL }/projects/todo/${projectId}/${todoForProjectUpdate}`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    fetchProjectTodo(projectId)
    $("#editProjectTodo").modal('hide')
  })
  .fail(function(err){
    console.log(err)
  })
}

function createProjectTodo () {
  $.ajax({
    method: 'post',
    url: `${ baseURL }/projects/todo/${projectId}`,
    data: {
      title: $("#titleProjectNewTodo").val(),
      description: $("#descriptionProjectNewTodo").val(),
      dueDate: $("#dueDateProjectNewTodo").val()
    },
    headers: {
      authorization:localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    fetchProjectTodo(projectId)
    $("#createProjectNewTodo").modal('hide')
    $("#titleProjectNewTodo").val(''),
    $("#descriptionProjectNewTodo").val(''),
    $("#dueDateProjectNewTodo").val('')
  })
  .fail(function(err){
    console.log(err)
  })
}

function fetchDataMember () {
  $.ajax({
    method: 'get',
    url: `${ baseURL }/projects/user/${ projectId }`,
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function({user,owner}){
    // console.log(user,owner)
    $("#project-member-place").empty()
    for(let i = 0; i < user.length; i++){
      if(owner._id == user[i]._id){
        $("#project-member-place").append(`
        <div class="card mb-2" style="cursor: pointer;">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-12 col-md-10">
                <p class="m-0">
                  <b class="text-palegreen">
                    ${user[i].name}
                  </b>
                </p>
                <p class="mt-1 mb-0 text-muted">
                  ${user[i].email}
                </p>
              </div>
              <div class="col-12 col-md-2 text-md-center mt-1">
                <span class="badge badge-pill badge-primary">Owner</span>
              </div>
            </div>
          </div>
        </div>
        `)
      }
      else if(owner._id == localStorage.getItem('_id')){
        $("#project-member-place").append(`
        <div class="card mb-2" style="cursor: pointer;">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-12 col-md-10">
                <p class="m-0">
                  <b class="text-palegreen">
                    ${user[i].name}
                  </b>
                </p>
                <p class="mt-1 mb-0 text-muted">
                  ${user[i].email}
                </p>
              </div>
              <div class="col-12 col-md-2 text-md-center mt-1">
                <span onclick="deleteMember('${user[i]._id}')" class="badge badge-pill badge-danger">Delete</span>
              </div>
            </div>
          </div>
        </div>
        `)
      }
      else{
        $("#project-member-place").append(`
        <div class="card mb-2" style="cursor: pointer;">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-12 col-md-10">
                <p class="m-0">
                  <b class="text-palegreen">
                    ${user[i].name}
                  </b>
                </p>
                <p class="mt-1 mb-0 text-muted">
                  ${user[i].email}
                </p>
              </div>
              <div class="col-12 col-md-2 text-md-center mt-1">
                <span class="badge badge-pill badge-secondary">Member</span>
              </div>
            </div>
          </div>
        </div>
        `)
      }
    }
  })
  .fail(function(err){
    console.log(err)
  })
}

function addMember () {
  $.ajax({
    method: 'post',
    url: `${ baseURL }/projects/user/${ projectId }`,
    data: {
      email: $("#emailMember").val()
    },
    headers: {
      authorization: localStorage.getItem("access_token")
    }
  })
  .done(function(data){
    fetchDataMember()
    $("#emailMember").val('')
  })
  .fail(function(err){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err.responseJSON.message,
      heightAuto: false
    })
  })
}

function deleteMember (id) {
  console.log(id)
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove user!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: 'patch',
        url: `${ baseURL }/projects/user/${ projectId }/${ id }`,
        headers: {
          authorization: localStorage.getItem("access_token")
        }
      })
      .done(function(data){
        fetchDataMember()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
      .fail(function(err){
        console.log(err)
      })
    }
  })
}

function deleteProject () {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete this project!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: 'delete',
        url: `${ baseURL }/projects/${ projectId }`,
        headers: {
          authorization: localStorage.getItem("access_token")
        }
      })
      .done(function(data){
        renderHomePage()
        Swal.fire(
          'Deleted!',
          'Your project has been deleted.',
          'success'
        )
      })
      .fail(function(err){
        console.log(err)
        Swal.fire(
          'Owww...',
          err.responseJSON.message,
          'error'
        )
      })
    }
  })
}