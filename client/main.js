$(document).ready(()=>{
  console.log('DOM is ready');
  // loginCard()
  // ini diacak acak-------------->>>>
  // $('#personalPage').show()
  // $('#projectPage').hide()
  // projectDetailActive()
  if(localStorage.getItem('token')){
    setMyName()
    homePage()
  } else {
    startPage()
  }

})

function startPage(){
  $('#emailLog').val('')
  $('#passLog').val('')
  $('#loginTab').addClass('active')
  $('#registerTab').removeClass('active')
  $('#usernameReg').val('')
  $('#emailReg').val('')
  $('#passReg').val('')
  show('#startPage')
  show('#loginCard')
  hide('#registerCard')
  hide('#homePage')
}

function homePage(){
  myTodoActive()
  hide('#startPage')
  show('#homePage')
  // hide('#projectPage')
  // $('#myTodo').addClass('active')
  getMyTodo()
  getMyDetail()
}

function gotProjectPage(){
  hide('#startPage')
  show('#homePage')
  hide('#createProject')
  hide('#formProject')
  show('#projectTodo')
  show('#todoInProject')
  show('#projectDetail')
  $('#createProject').removeClass('active')
  $('#myTodo').removeClass('active')
  $('#projectTodo').addClass('active')
  $('#projectDetail').removeClass('active')
  getProjectTodo()
}

function show(element){
  $(element).show()
}
function hide(element){
  $(element).hide()
}

function setMyName(){

  $('#myName').empty()
  let name = localStorage.getItem('name')
  $('#myName').append(`
  <img src="https://api.adorable.io/avatars/20/${name}.png" >
  <b style= "margin-left: 10px ">${name}</b>
  `)
}

$('.ui.accordion')
  .accordion({
    exclusive : false
  })

$('#loginTab').click(()=>{
  $('#loginTab').addClass('active')
  $('#registerTab').removeClass('active')
  loginCard()
})

$('#registerTab').click(()=>{
  $('#loginTab').removeClass('active')
  $('#registerTab').addClass('active')
  registerCard()
})

$('form')
  .form({
    on: 'blur',
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your password'
          }
        ]
      },
      username: {
        identifier  : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your username'
          }
        ]
      },
      names: {
        identifier  : 'names',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please input the name of this project'
          }
        ]
      },
      desc: {
        identifier  : 'desc',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please input the description'
          }
        ]
      }
      
    }
  })

$('#loginSubmit').on('submit',(e)=>{
  e.preventDefault()
  $('.ui.dimmer').addClass('active')
  let email = $('#emailLog').val()
  let password = $('#passLog').val()
  if (email.length === 0 || password.length === 0){
    $('.ui.dimmer').removeClass('active')
  } else {
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/users/login',
      data : {
        email,password
      }
    })
    .done((data)=>{
      $('.ui.dimmer').removeClass('active')
      localStorage.setItem('token',data.token)
      localStorage.setItem('name',data.name)
      localStorage.setItem('email',data.email)
      $('#emailLog').empty()
      $('#passLog').empty()
      setMyName()
      // $('#navname').append(`${data.name}`)
      // getCards()
      homePage()
    })
    .fail((err)=>{
      $('.ui.dimmer').removeClass('active')
      setLoginError(err.responseJSON,"Login")
      setTimeout(()=>{
        $('#loginError').empty()
      },4000)
    })
  }
})

$('#registerSubmit').on('submit',(e)=>{
  e.preventDefault()
  $('.ui.dimmer').addClass('active')
  let username = $('#usernameReg').val()
  let email = $('#emailReg').val()
  let password = $('#passReg').val()
  if (email.length === 0 || password.length === 0 || username.length === 0){
    $('.ui.dimmer').removeClass('active')
  } else {
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/users/register',
      data : {
        email,password,username
      }
    })
    .done((data)=>{
      $('.ui.dimmer').removeClass('active')
      localStorage.setItem('token',data.token)
      localStorage.setItem('name',data.name)
      localStorage.setItem('email',data.email)
      $('#usernameReg').val('')
      $('#emailReg').val('')
      $('#passReg').val('')
      setMyName()
      homePage()
    })
    .fail((err)=>{
      $('.ui.dimmer').removeClass('active')
      setLoginError(err.responseJSON,"Register")
      setTimeout(()=>{
        $('#loginError').empty()
      },4000)
    })
  }
})

$('#addpersonaltodo').click(()=>{

  $('.ui.modal.addPersonal')
  .modal('show')
  $('form')
  .form({
    on: 'blur',
    fields: {
      title: {
        identifier  : 'title',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the title'
          }
        ]
      },
      desc: {
        identifier  : 'desc',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the description'
          }
        ]
      }
    }
  })

})

$('#submitPersonalTodo').on('submit',(e)=>{
  e.preventDefault()
  let title = $('#submitPersonalTitle').val()
  let desc = $('#submitPersonalDesc').val()
  let dueDate = $('#submitPersonalDueDate').val()
  console.log(title)
  console.log(desc)
  console.log(dueDate)
  createNewPersonalTodo(title,desc,dueDate)

})

$('#createProject').click(()=>{
  createProjectActive()
})

$('#myTodo').click(()=>{
  myTodoActive()
})

$('#projectTodo').click(()=>{
  projectTodoActive()
})

$('#projectDetail').click(()=>{
  projectDetailActive()
})

$('#submitNewProject').on('submit',(e)=>{
  e.preventDefault()
  let token = localStorage.getItem('token')
  let name = $('#projectNameReg').val()
  let desc = $('#projectDescReg').val()
  registerNewProject(token,name,desc)
})

$('#addProjectTodo').click(()=>{
  $('.ui.modal.addProjectTodo')
  .modal('show')
  $('form')
  .form({
    on: 'blur',
    fields: {
      title: {
        identifier  : 'title',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the title'
          }
        ]
      },
      desc: {
        identifier  : 'desc',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the description'
          }
        ]
      }
    }
  })
})

$('#submitProjectTodo').on('submit',(e)=>{
  e.preventDefault()
  let title = $('#submitProjectTitle').val()
  let desc = $('#submitProjectDesc').val()
  let dueDate = $('#submitProjectDueDate').val()
  createNewProjectTodo(title,desc,dueDate)
})

$('#addMemberButton').click(()=>{
  getAllFreeUser()
})


function createProjectActive(){
  hide('#personalPage')
  show('#projectPage')
  show('#formProject')
  hide('#todoInProject')
  hide('#displayProjectDetail')
  $('#createProject').addClass('active')
  $('#myTodo').removeClass('active')
  $('#projectTodo').removeClass('active')
  $('#projectDetail').removeClass('active')
}

function myTodoActive(){
  show('#personalPage')
  hide('#projectPage')
  hide('#formProject')
  hide('#todoInProject')
  hide('#displayProjectDetail')
  $('#createProject').removeClass('active')
  $('#myTodo').addClass('active')
  $('#projectTodo').removeClass('active')
  $('#projectDetail').removeClass('active')
}

function projectTodoActive(){
  hide('#personalPage')
  show('#projectPage')
  hide('#formProject')
  show('#todoInProject')
  hide('#displayProjectDetail')
  $('#createProject').removeClass('active')
  $('#myTodo').removeClass('active')
  $('#projectTodo').addClass('active')
  $('#projectDetail').removeClass('active')
}

function projectDetailActive(){
  hide('#personalPage')
  show('#projectPage')
  hide('#formProject')
  hide('#todoInProject')
  show('#displayProjectDetail')
  $('#createProject').removeClass('active')
  $('#myTodo').removeClass('active')
  $('#projectTodo').removeClass('active')
  $('#projectDetail').addClass('active')
}

function loginCard(){
  show('#loginCard')
  hide('#registerCard')
}

function registerCard(){
  hide('#loginCard')
  show('#registerCard')
}

function registerCreatorCard(){
  hide('#loginCard')
  hide('#registerCard')
}

function setLoginError(err,type){
  $('#loginError').append(`
  <div class="ui negative message transition">
    <i class="close icon" id="close"></i>
    <div class="header">
      ${type} Failed
    </div>
    <p>${err.message}</p>
    </div>
  `)
  $('#close').click(()=>{
    $('#loginError').empty()
  })
}

function errorMessage(){
  $('#errorGeneral').append(`
  <div class="ui negative message transition">
    <i class="close icon" id="close"></i>
    <div class="header">
      Error
    </div>
    <p>Something wrong with our server</p>
    </div>
  `)
  $('#close').click(()=>{
    $('#errorGeneral').empty()
  })  
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $('.ui.dimmer').addClass('active')
  $.ajax({
  method : 'post',
  url : 'http://localhost:3000/users/OAuth',
  data : {
    id_token
  }
  })
  .done((token)=>{
    $('.ui.dimmer').removeClass('active')
    let name = profile.getName()
    let email = profile.getEmail()
    localStorage.setItem('token',token)
    localStorage.setItem('name',name)
    localStorage.setItem('email',email)
    setMyName()
    // getCards()
    homePage()
  })
  .fail((msg)=>{
    $('.ui.dimmer').removeClass('active')
    console.log(msg);
    errorMessage()
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('projectId')
    localStorage.removeItem('email')
    $('#newMemberForm').empty()
    $('#todoCard1').empty()
    $('#todoCard2').empty()
    $('#todoCard3').empty()
    $('#todoCard4').empty()
    $('#todoCard5').empty()
    $('#todoCard6').empty()
  });
  startPage()
  
}

function getMyDetail(){
  let token = localStorage.getItem('token')
  $.ajax({
    url : `http://localhost:3000/users/${token}`,
    method : 'get'
  })
    .done((user)=>{
      if(user.project){
        hide('#createProject')
        show('#projectDetail')
        show('#projectTodo')
        getProjectTodo()
      } else {
        show('#createProject')
        hide('#projectDetail')
        hide('#projectTodo')
      }
    })
    .fail((err)=>{
      console.log(err)
      errorMessage()
    })
}

function getMyTodo(){
  $('.ui.dimmer').addClass('active')
  
  
  let token = localStorage.getItem('token')
  $.ajax({
    method: 'get',
    url : 'http://localhost:3000/todos',
    headers : {
      token
    }
  })
    .done((todos)=>{
      $('#todoCard1').empty()
      $('#todoCard2').empty()
      $('#todoCard3').empty()
      // $('#todoCard4').empty()
      // $('#todoCard5').empty()
      // $('#todoCard6').empty()
      $('.ui.dimmer').removeClass('active')
      if(todos.length >=1){
        todos.forEach((el)=>{
          if(el.status === "To-do"){
            setMyTodo(el,'#todoCard1')
          } else if (el.status === "On Progress"){
            setMyTodo(el,'#todoCard2')
          } else {
            setMyTodo(el,'#todoCard3')
          }
        })
      }
    })
    .fail((err)=>{
      $('.ui.dimmer').removeClass('active')
      console.log(err)
      errorMessage()
    })
}

function setMyTodo(todo,element){
  $(element).append(`
  <div class="ui fluid card">
    <a class="content" id="card${todo._id}"  style="padding: 5px">
      <div class="header">${todo.title}</div>
      <div class="meta">${todo.createdAt.slice(0,10)}</div>
        <div class="description">
          <p>${todo.desc}.</p>
        </div>
      </a>
  </div>
  `)
  $(`#card${todo._id}`).click(()=>{
    $('#cardDetail').empty()
    setModalDetail(todo)
  })
}

function setModalDetail(todo){
  $('#cardDetail').append(`
  <div class="ui tiny modal detail ${todo._id}">
    <i class="close icon" id="close"></i>
      <div class="header"> ${todo.title} </div>
      <div class="content">
        <div class="description">
          <p>Status: ${todo.status}</p>
          <p>Due date: ${todo.dueDate.slice(0,10)}</p>
          <p>Desc: ${todo.desc}</p>
        </div>
      </div>
      <div class="actions">
        <button class="ui button" id="editTodo${todo._id}">
            edit
        </button>
        <button class="ui button" id="deleteTodo${todo._id}">
            delete
        </button>
      </div>
  </div>
  `)

  $(`.ui.modal.detail.${todo._id}`).modal({
    closable:false
  })
  .modal('show')

  $(`#editTodo${todo._id}`).click(()=>{
    setModalEdit(todo)
    $(`.ui.modal.detail.${todo._id}`)
    .modal('hide').empty()
  })

  $('#close').click(()=>{
    $(`.ui.modal.detail.${todo._id}`)
    .modal('hide').empty()
  })
  
  $(`#deleteTodo${todo._id}`).click(()=>{
    setModalConfirm(todo)
    $(`.ui.modal.detail.${todo._id}`)
    .modal('hide').empty()
    
  })
}

function setModalConfirm(todo){
  $('#deleteCard').append(`
  <div class="ui mini modal ${todo._id}">
      <div class="header"> Delete To-do </div>
      <div class="content">
        <div class="description">
          <p>Are you sure you want to delete this to-do</p>
        </div>
      </div>
      <div class="actions">
        <button class="ui button" id="noConfirm">
            no
        </button>
        <button class="ui button" id="deleteTodo">
            yes
        </button>
      </div>
  </div>
  `)
  $(`.ui.mini.modal.${todo._id}`).modal({
    closable:false
  })
  .modal('show')
  $('#noConfirm').click(()=>{
    $(`.ui.mini.modal.${todo._id}`)
    .modal('hide').empty()
  })
  $(`#deleteTodo`).click(()=>{
    if(todo.projectId){
      deleteProjectTodo(todo.projectId,todo._id)
    } else {
      deletePersonalTodo(todo._id)
    }
 
  })
}

function setModalEdit(todo){
  $('#editCard').append(`
  <div class="ui tiny modal edit ${todo._id}">
      <i class="close icon" id="closeEdit"></i>
      <div class="header">
        Edit this todo
      </div>
      <div class="content">
          <form class="ui form" id="submitEdit">
            <div class="field">
              <label>Title</label>
              <input type="text" name="title" value="${todo.title}" id="editTitle">
            </div>
            <div class="field">
              <label>Desc</label>
              <!-- <input type="textarea" name="desc" placeholder="Description"> -->
              <textarea rows="2"  id="editDesc">${todo.desc}</textarea>
            </div>
            <div class="field">
                <label>Status</label>
                  <div class="ui selection dropdown">
                      <input type="hidden" name="status" id="editStatus">
                      <i class="dropdown icon"></i>
                      <div class="default text">${todo.status}</div>
                      <div class="menu">
                          <div class="item" data-value="To-do">To-do</div>
                          <div class="item" data-value="On Progress">On Progress</div>
                          <div class="item" data-value="Done">Done</div>
                      </div>
                  </div>
              </div>
            <button class="ui button" type="submit">Save</button>
          </form>
      </div>
  </div>
  `)
  $(`.ui.modal.edit.${todo._id}` ).modal({
    closable:false
  })
  .modal('show')
  $('.ui.selection.dropdown')
  .dropdown()
  $('#submitEdit').on('submit',(e)=>{
    e.preventDefault()
    let title = $('#editTitle').val()
    let desc = $('#editDesc').val()
    let status = $('#editStatus').val()
    if(status){
      if(todo.projectId){
        editProjectTodo(todo.projectId,todo._id,title,desc,status)
      }else{
        editPersonalTodo(todo._id,title,desc,status)
      }
      $(`.ui.modal.edit.${todo._id}`)
      .modal('hide').empty()
    }else{
      let statis = todo.status
      if(todo.projectId){
        editProjectTodo(todo.projectId,todo._id,title,desc,statis)
      }else{
        editPersonalTodo(todo._id,title,desc,statis)
      }
      $(`.ui.modal.edit.${todo._id}`)
      .modal('hide').empty()
    }
  })
  $('#closeEdit').click(()=>{
    $(`.ui.modal.edit.${todo._id}`)
    .modal('hide').empty()
  })
}

function createNewPersonalTodo(title,desc,dueDate){
  let token = localStorage.getItem('token')
 $.ajax({
   url : 'http://localhost:3000/todos',
   method : 'post',
   headers : {
     token
   },
   data : {
     title,desc,dueDate
   }
 })
  .done((report)=>{
    $('.ui.modal.addPersonal')
    .modal('hide')
    $('#submitPersonalTitle').val('')
    $('#submitPersonalDesc').val('')
    $('#submitPersonalDueDate').val('')
    getMyTodo()
  })
  .fail((err)=>{
    console.log(err);
  })
}

function editPersonalTodo(id,title,desc,status){
  let token = localStorage.getItem('token')
  $.ajax({
    url : `http://localhost:3000/todos/${id}`,
    method : 'patch',
    headers : {
      token
    },
    data : {
      title,desc,status
    }
  })
    .done((report)=>{
      getMyTodo()
    })
    .fail((err)=>{
      console.log(err)
      errorMessage()
    })
}

function deletePersonalTodo(id){
  let token = localStorage.getItem('token')
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    method : 'delete',
    headers : {token}
  })
    .done((report)=>{
      $(`.ui.mini.modal.${id}`)
      .modal('hide').empty()
      getMyTodo()
    })
    .fail((err)=>{
      console.log(err)
      errorMessage()
    })
}

function registerNewProject(token,name,desc){
  $.ajax({
    url : 'http://localhost:3000/projects/create',
    method : 'post',
    headers : {
      token
    },
    data : {
      name,desc
    }
  })
    .done((report)=>{
      $('#projectNameReg').val('')
      $('#projectDescReg').val('')
      gotProjectPage()
      // getProjectTodo()
    })
    .fail((err)=>{
      console.log(err);
    })
}

function getProjectTodo(){
  $('.ui.dimmer').addClass('active')
 
  let token = localStorage.getItem('token')
  $.ajax({
    url : 'http://localhost:3000/projects/getproject',
    method : 'get',
    headers : {
      token
    }
  })
    .done((project)=>{
      // $('#todoCard1').empty()
      // $('#todoCard2').empty()
      // $('#todoCard3').empty()
      $('#todoCard4').empty()
      $('#todoCard5').empty()
      $('#todoCard6').empty()
      $('.ui.dimmer').removeClass('active')
      setProjectDetail(project)
      $('#thisProjectName').empty()
      $('#thisProjectName').append(`
      <h3>${project.name}</h3>
      `)
      localStorage.setItem('projectId',project._id)
      if(project.todos.length >=1){
        project.todos.forEach((el)=>{
          if(el.status === "To-do"){
            setMyTodo(el,'#todoCard4')
          } else if (el.status === "On Progress"){
            setMyTodo(el,'#todoCard5')
          } else {
            setMyTodo(el,'#todoCard6')
          }
        })
      }
    })
    .fail((err)=>{
      $('.ui.dimmer').removeClass('active')
      console.log(err)
    })
}

function setProjectTodo(project){
  // masih kosong
}

function createNewProjectTodo(title,desc,dueDate){
  let token = localStorage.getItem('token')
  let projectId = localStorage.getItem('projectId')
  $.ajax({
    url : `http://localhost:3000/projects/addtodo/${projectId}` ,
    method : 'post',
    headers : {
      token
    },
    data : {
      title,desc,dueDate
    }
  })
   .done((report)=>{
     $('.ui.modal.addProjectTodo')
     .modal('hide')
     $('#submitProjectTitle').val('')
     $('#submitProjectDesc').val('')
     $('#submitProjectDueDate').val('')
     getProjectTodo()
   })
   .fail((err)=>{
     console.log(err);
   })
}

function editProjectTodo(projectId,todoId,title,desc,status){
  let token = localStorage.getItem('token')
  $.ajax({
    url : `http://localhost:3000/projects/${projectId}/${todoId}`,
    method : 'patch',
    headers : {
      token
    },
    data : {
      title,desc,status
    }
  })
    .done((report)=>{
      getProjectTodo()
    })
    .fail((err)=>{
      console.log(err)
      errorMessage()
    })
}

function deleteProjectTodo(projectId,todoId){
  let token = localStorage.getItem('token')
  $.ajax({
    url: `http://localhost:3000/projects/${projectId}/${todoId}`,
    method : 'delete',
    headers : {token}
  })
    .done((report)=>{
      $(`.ui.mini.modal.${todoId}`)
      .modal('hide').empty()
      getProjectTodo()
    })
    .fail((err)=>{
      console.log(err)
    })
}

function setProjectDetail(project){
  $('#tbodyProject').empty()
  $('#setProjectDetail').empty()
  $('#setProjectDetail').append(`
    <h1>${project.name}</h1>
    <i class="caret right icon"></i>
    Creator : ${project.creator.username} || ${project.creator.email}
    <br>
    <i class="caret right icon"></i>
    Created At : ${project.createdAt.slice(0,10)}
    <br>
    <i class="caret right icon"></i>
    Project Description : ${project.desc}
    <br>
  `)

  project.members.forEach((el,index)=>{
    $('#tbodyProject').append(`
    <tr>
      <td>${index += 1}</td>
      <td>${el.username}</td>
      <td>${el.email}</td>
    </tr>
    `)
  })

  let email = localStorage.getItem('email')
  if(project.creator.email === email){
    show('#addMemberButton')
  } else {
    hide('#addMemberButton')
    // hide('#newMemberForm')
  }
}

function getAllFreeUser(){
  let freeUser = []
  $.ajax({
    url : 'http://localhost:3000/users',
    method : 'get'
  })
    .done((users)=>{
      users.forEach((el)=>{
        if(!el.project){
          freeUser.push(el)
        }
      })
      hide('#addMemberButton')
      setNewMemberList(freeUser)
    })
    .fail((err)=>{
      console.log(err)
    })
}

function setNewMemberList(users){
  
  if(users.length >=1){
    $('#newMemberForm').append(`
    <form class="ui form" id="submitNewMember">
    <div class="field">
        <label>List of free users</label>
          <div class="ui selection dropdown">
              <input type="hidden" name="status" id="newMemberId">
              <i class="dropdown icon"></i>
              <div class="default text">Search user</div>
              <div class="menu" id="listNewMember"></div>
          </div>
      </div>
    <button class="ui button" type="submit">Add this user</button>
    </form>
    `)
  } else {
    $('#newMemberForm').append(`
    <p>There are no free user at the time :(</p>
    `)
    console.log('isi');
  }

  users.forEach((element)=>{
    // console.log(element);
    $('#listNewMember').append(`
    <div class="item" data-value=${element.email}>${element.username} || ${element.email}</div>
    `)
  })
  $('.ui.selection.dropdown')
  .dropdown()

  $('#submitNewMember').on('submit',(e)=>{
    e.preventDefault()
    let newMember = $('#newMemberId').val()
    addNewMember(newMember)
  })
}

function addNewMember(emailMember){
  $('.ui.dimmer').addClass('active')
  $('#newMemberId').val('')
  let projectId = localStorage.getItem('projectId')
  let token = localStorage.getItem('token')
  $.ajax({
    url : `http://localhost:3000/projects/addmember/${projectId}`,
    method : 'post',
    data : {
      emailMember
    },
    headers : {
      token
    }
  })
    .done((report)=>{
      $('.ui.dimmer').removeClass('active')
      projectDetailActive()
      getProjectTodo()
      $('#newMemberForm').empty()
      // getAllFreeUser()
      
    })
    .fail((err)=>{
      $('.ui.dimmer').removeClass('active')
      console.log(err)
    })
}

