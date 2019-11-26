// const server = 'http://localhost:3000'

$(document).ready(function(){

  $('#go-login').click(function (event) {
    event.preventDefault()
    goLogin()
  })

  $('#go-register').click(function (event) {
    event.preventDefault()
    goRegister()
  })

  $('#login-form').submit(function (event) {
    event.preventDefault()
    login()
  })

  $('#register-form').submit(function (event) {
    event.preventDefault()
    register()
  })

})

function goLogin () {
  $('#register-card').hide()
  $('#login-card').fadeIn()

}

function goRegister () {
  $('#login-card').hide()
  $('#register-card').fadeIn()
}

function checkToken () {
  if(localStorage.getItem('token')){
    $.ajax({
      method: 'POST',
      data: {
        token: localStorage.getItem('token')
      },
      url: `${server}/users/verify`
    })
    .done(response => {
      successMessage(response.message)
      loginSuccess()
    })
    .fail(({ responseJSON}) => {
      showError(responseJSON.message)
      localStorage.removeItem('token')
    })
  }
}

function login () {
  const email = $('#login-email').val()
  const password = $('#login-password').val()

  $.ajax({
    method: 'POST',
    url:  `${server}/users/login`,
    data: {
      email, password
    }
  })
  .done(data => {
    localStorage.setItem('token', data.token)
    loginSuccess()
  })
  .fail(({responseJSON}) => {
    showError(responseJSON.message)
  })
  $('#login-email').val('')
  $('#login-password').val('')
}

function register () {
  const name = $('#reg-name').val()
  const email = $('#reg-email').val()
  const password = $('#reg-password').val()

  $.ajax({
    method: 'POST',
    url: `${server}/users/register`,
    data: {
      name, email, password
    }
  })
  .done(data =>{
    localStorage.setItem('token', data.token)
    loginSuccess()
  })
  .fail(({responseJSON}) => {
    showError(responseJSON.message.errors[0])
  })
  $('#reg-name').val('')
  $('#reg-email').val('')
  $('#reg-password').val('')
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  
  $.ajax({
    method: 'POST',
    url: `${server}/users/glogin`,
    data: {
      id_token
    }
  })
  .done(data => {
    localStorage.setItem('token', data.token)
    loginSuccess()
  })
  .fail(showError)
}

function loginSuccess () {
  $('#login-page').hide()
  todoPage({})
}
