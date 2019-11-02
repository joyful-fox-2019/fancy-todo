$(document).ready(()=>{
  console.log('DOM is ready');
  // loginCard()
  
  if(localStorage.getItem('token')){
    homePage()
  } else {
    startPage()
  }

})

function startPage(){
  show('#startPage')
  show('#loginCard')
  hide('#registerCard')
  hide('#homePage')
}

function homePage(){
  hide('#startPage')
  show('#homePage')
  getMyTodo()
}

function show(element){
  $(element).show()
}
function hide(element){
  $(element).hide()
}

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
      }
    }
  })

$('#loginSubmit').on('submit',(e)=>{
  e.preventDefault()
  let email = $('#emailLog').val()
  let password = $('#passLog').val()
  if (email.length === 0 || password.length === 0){
  } else {
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/users/login',
      data : {
        email,password
      }
    })
    .done((data)=>{
      localStorage.setItem('token',data.token)
      localStorage.setItem('name',data.name)
      $('#emailLog').empty()
      $('#passLog').empty()
      // $('#navname').append(`${data.name}`)
      // getCards()
      homePage()
    })
    .fail((err)=>{
      setLoginError(err.responseJSON,"Login")
      setTimeout(()=>{
        $('#loginError').empty()
      },4000)
    })
  }
})

$('#registerSubmit').on('submit',(e)=>{
  e.preventDefault()
  let username = $('#usernameReg').val()
  let email = $('#emailReg').val()
  let password = $('#passReg').val()
  if (email.length === 0 || password.length === 0 || username.length === 0){
  } else {
    $.ajax({
      method : 'post',
      url : 'http://localhost:3000/users/register',
      data : {
        email,password,username
      }
    })
    .done((data)=>{
      localStorage.setItem('token',data.token)
      localStorage.setItem('name',data.name)
      $('#usernameReg').empty()
      $('#emailReg').empty()
      $('#passReg').empty()
      // $('#navname').append(`${data.name}`)
      // getCards()
    })
    .fail((err)=>{
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
  $('.ui.modal.addPersonal')
  .modal('hide')
})

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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
  method : 'post',
  url : 'http://localhost:3000/users/OAuth',
  data : {
    id_token
  }
  })
  .done((token)=>{
    let name = profile.getName()
    // $('#navname').append(`${name}`)
    localStorage.setItem('token',token)
    localStorage.setItem('name',name)
    console.log(token);
    // getCards()
    homePage()
  })
  .fail((msg)=>{
    console.log(msg);
   
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.removeItem('token')
    localStorage.removeItem('name')
  });
  startPage()
}

function getMyTodo(){
  $('#todoCard1').empty()
  $('#todoCard2').empty()
  $('#todoCard3').empty()
  let token = localStorage.getItem('token')
  $.ajax({
    method: 'get',
    url : 'http://localhost:3000/todos',
    headers : {
      token
    }
  })
    .done((todos)=>{
      console.log(todos)
      if(todos.length >=1){
        todos.forEach((el)=>{
          if(el.status === "To-do"){
            console.log('masukss')
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
      console.log(err)
    })
}

function setMyTodo(todo,element){
  $(element).append(`
  <div class="ui fluid card">
    <a class="content" id="card">
      <div class="header">${todo.title}</div>
      <div class="meta">${todo.createdAt}</div>
        <div class="description">
          <p>${todo.desc}.</p>
        </div>
      </a>
  </div>
  `)
  $('#card').click(()=>{
    setModalDetail(todo)
  })
}


function setModalDetail(todo){
  $('#cardDetail').append(`
  <div class="ui tiny modal detail">
    <i class="close icon"></i>
      <div class="header"> ${todo.title} </div>
      <div class="content">
        <div class="description">
          <p>Status: ${todo.status}</p>
          <p>Due date: ${todo.dueDate}</p>
          <p>Desc: ${todo.desc}</p>
        </div>
      </div>
      <div class="actions">
        <button class="ui button" id="editTodo">
            edit
        </button>
        <button class="ui button">
            delete
        </button>
      </div>
  </div>
  `)
  $('.ui.modal.detail')
  .modal('show')
  $('#editTodo').click(()=>{
    console.log('triger');
    setModalEdit(todo)
  })
}

function setModalEdit(todo){
  $('#editCard').append(`
  <div class="ui tiny modal edit">
      <i class="close icon"></i>
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
  $('.ui.modal.edit')
  .modal('show')
  $('.ui.selection.dropdown')
  .dropdown()
  $('#submitEdit').on('submit',(e)=>{
    e.preventDefault()
    let title = $('#editTitle').val()
    let desc = $('#editDesc').val()
    let dueDate = $('#editStatus').val()
    console.log(title)
    console.log(desc)
    console.log(dueDate)
    $('.ui.modal.edit')
    .modal('hide')
  })
}

function createNewPersonalTodo(title,desc,dueDate){
  console.log('masuukkk');
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
    console.log(report);
    getMyTodo()
  })
  .fail((err)=>{
    console.log(err);
  })
}