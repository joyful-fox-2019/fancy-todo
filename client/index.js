const baseUrl = 'http://localhost:3000'

showAlert = (err) => {
  if(err.responseJSON) {
    let strMessages = ''
    err.responseJSON.messages.forEach(message => {
      strMessages += message + '<br>'
    })
    M.toast({html: strMessages})
  } else {
    M.toast({html: `Couldn't connect to the server`})
  }
}

showLogin = () => {
  $('#register-content').hide()
  $('#login-content').show()
  $('#register-email').val('')
  $('#register-password').val('')
}

showRegister = () => {
  $('#login-content').hide()
  $('#register-content').show()
  $('#login-email').val('')
  $('#login-password').val('')
}

hideAllPages = () => {
  $('#auth-page').hide()
  $('#main-page').hide()
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${baseUrl}/users/g-signin`,
    type: 'post',
    data: {
      id_token
    }
  })
    .done(data => {
      console.log(data)
      localStorage.setItem('access_token', data.access_token)
      showMainPage()
    })
    .catch(showAlert)
}

formatDate = (strDate) => {
  const date = new Date(strDate)
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' }).substring(0, 3)} ${date.toLocaleTimeString().substring(0, 5)} AM`
}

appendTasks = (tasks) => {
  console.log(tasks)
  $('#today-items').empty()
  tasks.forEach(task => {
    if(task.status) {
      $('#today-items').append(`
        <a class="collection-item teal-text text-darken-4">
          <div class="row">
            <div class="col s1">
              <i onclick="check('${task._id}')" class="check-circle material-icons grey-text">check_circle</i>
            </div>
            <div class="col s10 grey-text">
              <span class="striked">${task.name}</span>
            </div>
            <div class="col s1">
              <i onclick="check('${task._id}')" class="check-circle material-icons grey-text">clear</i>
            </div>
          </div>
        </a>
      `)
    } else {
      $('#today-items').append(`
        <a class="collection-item teal-text text-darken-4">
          <div class="row">
            <div class="col s1">
              <i onclick="check('${task._id}')" class="check-circle material-icons teal-text text-darken-4">radio_button_unchecked</i>
            </div>
            <div class="col s11 teal-text text-darken-4">
              <span>${task.name}</span>
              <span class="time-badge badge">${formatDate(task.dueDate)}</span>
            </div>
          </div>
        </a>
      `)
    }
    
  })
}

getTasks = () => {
  $.ajax({
    url: `${baseUrl}/tasks`,
    type: 'get',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(appendTasks)
  .fail(showAlert)
}

showMainPage = () => {
  hideAllPages()
  $('#main-page').show()
  getTasks()
}

showAuthPage = () => {
  hideAllPages()
  $('#auth-page').show()
}

if(localStorage.getItem('access_token')) {
  showMainPage()
}

logout = () => {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear()
  showAuthPage()
}

check = (id) => {
  $.ajax({
    url: `${baseUrl}/tasks/${id}`,
    type: 'patch',
    data: {
      status: true
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(_ => {
      getTasks()
    })
    .fail(showAlert)
}

$(document).ready(() => {
  M.Sidenav.init($('.sidenav'))
  M.Modal.init($('.modal'))
  M.Datepicker.init($('.datepicker'));  
  M.Timepicker.init($('.timepicker'));

  $('#register-form').submit((e) => {
    e.preventDefault()
    $.ajax({
      url: `${baseUrl}/users/register`,
      type: 'post',
      data: {
        email: $('#register-email').val(),
        password: $('#register-password').val()
      }
    })
      .done(data => {
        localStorage.setItem('email', data.email)
        localStorage.setItem('access_token', data.access_token)
        showMainPage()
        $('#register-email').val('')
        $('#register-password').val('')
      })
      .fail(showAlert)
  })

  $('#login-form').submit((e) => {
    e.preventDefault()
    $.ajax({
      url: `${baseUrl}/users/login`,
      type: 'post',
      data: {
        email: $('#login-email').val(),
        password: $('#login-password').val()
      }
    })
      .done(data => {
        localStorage.setItem('email', data.email)
        localStorage.setItem('access_token', data.access_token)
        showMainPage()
        $('#login-email').val('')
        $('#login-password').val('')
      })
      .fail(showAlert)
  })

  $('#add-task').submit(e => {
    e.preventDefault()
    const name = $('#add-task-name').val()
    const date = $('#add-task-date').val()
    const time = $('#add-task-time').val()
    let dueDate = null
    if(date && time) {
      dueDate = new Date(`${date} ${time}`)
    }
    $.ajax({
      url: `${baseUrl}/tasks`,
      type: 'post',
      data: {
        name, dueDate
      },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(data => {
        console.log(data)
        M.Modal.getInstance($('.modal')).close()
        getTasks()
      })
      .fail(showAlert)
  })
})