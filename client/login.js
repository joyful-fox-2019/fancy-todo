function onSuccess(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  const profile = googleUser.getBasicProfile()
  const name = profile.getName()
  const email = profile.getEmail()

  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  console.log(id_token);

  $.ajax({
      type: 'POST',
      url: `${baseUrl}/todos/googleSignIn`,
      headers: {
          id_token,
          name,
          email
      }
  })
      .done(function(response){
          // console.log(response)
          // console.log('succes login');
          localStorage.setItem('token', response.token)
      })
      .fail(function(){
          console.log('fail login');  
      })
      .always(function(){
          console.log('complete');
      })
  }

function onFailure(error) {
    console.log(error);
  }

function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 370,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

function signOut() {
    localStorage.removeItem('token')
    if (gapi.auth2) {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  }

function manualLogin() {
  const email = $('#email-login').val()
  const password = $('#pass-login').val()
  console.log(email,password)
  $.ajax({
    type: 'POST',
    url: `${baseUrl}/todos/login`,
    data: {
      email,
      password
    }
  })
    .done(function(response){
        console.log('succes login'); 
        localStorage.setItem('token', response.token)
    })
    .fail(function(){
        console.log('fail login');  
    })
    .always(function(){
        console.log('complete');
    })

  }

function register(){
  const name = $('#name').val()
  const email = $('#email-signup').val()
  const password = $('#pass-signup').val()

  $.ajax({
    type: 'POST',
    url: `${baseUrl}/todos/register`,
    data: {
      name,
      email,
      password
    }
  })
    .done(function() {
      console.log('succes register')
    })
    .fail(function() {
      console.log('fail register')
    })
    .always(function() {
      console.log('complete')
      $('#tab-1').click()
    })
}