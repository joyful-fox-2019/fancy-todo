$(document).ready(function () {

  $('#new-project-btn').click(function (event) {
    event.preventDefault()
    newProjectForm()
  })

  $('#add-project-form').submit(function (event) {
    event.preventDefault()
    addNewProject()
  })

  $('#cancel-add-project').click(function (event) {
    event.preventDefault()
    $('#add-project-form').hide()
  })
  $('#cancel-edit-todo-project').click(function(event){
    event.preventDefault()
    $('#edit-todo-project-form').hide()
  })
  $('#edit-todo-project-form').submit(function (event) {
    event.preventDefault()
    updateTodoProject()
  })
})

function updateTodoProject () {
  const title = $('#edit-todo-project-title').val()
  const description = $('#edit-todo-project-desc').val()
  const id = $('#edit-todo-project-id').text()

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
    .done(response => {
      successMessage(response.message)
      restartDetailPage()
    })
    .fail(showError)
}

function newProjectForm () {
  $('#add-project-form').fadeIn()
}

function addNewProject () {
  const name = $('#add-project-name').val()

  $.ajax({
    method: 'POST',
    url: `${server}/projects`,
    data: {
      name
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    projectPage()
  })
  .fail(showError)
  $('#add-project-name').val('')
  $('#add-project-form').hide()
}

function projectPage () {
  $('#todo-page').hide()
  $('#project-detail-page').hide()
  $('#project-page').fadeIn()
  getProject()
}

function getProject () {
  $('#project-list').html('')
  $.ajax({
    method: 'GET',
    url: `${server}/projects`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .then(data => {
    if(data.length === 0) {
      $('#project-list').append(`<h2 style="margin: 0 auto;">No Project yet</h2>`)
    } else {
      data.forEach(project => {
        $('#project-list').append(`
        <div class="project-card p-4 sm:w-full lg:w-1/3 border border-blue-400 flex rounded m-4 shadow-lg">
          <div class="w-3/4 p-2 cursor-pointer hover:text-blue-700" onclick="getProjectDetail(event, {id: '${project._id}' })"><h2>${project.name}</h2></div>
          <div class="flex justify-around w-1/4">
            <div class="m-2 flex-column"><i class="fas fa-male"></i> <p style="text-align: center;">${project.members.length}</p> </div>
            <div class="m-2 flex-column"><i class="far fa-sticky-note"></i> <p style="text-align: center;">${project.todos.length}</p> </div>
            <div class="w-1/3 p-2" style="text-align: right;"><i onclick="removeProject(event, {id: '${project._id}' })" class="hover:text-red-500 fas fa-times" style="display: block;"></i></div>
          </div>
        </div>
        `)
      });
    }
  })
}

function removeProject(event, objParams) {
  event.preventDefault()
  const {id} = objParams
  showDialog()
  $('#confirm-btn').click(function(event){
    event.preventDefault()
      
    $.ajax({
      method: 'DELETE',
      url: `${server}/projects/${id}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(response => {
      successMessage(response.message)
      projectPage()
      $('#confirm-alert').hide('slow')
    })
    .fail(showError)
  })
}

function getProjectDetail (event, objParams) {
  event.preventDefault()
  const { id } = objParams
  $.ajax({
    method: 'GET',
    url: `${server}/projects/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(data => {
    $('#project-page').hide()
    $('#project-detail-page').fadeIn()
    $('#project-detail-title').text(`${data.name}`)
    $('#project-detail-created').text(`${dateFormat(new Date(data.createdAt))}`)
    $('.main-content').append(`
      <p id="project-id" style="display: none;">${data._id}</p>
    `)
    $('.member-list').html('')
    $('.member-list').append(`
    <div class="p-2 shadow-lg bg-gray-200">
      <form id="add-project-member" class="flex flex-wrap py-4">
        <label for="" class="w-full p-2">Add member:</label>
        <input type="email" id="email-member" class="outline-none rounded p-2 w-2/3" placeholder="member email">
        <input type="submit" id="add-member-btn" class="rounded w-1/4 cursor-pointer p-2 bg-green-400 text-white hover:text-gray-200 hover:bg-green-600 mx-2" value="Add">
      </form>
    </div>
    `)
    data.members.forEach(member => {
      $('.member-list').append(`
      <div class="p-2 shadow-lg flex hover:bg-green-400 bg-green-100 justify-between items-center my-2">
      <div class="w-2/3 p-2">${member.name}</div> 
      <div class="w-1/3 p-2" style="text-align: right;"><i onclick="removeMember(event, {id: '${member._id}' })" class="hover:text-red-500 fas fa-times" style="display: block;"></i></div>
      </div>
      `)
    })
    $('.todo-project-list').html('')
    $('.todo-project-list').append(`
    <div class="p-4 mx-64 shadow-lg my-4 lg:w-4/5 sm:w-4/5 bg-gray-300">
      <h1>Add Todo</h1>
      <form id="add-todo-project" action="" class=" rounded-lg p-10">
        <label for="" class="m-2">Title</label>
        <input type="text" id="project-todo-title" class="rounded border-blue-400 border p-2 w-full m-2 outline-none" placeholder="title">
        <label for="" class="m-2">Description</label>
        <input type="text" id="project-todo-desc" class="rounded border-blue-400 border p-2 w-full m-2 outline-none " placeholder="description">
        <label for="" class="mx-2 w-full" style="display: block;">Deadline</label>
        <input type="date" id="project-todo-date" class="rounded border-blue-400 border p-2 w-1/2 m-2 outline-none"">
        <input type="submit" id="project-todo-btn" class="p-2 bg-blue-400 text-white hover:bg-blue-500 cursor-pointer rounded">
      </form>
    </div>
    `)
    if(data.todos.length === 0) {
      $('.todo-project-list').append(`<h2>No Todo yet</h2>`)
    } else {
      data.todos.forEach(todo => {
        let color = ''
        let hover = 'hover:text-green-400'
        if(todo.status) {
        color = 'text-green-400'
        hover = 'hover:text-black'}
        
        $(`.todo-project-list`).append(`
        <div class="todo-card lg:w-1/4 sm:w-full shadow-lg rounded flex p-4 m-6">
          <div class="todo-div  w-1/6 ">
            <div class=" icon flex justify-center items-center "><i onclick="editTodoProject( event, { id: '${todo._id}'})" class="hover:text-blue-500 fas fa-edit" style="display: block;"></i></div>
            <div class=" icon flex justify-center items-center"><i onclick="deleteTodoProject(event, {id: '${todo._id}'})" class="hover:text-red-500 fas fa-trash-alt" style="display: block;"></i></div>
          </div>
          <div class="todo-div flex-column w-2/3 p-2 h-full">
            <div><h2>${todo.title}</h2></div>
            <div>${todo.description}</div>
          </div>
          <div class="todo-div flex-column justify-around w-1/6">
            <div class="icon flex justify-center p-2">${dateFormat(new Date(todo.createdAt))}</div>
            <div class=" icon flex justify-center items-center"><i onclick="updateTodoProjectStatus(event, {id: '${todo._id}', status: ${todo.status}})" class="${hover} ${color} fas fa-check-circle"></i></div>
          </div>
        </div>
        `)
      })
    }
    $('#add-todo-project').submit(function (event) {
      event.preventDefault()
      addTodoProject()
    })

    $('#add-project-member').submit(function (event) {
      event.preventDefault()
      addMember()
    })

  })
  .fail(showError)
  
}
function deleteTodoProject (event, objParams) {
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
    restartDetailPage()
    $('#confirm-alert').hide()
  })
  .fail(showError)
})
}

function updateTodoProjectStatus (event, objParams) {
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
    restartDetailPage()
  })
  .fail(showError)

}

function editTodoProject(event, objParams) {
  event.preventDefault()
  $('#edit-todo-project-title').val('')
  $('#edit-todo-project-desc').val('')
  $.ajax({
    method: 'GET',
    url: `${server}/todos/${objParams.id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(data => {
    $('#edit-todo-project-title').val(`${data.title}`)
    $('#edit-todo-project-desc').val(`${data.description}`)
    $('#edit-todo-project-id').text(`${data._id}`)
    $('#edit-todo-project-form').show('slow')
  })
  .fail(showError)
}

function removeMember(event, objParams) {
  event.preventDefault()

  showDialog()
$('#confirm-btn').click(function(event){
  event.preventDefault()
    
  const id = $('#project-id').text()
  
  $.ajax({
    method: 'PATCH',
    url: `${server}/projects/${id}`,
    data: {
      command: 'removeMember',
      member: objParams.id
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response =>{
    successMessage(response.message)
    restartDetailPage()
    $('#confirm-alert').hide()
  })
  .fail(({ responseJSON}) => {
    console.log(responseJSON);
    showError(responseJSON.message)
  })
})
}

function addMember() {
  const email = $('#email-member').val()
  const id = $('#project-id').text()
  

  $.ajax({
    method: 'PATCH',
    url: `${server}/projects/${id}`,
    data: {
      email,
      command : 'addMember'
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    successMessage(response.message)
    restartDetailPage()
  })
  .fail(({ responseJSON}) => {
    showError(responseJSON.message)
  })
}

function addTodoProject () {
  const title = $('#project-todo-title').val()
  const description = $('#project-todo-desc').val()
  const project = $('#project-id').text()
  const deadline = $('#project-todo-date').val()
  $.ajax({
    method: 'POST',
    url: `${server}/todos`,
    data: {
      title, description, project, deadline
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done( data => {
    let todo = data.todo._id
    
    
    $.ajax({
      method: 'PATCH',
      url: `${server}/projects/${project}`,
      data: {
        command: 'addTodo',
        todo
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(response => {
      successMessage(response.message)
      restartDetailPage()

    })
    .fail(showError)
  })
  .fail(showError)

}

function restartDetailPage () {
  $('#edit-todo-project-form').hide()
  const project = $('#project-id').text()
  getProjectDetail(event, {id: `${project}`})
} 

