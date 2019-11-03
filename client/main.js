const baseURL = `http://localhost:3000`

$(document).ready(function() {
  // if (!localStorage.getItem('jwtToken')) {
  //   $('.register-form').show()
  //   $('.login-form').hide()
  //   $('.homepage').hide()
  // } else {
  //   $('.register-form').hide()
  //   $('.login-form').hide()
  //   $('.homepage').show()
  // }
})

function register(event) {
  event.preventDefault()
  $('.login-form').show()
  $.ajax({
    url: `${baseURL}/user/register`,
    method: "POST",
    data : {
      email : $('#email-register').val(),
      password : $('#password-register').val()
    }
  })
  .done(user => {
  console.log(`Register success`, user);
  })
  .fail(err => {
    console.log(`Register failed. Proceed resubmission`, err);
  })
  .always(() => {
    console.log(`complete`);
  })
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: `http://localhost:3000/user/google-signin`,
    method: `POST`,
    data : {
      idToken : id_token
    }
  })
  .done(result => {
    // console.log(result);
    localStorage.setItem('jwtToken', result.token)

  })

  
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('jwtToken')
}

