$(document).ready(()=>{
  console.log('DOM is ready');
  // loginCard()
  hide('#startPage')
  show('#homePage')
  if(localStorage.getItem('token')){

  } else {
    // loginpage()
  }

})

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

$('#card').click(()=>{
  console.log('card triggered');
  console.log('it will show card detail ');
  $('.ui.modal.detail')
  .modal('show')
})

$('#addtodo').click(()=>{
  console.log('triger');
  $('.ui.modal.add')
  .modal('show')
})

$('#submitTodo').on('submit',(e)=>{
  e.preventDefault()
  let title = $('#submitTitle').val()
  let desc = $('#submitDesc').val()
  let dueDate = $('#submitDueDate').val()
  console.log(title)
  console.log(desc)
  console.log(dueDate)
  $('.ui.modal.add')
  .modal('hide')
})

$('#editTodo').click(()=>{
  console.log('triger');
  $('.ui.modal.edit')
  .modal('show')
})

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

$('.ui.selection.dropdown')
  .dropdown()

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
}

