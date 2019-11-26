// const server = 'http://localhost:3000'
const server = 'http://api.tududu.mardii.site'

$(document).ready(function () {

  checkToken()
  $('.to-projects').click(function (event){
    event.preventDefault()
    projectPage()
  })

  $('#confirm-cancel').click(function (event) {
    event.preventDefault()
    $('#confirm-alert').hide('slow')
  })

  $('.logo').click(function (event) {
    event.preventDefault()
    all()
  })
  $('.logout-btn').click(function (event) {
    event.preventDefault()
    signOut()
  })

  $('#cancel-edit-todo').click(function (event) {
    event.preventDefault()
    closeEditForm()
  })

  $('#cancel-add-todo').click(function (event) {
    event.preventDefault()
    closeAddForm()
  })

  $('#new-todo').click(function (event) {
    event.preventDefault()
    $('#add-todo-form').show('slow')
  })

  $('#add-todo-form').submit(function (event) {
    event.preventDefault()
    addTodo()
  })

  $('#edit-todo-form').submit(function (event) {
    event.preventDefault()
    updateTodo()
  })

  $('#todo-all').click(function (event) {
    event.preventDefault()
    all()
  })
  $('#todo-today').click(function (event) {
    event.preventDefault()
    today()
  })

  $('#todo-thisweek').click(function (event) {
    event.preventDefault()
    thisWeek()
  })
})

function today () {
  todoPage({when: 'today'})
    $('#todo-all').removeClass('active')
    $('#todo-thisweek').removeClass('active')
    $('#todo-today').addClass('active')
}

function thisWeek () {
  todoPage({when: 'thisWeek'})
  $('#todo-all').removeClass('active')
  $('#todo-today').removeClass('active')
  $('#todo-thisweek').addClass('active')  
}

function all () {
  todoPage({})
  $('#todo-all').addClass('active')
  $('#todo-thisweek').removeClass('active')
  $('#todo-today').removeClass('active')
}

function showError(message) {
  $('#error-alert').text('')
  $('#error-alert').append(`
    <p>${message.message}:</p>
    <p>${message.errors.join('\m')}</p>
  `)
  $('#error-alert').fadeIn()
  setTimeout(() => {
    $('#error-alert').hide()
  }, 2000);
}

function showDialog() {
  $('#confirm-alert').fadeIn()
}

function successMessage(message){
  $('#success-alert').text('')
  $('#success-alert').append(`
  <p>${message}</p>
  `)
  $('#success-alert').fadeIn()
  setTimeout(() => {
    $('#success-alert').hide()
  }, 2000);
}

function loginPage () {
  $('#todo-page').hide()
  $('#login-page').fadeIn('slow')
}

function dateFormat (date) {
  let dd = date.getDate()
  let  mm = date.getMonth()
  let yy = date.getFullYear() % 1000

  if(dd< 10) {
    dd = '0' + dd
  }
  if(mm<10) {
    mm = '0' + mm
  }
  let formattedDate = `${dd}/${mm}/'${yy}`
  return formattedDate
}

function signOut() {
  showDialog()
  $('#confirm-btn').click(function(event){
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    if(auth2) {
      auth2.signOut().then(function () {
        // console.log('User signed out.');
        successMessage('User signed out')
      })
    }
    localStorage.removeItem('token')
  $('#confirm-alert').hide('slow')
    loginPage()
  })
}


function todoPage (objParams) {
  $('#project-page').hide()
  $('#todo-page').fadeIn()
  $('#project-detail-page').hide()
  $('#project-page').hide()
  $('#todo-list').html('')
  let when = objParams.when
  let query =''
  if(when) query = `?when=${when}`
  $.ajax({
    method: 'GET',
    url: `${server}/todos${query}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(data => {
    if(data.length=== 0) {$('#todo-list').append(`
      <h2 style="margin: 0 auto;">No data found</h2>
    `)
      } else {
      data.forEach(todo =>{
        let color = ''
        let hover = 'hover:text-green-400'
      if(todo.status) {
        color = 'text-green-400'
        hover = 'hover:text-black'}
        $('#todo-list').append(`
        <div class="todo-card lg:w-1/4 sm:w-full shadow-lg rounded flex p-4 m-6">
          <div class="todo-div  w-1/6 ">
            <div class=" icon flex justify-center items-center "><i onclick="editTodo(event, {id: '${todo._id}'})" class="hover:text-blue-500 fas fa-edit" style="display: block;"></i></div>
            <div class=" icon flex justify-center items-center"><i onclick="deleteTodo(event, { id: '${todo._id}' })" class="hover:text-red-500 fas fa-trash-alt" style="display: block;"></i></div>
          </div>
          <div class="todo-div flex-column w-2/3 p-2 h-full">
            <div><h2>${todo.title}</h2></div>
            <div>${todo.description}</div>
          </div>
          <div class="todo-div flex-column justify-around w-1/6">
            <div class="icon flex justify-center p-2">${ dateFormat(new Date(todo.createdAt))}</div>
            <div class=" icon flex justify-center items-center"><i onclick="updateStatus(event, {id: '${todo._id}', status: ${todo.status} })" class="${hover} ${color} fas fa-check-circle"></i></div>
          </div>
        </div>
    `)
    })
  }
  })
  .fail(showError)
}

function updateStatus (event, objParams) {
  event.preventDefault()
  let status = !objParams.status

  $.ajax({
    method: 'PATCH',
    url: `${server}/todos/${objParams.id}`,
    data: {
      status
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    successMessage(response.message)
    all()
  })
  .fail(showError)
}

function deleteTodo (event, objParams) {
  const { id } = objParams

  showDialog()
$('#confirm-btn').click(function(event){
  event.preventDefault()
  
  $.ajax({
    method: 'DELETE',
    url: `${server}/todos/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    successMessage(response.message)
    all()
    $('#confirm-alert').hide('slow')
  })
  .fail(showError)
})
}

function editTodo (event, objParams) {
  event.preventDefault()
  $('#edit-todo-title').val('')
  $('#edit-todo-desc').val('')
  $.ajax({
    method: 'GET',
    url: `${server}/todos/${objParams.id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(data => {
  $('#edit-todo-title').val(`${data.title}`)
  $('#edit-todo-desc').val(`${data.description}`)
  $('#edit-todo-id').text(`${data._id}`)

  $('#edit-todo-form').show('slow')
  })
  .fail(showError)
}

function closeEditForm () {
  $('#edit-todo-form').hide('slow')
}

function closeAddForm () {
  $('#add-todo-form').hide('slow')
}

function updateTodo () {
  const title = $('#edit-todo-title').val()
  const description = $('#edit-todo-desc').val()
  const id = $('#edit-todo-id').text()

  $.ajax({
    method: 'PATCH',
    url: `${server}/todos/${id}`,
    data: {
      title, description
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .then(response => {
    successMessage(response.message)
    closeEditForm()
    all()
  })
  .fail(showError)
}

function addTodo () {
  const title = $('#add-todo-title').val()
  const description = $('#add-todo-desc').val()
  const deadline = $('#add-todo-date').val()
  
  $.ajax({
    method: 'POST',
    url: `${server}/todos`,
    data: {
      title, description, deadline
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    successMessage(response.message)
    $('#add-todo-title').val('')
    $('#add-todo-desc').val('')
    $('#add-todo-date').val('')
    $('#add-todo-form').hide('slow')
    all()
  })
  .fail(({responseJSON})=> {
    console.log(responseJSON);
    showError(responseJSON.message)
  })
}

