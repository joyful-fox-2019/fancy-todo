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
  const dueDate = new Date(strDate)
  const date = dueDate.getDate()
  const month = dueDate.toLocaleString('default', { month: 'long' }).substring(0, 3)
  return `${date} ${month} ${formatTimePicker(strDate)}`
}

formatDatePicker = (strDate) => {
  const dueDate = new Date(strDate)
  const month = dueDate.toLocaleString('default', { month: 'long' }).substring(0, 3)
  const date = dueDate.getDate() < 10 ? '0' + dueDate.getDate() : dueDate.getDate()
  const year = dueDate.getFullYear()
  return `${month} ${date}, ${year}`
}

formatTimePicker = (strDate) => {
  console.log('12:12 AM')
  const dueDate = new Date(strDate)
  let hours = dueDate.getHours()
  if(hours > 12) {
    hours = hours % 12
    if(hours < 10) {
      hours = '0' + hours
    }
  }
  if(hours === 0) {
    hours = 12
  }
  const minutes = dueDate.getMinutes() < 10 ? '0' + dueDate.getMinutes() : dueDate.getMinutes()
  const merediem = dueDate.toLocaleString().split(' ')[2]
  return `${hours}:${minutes} ${merediem}`
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
              <i onclick="remove('${task._id}')" class="check-circle material-icons grey-text">clear</i>
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
            <div href="#modal-update" onclick="showUpdate('${task._id}')" class="modal-trigger col s11 teal-text text-darken-4 clickable">
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

logout = (e) => {
  e.preventDefault()
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

showUpdate = (id) => {
  console.log('update', id)
  $.ajax({
    url: `${baseUrl}/tasks/${id}`,
    type: 'get',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(task => {
      $('#update-task-id').val(id)
      $('#update-task-name').val(task.name)
      $('#update-task-description').val(task.description)
      $('#update-task-date').val(formatDatePicker(task.dueDate))
      $('#update-task-time').val(formatTimePicker(task.dueDate))
      $('.update-label').addClass('active')
    })
    .fail(showAlert)
}

remove = (id) => {
  $.ajax({
    url: `${baseUrl}/tasks/${id}`,
    type: 'delete',
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
    const description = $('#add-task-description').val()
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
        name, description, dueDate
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

  $('#update-task').submit(e => {
    e.preventDefault()
    const id = $('#update-task-id').val()
    console.log(id, 'ini id')
    const name = $('#update-task-name').val()
    const description = $('#update-task-description').val()
    const date = $('#update-task-date').val()
    const time = $('#update-task-time').val()
    let dueDate = null
    if(date && time) {
      dueDate = new Date(`${date} ${time}`)
    }
    $.ajax({
      url: `${baseUrl}/tasks/${id}`,
      type: 'patch',
      data: {
        name, description, dueDate
      },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(data => {
        console.log(data)
        M.Modal.getInstance($('#modal-update')).close()
        getTasks()
      })
      .fail(showAlert)
  })

  $('#delete-from-update').click(() => {
    const id = $('#update-task-id').val()
    $.ajax({
      url: `${baseUrl}/tasks/${id}`,
      type: 'delete',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(_ => {
        M.Modal.getInstance($('#modal-update')).close()
        getTasks()
      })
      .fail(showAlert)
  })
})