$(document).ready(function(){
  islogin()
  register()
  login()
  logout()
});

function islogin (){
  if (!localStorage.getItem('token')){
    $('#notlogin').show(1500)
    $('#donelogin').hide(1500)  
  }
  else {    
    todoList()
    projectlist()
    navbarMe()
    $('#notlogin').hide(1500)
    $('#donelogin').show(1500)
  }
}

function navbarMe() {
  $('#addButton').empty()
  $('#addButton').append(`
    <button class="nav new" onclick="showModal(event)">Add To Do</button>
  `)
}

function navbarProject(projectId) {
  $('#addButton').empty()
  $('#addButton').append(`
    <button class="nav new" onclick="showModal(event, '${projectId}')">Add To Do Project</button>
  `)
}
