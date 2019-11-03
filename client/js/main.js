$(document).ready(function () {
  if(access_token){
    showMainPage()
    fetchTodos()
    fetchUser()
  }

  $('#login').submit(e=>{
    e.preventDefault()
    login()
  })

  $('#register').submit(e=>{
    e.preventDefault()
    register()
  })

  $('#addTodo').submit(e=>{
    e.preventDefault()
    addTodo()
  })

  $('#addProject').submit(e=>{
    e.preventDefault()
    addProject()
  })

  $('#addMember').submit(e=>{
    e.preventDefault()
    addMember()
  })

  $('#sendEmail').click(e=>{
    e.preventDefault()
    mailer()
  })
})
const baseUrl = 'http://localhost:3000'
let access_token = localStorage.getItem('access_token')

// function show
function showLogin(){
  $('#login').show()
  $('#register').hide()
  $('#mainPage').hide()
  $('#logout').hide()
}

function showRegister(){
  $('#login').hide()
  $('#register').show()
  $('#mainPage').hide()
  $('#logout').hide()
}

function showMainPage(){
  $('#login').hide()
  $('#register').hide()
  $('#mainPage').show()
  $('#logout').show()
}

function collapseTodo(id){
  $(`#${id}`).collapse('toggle')
}

// function login
function login(mail, pass){
  const email = mail || $('#loginEmail').val()
  const password = pass || $('#loginPassword').val()
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done((obj)=>{
    const token = obj.token
    const name = obj.name
    localStorage.setItem('access_token', token)
    localStorage.setItem('loggedUser', name)
    access_token =localStorage.getItem('access_token')
    showMainPage()
    fetchTodos()
    fetchUser()
    })
    .fail(err=>{
      Swal.fire(
        'Email/Password wrong',
        'Please check your email/password',
        'error'
      )
    })
}

function logout(){
  localStorage.removeItem('access_token')
  localStorage.removeItem('loggedUser')
  $('#collapseAddProject').collapse('hide')
  $('#collapseAddTodo').collapse('hide')
  $('#collapseAddMember').collapse('hide')
  $('#welcome').empty()
  showLogin()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function register(){
  const name = $('#registerName').val()
  const email = $('#registerEmail').val()
  const password = $('#registerPassword').val()
  $.ajax({
    url: `${baseUrl}/users/register`,
    method: 'POST',
    data: {
      name,
      email,
      password
    }
  })
    .done(user=>{
      login(email, password)
    })
    .fail(err=>{
      Swal.fire(
        `Email is already registered`,
        'Please register another email',
        'error'
      )
    })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    url: `${baseUrl}/users/goauth`,
    method: 'POST',
    data: {
      id_token
    }
  })
    .done(obj=>{
      const token = obj.token
      const name = obj.name
      localStorage.setItem('access_token', token)
      localStorage.setItem('loggedUser', name)
      access_token =localStorage.getItem('access_token')
      showMainPage()
      fetchTodos()
      fetchUser()
    })
}

// function fetch
function fetchTodos(){
  $.ajax({
    url: `${baseUrl}/todos`,
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(todos=>{
      const name = localStorage.getItem('loggedUser')
      $('#welcome').empty()
      $('#welcome').append(`
        <div class="text-white mr-2">Hello ${name}</div>
      `)
      $('#members').empty()
      $('#title').empty()
      $('#memberCollapse').hide()
      $('#title').append(`
        <div>Main Todo</div>
      `)
      $('#todos').empty()
      localStorage.setItem('position', 'main')
      todos.forEach(todo=>{
        let done = './public/undone.png'
        let textDecoration = ""
        let displayNone = ""
        let status = 'doneTodo'
        if(todo.done == true){
          done = './public/done.png'
          textDecoration = 'text-decoration: line-through;'
          displayNone = 'display: none;'
          status = 'undoneTodo'
        }
        $('#todos').append(`
          <div class="d-flex justify-content-between" id="${todo._id}">
            <div class="d-flex">
              <img src="${done}" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-3" onclick="${status}('${todo._id}')">
              <div class="d-flex flex-column">
                <h6 class="m-0" style="${textDecoration}">${todo.title}</h6>
                <small style="${textDecoration}">${todo.description}</small>
              </div>
            </div>
            <div class="d-flex">
              <img src="./public/edit.png" alt="" style="width: 24px; height: 24px; ${displayNone} cursor: pointer" class="mr-2;" onclick="collapseTodo('${todo._id}collapse')">
              <img src="./public/trash.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2" onclick="deleteTodo('${todo._id}')">
            </div>
          </div>
          <div class="collapse mt-3" id="${todo._id}collapse">
            <div class="card card-body">
              <form onsubmit="editTodo('${todo._id}')">
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" placeholder="Enter title" id="${todo._id}title" value="${todo.title}">
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <input type="text" class="form-control" placeholder="Enter description" id="${todo._id}description" value="${todo.description}">
                </div>
                <button type="submit" class="btn btn-primary">Edit todo</button>
              </form>
            </div>
          </div>
          <hr>
        `)
      })
    })
    .fail(err=>{
      console.log(err)
    })
}

function fetchUser(){
  $.ajax({
    url: `${baseUrl}/users`,
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(user=>{
      $('#projects').empty()
      $('#projects').append(`
        <li onclick="mainTodo()" style="cursor: pointer">Main Todo</li>
      `)
      user.projects_id.forEach(project=>{
        $('#projects').append(`
          <li onclick="projectTodo('${project._id}')" style="cursor: pointer">${project.name}</li>
        `)
      })
    })
    .fail(err=>{
      console.log(err)
    })
}

function mainTodo(){
  fetchTodos()
}

function projectTodo(id){
  $.ajax({
    url: `${baseUrl}/todos/project/${id}`,
    method: "GET",
    headers: {
      access_token
    }
  })
    .done(todos=>{
      localStorage.setItem('position', id)
      if(todos.length > 0){
        $('#title').empty()
        $('#memberCollapse').show()
        $('#title').append(`
          <div>${todos[0].project_id.name}</div>
        `)
        $('#todos').empty()
        todos.forEach(todo=>{
          let textDecoration = ""
          let displayNone = ""
          let status = 'doneTodo'
          let done = './public/undone.png'
          if(todo.done == true){
            done = './public/done.png'
            textDecoration = 'text-decoration: line-through;'
            displayNone = 'display: none;'
            status = 'undoneTodo'
          }
          $('#todos').append(`
            <div class="d-flex justify-content-between" id="${todo._id}">
              <div class="d-flex">
                <img src="${done}" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-3" onclick="${status}('${todo._id}')">
                <div class="d-flex flex-column">
                  <h6 class="m-0" style="${textDecoration}">${todo.title}</h6>
                  <small style="${textDecoration}">${todo.description}</small>
                </div>
              </div>
              <div class="d-flex">
                <img src="./public/edit.png" alt="" style="width: 24px; height: 24px; ${displayNone} cursor: pointer" class="mr-2" onclick="collapseTodo('${todo._id}collapse')">
                <img src="./public/trash.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2" onclick="deleteTodo('${todo._id}')">
              </div>
            </div>
            <div class="collapse mt-3" id="${todo._id}collapse">
              <div class="card card-body">
                <form onsubmit="editTodo('${todo._id}')">
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" placeholder="Enter title" id="${todo._id}title" value="${todo.title}">
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" placeholder="Enter description" id="${todo._id}description" value="${todo.description}">
                  </div>
                  <button type="submit" class="btn btn-primary">Edit todo</button>
                </form>
              </div>
            </div>
            <hr>
          `)
        })
      }
      else{
        $('#title').empty()
        $('#title').append(`
          <div>Empty</div>
        `)
        $('#memberCollapse').show()
        $('#todos').empty()
      }
      projectMember(id)
    })
}

function projectMember(id){
  $.ajax({
    url: `${baseUrl}/projects/${id}`,
    method: 'GET',
    headers:{
      access_token
    }
  })
    .done(project=>{
      $('#members').empty()
      project.users_id.forEach(user=>{
        $('#members').append(`
          <li onclick="kickMember('${user._id}')" style="cursor: pointer">${user.name}</li>
        `)
      })
    })
}

// add/delete/edit
function addTodo(){
  const title = $('#todoTitle').val()
  const description = $('#todoDescription').val()
  const position = localStorage.getItem('position')
  let url = `${baseUrl}/todos/project/${position}`
  if(position == 'main'){
    url = `${baseUrl}/todos`
  }
  $.ajax({
    url,
    method: 'POST',
    data: {
      title, 
      description
    },
    headers: {
      access_token
    }
  })
    .done(todo=>{
      $('#todoTitle').val('')
      $('#todoDescription').val('')
      $('#collapseAddTodo').collapse("hide")
      $('#todos').prepend(`
        <div class="d-flex justify-content-between" id="${todo._id}">
          <div class="d-flex">
            <img src="./public/undone.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-3" onclick="doneTodo('${todo._id}')">
            <div class="d-flex flex-column">
              <h6 class="m-0">${todo.title}</h6>
              <small>${todo.description}</small>
            </div>
          </div>
          <div class="d-flex">
            <img src="./public/edit.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2" onclick="collapseTodo('${todo._id}collapse')">
            <img src="./public/trash.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2" onclick="deleteTodo('${todo._id}')">
          </div>
        </div>
        <div class="collapse mt-3" id="${todo._id}collapse">
          <div class="card card-body">
            <form onsubmit="editTodo('${todo._id}')">
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Enter title" id="${todo._id}title" value="${todo.title}">
              </div>
              <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" placeholder="Enter description" id="${todo._id}description" value="${todo.description}">
              </div>
              <button type="submit" class="btn btn-primary">Edit todo</button>
            </form>
          </div>
        </div>
        <hr>
      `)
    })
    .fail(err=>{
      Swal.fire(
        'Empty input detected',
        'Please fill title and description',
        'error'
      )
    })
}

function deleteTodo(id){
  const project_id = localStorage.getItem('position')
  console.log(project_id);
  
  let url = `${baseUrl}/todos/${project_id}/${id}` 

  if(project_id == 'main'){
    url = `${baseUrl}/todos/${id}`
  }

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
      $.ajax({
        url,
        method: 'DELETE',
        headers: {
          access_token
        }
      })
        .done(todo=>{
          Swal.fire(
            'Deleted',
            'Todo successfully deleted',
            'success'
          )
          if(project_id == 'main'){
            fetchTodos()
          }
          else{
            projectTodo(project_id)
          }
        })
        .fail(err=>{
          console.log(err)
        })
    }
  })
}

function doneTodo(id){
  const project_id = localStorage.getItem('position')
  let url = `${baseUrl}/todos/${id}/done`
  if(project_id !== 'main'){
    url = `${baseUrl}/todos/${project_id}/${id}/done`
  }
  $.ajax({
    url,
    method: 'PATCH',
    headers: {
      access_token
    }
  })
    .done(todo=>{
      $(`#${id}`).empty()
      $(`#${id}`).append(`
        <div class="d-flex">
          <img src="./public/done.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-3" onclick="undoneTodo('${todo._id}')">
          <div class="d-flex flex-column">
            <h6 class="m-0" style="text-decoration: line-through;">${todo.title}</h6>
            <small style="text-decoration: line-through;">${todo.description}</small>
          </div>
        </div>
        <div class="d-flex">
          <img src="./public/edit.png" alt="" style="width: 24px; height: 24px; display: none; cursor: pointer" class="mr-2;" onclick="collapseTodo('${todo._id}collapse')">
          <img src="./public/trash.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2" onclick="deleteTodo('${todo._id}')">
        </div>
      `)
    })
}

function undoneTodo(id){
  const project_id = localStorage.getItem('position')
  let url = `${baseUrl}/todos/${id}/undone`
  if(project_id !== 'main'){
    url = `${baseUrl}/todos/${project_id}/${id}/undone`
  }
  $.ajax({
    url,
    method: 'PATCH',
    headers: {
      access_token
    }
  })
    .done(todo=>{
      $(`#${id}`).empty()
      $(`#${id}`).append(`
        <div class="d-flex">
          <img src="./public/undone.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-3" onclick="doneTodo('${todo._id}')">
          <div class="d-flex flex-column">
            <h6 class="m-0" style="">${todo.title}</h6>
            <small style="">${todo.description}</small>
          </div>
        </div>
        <div class="d-flex">
          <img src="./public/edit.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2;" onclick="collapseTodo('${todo._id}collapse')">
          <img src="./public/trash.png" alt="" style="width: 24px; height: 24px; cursor: pointer" class="mr-2" onclick="deleteTodo('${todo._id}')">
        </div>
      `)
    })
}

function addProject(){
  const name = $('#projectName').val()
  $.ajax({
    url: `${baseUrl}/projects`,
    method: 'POST',
    headers: {
      access_token
    },
    data: {
      name
    }
  })
    .done(project=>{
      $('#collapseAddProject').collapse('hide')
      $('#projectName').val('')
      $('#projects').append(`
        <li onclick="projectTodo('${project._id}')" style="cursor: pointer">${project.name}</li>
      `)
    })
    .fail(err=>{
      console.log(err.responseJSON);
    })
}

function addMember(){
  const project_id = localStorage.getItem('position')
  const email = $('#memberEmail').val()
  $.ajax({
    url: `${baseUrl}/projects/invite/${project_id}`,
    method: 'PATCH',
    data: {
      email
    },
    headers: {
      access_token
    }
  })
    .done(({userInvited})=>{
      $('#memberEmail').val('')
      $('#collapseAddMember').collapse('hide')
      $('#members').append(`
        <li onclick="kickMember('${userInvited._id}')" style="cursor: pointer">${userInvited.name}</li>
      `)
    })
    .fail(err=>{
      Swal.fire(
        'Error input',
        `${err.responseJSON.error}`,
        'error'
      )
    })
}

function kickMember(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "Are you sure want to kick him?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      const project_id = localStorage.getItem('position')
      $.ajax({
        url: `${baseUrl}/projects/kick/${project_id}`,
        method: 'PATCH',
        data:{
          user_id: id
        },
        headers:{
          access_token
        }
      })
        .done(project=>{
          Swal.fire(
            'Success kicked',
            'User got kicked',
            'success'
          )
          projectMember(project_id)
        })
        .fail(err=>{
          console.log(err)
        })
    }
  })
}

function editTodo(id){
  const project_id = localStorage.getItem('position')
  const title = $(`#${id}title`).val()
  const description = $(`#${id}description`).val()
  let url = `${baseUrl}/todos/${id}`
  if(project_id !== 'main'){
    url = `${baseUrl}/todos/${project_id}/${id}`
  }
  $.ajax({
    url,
    method: 'PUT',
    headers: {
      access_token
    },
    data: {
      title,
      description
    }
  })
    .done(todo=>{
      if(project_id !== 'main'){
        projectTodo(project_id)
      }
      else{
        fetchTodos()
      }
    })
    .fail(err=>{
      console.log(err.responseJSON);
      
    })
}

// function mailer
function mailer(){
  $.ajax({
    url: `${baseUrl}/users/mailer`,
    method: 'POST',
    headers: {
      access_token
    }
  })
    .done(status=>{
      Swal.fire(
        'Email sended',
        'Success send to your email',
        'success'
      )
    })
    .fail(err=>{
      console.log(err);
      
    })
}