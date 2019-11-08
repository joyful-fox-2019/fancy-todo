function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `http://localhost:3000/user/googleLogin`,
    method: 'POST',
    data: {
      idToken: idToken
    }
  })
    .done(function (response) {
      loginSuccess(response)
    })
    .fail(function (err) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    
  });
  localStorage.clear()
  $("#todo-menu").hide()
  $("#signout").hide()
  $("#login-content").fadeIn()
}

function webRegister(name, email, password) {
  // swal.showLoading()
  $.ajax({
    url: `http://localhost:3000/user/register`,
    method: 'POST',
    data: {
      name,
      email,
      password
    }
  })
    .done(function (response) {
      $("#register-content").hide()
      $("#login-content").fadeIn()
      // Swal.close()
    })
    .fail(function (err) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
}

function webLogin(email, password) {
  // Swal.showLoading()
  $.ajax({
    url: `http://localhost:3000/user/login`,
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done(function (response) {
      loginSuccess(response)
      // Swal.close()
    })
    .fail(function (err) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
}

function loginSuccess(response) {
  localStorage.setItem('access_token', response.access_token)
  localStorage.setItem('isLogin', response.isLogin)
  localStorage.setItem('name', response.name)
  $("#register-content").hide()
  $("#login-content").hide()
  $("#signout").show()
  $("#todo-menu").fadeIn()
  $("#user-name").text(`Hello, ${localStorage.getItem('name')}`)
}