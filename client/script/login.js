
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  Swal.fire({
    title: `Connecting to server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();
  $.ajax({
    url: `${baseURL}/user/google`,
    method: 'post',
    data: {
        token: id_token
    }
  })
  .done(({ token, username }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    islogin()
    Swal.close()
    Swal.fire('Success!', "Your Account is Logged in!", 'success')
  })
  .fail(err => {
    let msg = "Fail to Login";
    Swal.fire("Error!", msg, "error");
  })
}

function getRegister() {
  let name = $('#regisname').val()
  let email = $('#regismail').val()
  let password = $('#regispassword').val()

  Swal.fire({
    title: `Creating Your Account...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();

  $.ajax({
    url: `${baseURL}/user/register`,
    method: `post`,
    data: {
        name, email, password
    }
  })
    .done(({ token, username }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      $('.usertoken').append(`<p>${localStorage.getItem('username')}</p>`)
      islogin()
      Swal.close()
      Swal.fire('Success!', "Your Account is Created!", 'success')
    })
    .fail(err => {
      let error = err.responseJSON
      Swal.fire("Error!", `${error.message}`, "error");
    })
    .always(() => {
      $('#regisname').val('')
      $('#regismail').val('')
      $('#regispassword').val('')
    })
}


function getLogin() {
  let email = $('#loginmail').val()
  let password = $('#loginpassword').val()

  Swal.fire({
    title: `Connecting to Server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();

  $.ajax({
    url: `${baseURL}/user/login`,
    method: `post`,
    data: {
      email, password
    }
  })
    .done(({ token, username }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      islogin()
      Swal.close()
      Swal.fire('Success!', "Your Account is Logged in!", 'success')
    })
    .fail( err  => {
      Swal.fire("Error!", err.responseJSON.message , "error");
    })
    .always(() => {
      $('#loginmail').val('')
      $('#loginpassword').val('')
    })
}

function signOut() {
  if (gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }
    localStorage.removeItem('token')
    localStorage.removeItem('username')
      
    islogin()
    Swal.fire('Success!', "Your Account is Logged out!", 'success')
}

function islogin(){
  if (localStorage.getItem('token')) {
    $('.landingpage').hide()
    $('.mainpage').show()
    toDoList()
    projectList()
    $('.usertoken').append(`<p>${localStorage.getItem('username')}</p>`)
    $('#todolist').show()
  } else {
    $('.landingpage').show()
    $('.mainpage').hide()
    $('.usertoken').empty()
    $('#projectlist').empty()
    $('#todolist').empty()
    $('#todolistproject').empty()
  }
}