$(document).ready(()=>{
  console.log('DOM is ready');
  loginCard()

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
  
    // getCards()
  })
  .fail((msg)=>{
    console.log(msg);
   
  })
  .always()
}