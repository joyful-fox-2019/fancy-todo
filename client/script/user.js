const host = `http://localhost:3000`

$(document).ready(function () {
  isAuth()
})

function isAuth() {
  if (localStorage.getItem('token')) {
    $('.userLog').empty()
    $('.userLog').append(`<p>${localStorage.getItem('username')}</p>`)
    $('.login').hide()
    $('.register').hide()
    $('.home').show()
    $('.footer').show()
    $('.projectDetail').hide()
    $('.dropdown').show()
    showToday()
    getProject()
  } else {
    $('.login').show()
    $('.register').hide()
    $('.home').hide()
    $('.footer').hide()
    $('.dropdown').hide()
  }
}

function signUpForm() {
  $('.login').hide()
  $('.register').show()
}

function signInForm() {
  $('.login').show()
  $('.register').hide()
}

// Login Regular
$('#formLogin').on('submit', function (e) {
  e.preventDefault()
  swal.fire({
    title: 'Login Success!',
    onOpen: () => {
      swal.showLoading()
    }
  })

  $.ajax({
    method: 'post',
    url: `${host}/users/login`,
    data: {
      email: $('#email').val(),
      password: $('#password').val(),
    }
  })
    .done(res => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('username', res.username)
      isAuth()
      showToday()
      swal.close()
    })
    .fail(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
})

// Form Register
$('#formRegister').on('submit', function (e) {
  e.preventDefault()
  swal.fire({
    title: 'Creating Account',
    onOpen: () => {
      swal.showLoading()
    }
  })
  $.ajax({
    method: 'post',
    url: `${host}/users/register`,
    data: {
      username: $('#usernameRegis').val(),
      email: $('#emailRegis').val(),
      password: $('#passwordRegis').val(),
    }
  })
    .done((res) => {
      $('#usernamelRegis').val('')
      $('#emailRegis').val('')
      $('#passwordRegis').val('')
      localStorage.setItem('token', res.token)
      localStorage.setItem('username', res.username)
      isAuth()
      showToday()
      swal.close()
    })
    .fail(err => {
      swal.fire({
        title: `${err.responseJSON.join('\n')}`,
        showCloseButton: true
      })
    })
})

// Change Name
function changeName() {
  let newUsername;
  $.ajax({
    method: 'get',
    url: `${host}/users/${localStorage.username}`,
    headers: {
      token: localStorage.token
    }
  })
    .then(data => {
      return { value: formValues } = Swal.fire({
        title: 'Change Full Name',
        html:
          `<fieldset disabled>
            <input class="swal2-input form-control"  value="${data.username}"></input>
            </fieldset>` +
          `<input id="newName" class="swal2-input" placeholder="New Full Name">`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            newUsername: $('#newName').val(),
          }
        }
      })
    })
    .then(({ value }) => {
      newUsername = value.newUsername
      return $.ajax({
        method: 'patch',
        url: `${host}/users/update/name`,
        data: {
          username: localStorage.username,
          newUsername: value.newUsername
        },
        headers: {
          token: localStorage.token
        }
      })
    })
    .then(() => {
      swal.fire({
        type: 'success',
        title: 'success change your name..'
      })
      localStorage.setItem('username', newUsername)
      isAuth()
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  swal.fire({
    title: 'Logging In',
    onOpen: () => {
      swal.showLoading()
    }
  })

  $.ajax({
    method: 'post',
    url: `${host}/users/gsignin`,
    data: {
      token: id_token
    }
  })
    .done(data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      isAuth()
      showToday()
      swal.close()
    })
    .fail(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// Sign Out
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    $('.tbody').empty()
    $('.listToday').empty()
    $('.userLog').empty()
    $('#email').val('')
    $('#password').val('')
    isAuth()
  });
  Swal.fire({
    type: 'success',
    title: 'Sign out successfully',
    showConfirmButton: false,
    timer: 1500
  })
} 