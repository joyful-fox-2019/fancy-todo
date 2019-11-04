$(document).ready(function(){
  islogin()
  register()
  login()
  logout()
});

function islogin (){
  if (!localStorage.getItem('token')){
    $('#notlogin').show()
    $('#donelogin').hide()  
  }
  else {    
    navbarMe()
    todoList()
    $('#notlogin').hide()
    $('#donelogin').show()
  }
}

function todoList (){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todo',
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
  .done((todos) => {
    $('#ulDone').empty()
    $('#ulOnProgress').empty()
    $('#todobutton').empty()
    todos.forEach((todo, i) => {
      let data = `
      <li>
        <div class="normal">
          <div class="hiden">
            ${todo.title}
          <div>
          <div class="todobutton row" id="todobutton${i}">

          </div>
        </div>
        <div class="info">
          <div class="background">
            <div class="tododate">
              <div class="hiden">
                <p style="text-align: right;">
                  ${new Date(todo.duedate).getDate()} - 
                  ${new Date(todo.duedate).getMonth()+1} - 
                  ${new Date(todo.duedate).getFullYear()}
                </p>
              </div>
            </div>
            <div class="tododesc">
              <div class="hiden">
                <p>${todo.description}</p>
              </div>
            </div>
          </div>
        </div>
      </li>`

      if(todo.status){
        $('#ulDone').append(data)
        $(`#todobutton${i}`).append(`
          <button class="btn btn-danger btn-xs" onclick="updateStatus(event,'${todo._id}')">Undone</button>
          <button class="btn btn-primary btn-xs" onclick="detailUpdate(event,'${todo._id}')">Detail</button>
        `)
      }
      else{
        $('#ulOnProgress').append(data) 
        $(`#todobutton${i}`).append(`
          <button class="btn btn-success btn-xs" onclick="updateStatus(event,'${todo._id}')">Done</button>
          <button class="btn btn-primary btn-xs" onclick="detailUpdate(event,'${todo._id}')">Detail</button>
        `)       
      }
    })
    todoScript()
    swal.close()
  })
  .fail(err => {
      err.responseJSON.errors.forEach(error => {
      console.log(error);
      });
  })
}

function navbarMe() {
  $('#navbar').empty()
  $('#navbar').append(`
    <button class="nav new" onclick="showModal(event)">Add To Do</button>
    <button class="nav">Home</button>
    <button class="nav" id="logoutt">Logout</button>
  `)
}

function navbarProject(projectId) {
  $('#navbar').empty()
  $('#navbar').append(`
    <button class="nav new" onclick="showModal(event, projectId)">Add To Do Project</button>
    <button class="nav">Home</button>
    <button class="nav" id="logout">logout</button>
  `)
}

function showModal(event, projectId) {
  event.preventDefault()
  if(projectId){
    $('#submitTodo').empty()
    $('#submitTodo').append(`
      <input type="submit" class="btn btn-primary" value="Add To Do" onclick="createTodo(event, projectId)">
    `)
  } 
  else{
    $('#submitTodo').empty()
    $('#submitTodo').append(`
      <input type="submit" class="btn btn-primary" value="Add To Do" onclick="createTodo(event)">
    `)
  }
  $("#title").val('')
  $("#description").val('')
  $("#duedate").val('')
  $(`#addTodoModal`).modal("show")
}

function createTodo(event, projectId) {
  event.preventDefault()
  if(projectId){

  }
  else{
    $.ajax({
      method: 'post',
      url: 'http://localhost:3000/todo',
      data: {
        title: $("#title").val(),
        description: $("#description").val(),
        duedate: $("#duedate").val()
      },
      headers: {
        token: localStorage.getItem('token')
      },
      beforeSend: function () {
        swal.showLoading()
      }
    })
      .done((result) => {
        todoList()
        $(`#addTodoModal`).modal("hide")
        swal.close()
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Successfully Add To Do',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .fail(err => {
        swal.close()
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.errors,
            footer: '<a href>Why do I have this issue?</a>'
        })
      })
      .always(() => {
        $("#title").val('')
        $("#description").val('')
        $("#duedate").val('')
      })
  }
}

function updateStatus (event, id) {
  event.preventDefault()
  $.ajax({
    method: 'patch',
    url: `http://localhost:3000/todo/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      todoList()
      swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Update Status',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

function detailUpdate(event, id) {
  event.preventDefault()
  $.ajax({
    method: 'get',
    url: `http://localhost:3000/todo/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      var date = new Date(result.duedate);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var format = date.getFullYear()+"-"+(month)+"-"+(day) ;

      $("#detailTodoData").empty()
      $("#detailTodoData").append(`
        <div class="mt-4">
          <h1 style="text-align: left;">Title: ${result.title}</h1>
        </div>
        <div class="mt-4">
          <p>Description: ${result.description}</p>
        </div>
        <div class="mt-4">
          <h4>Due Date: ${format}</h4>
        </div>
        <hr>
        <div class="mt-4" id="detailButton">
          <input type="submit" class="btn btn-danger" value="Delete To Do" onclick="deleteTodo(event, '${id}')">
          <input type="submit" class="btn btn-primary" value="Update To Do" onclick="updateModal(event, '${id}')">
        </div>
      `)
      $(`#detailTodoModal`).modal("show")
      swal.close()
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

function deleteTodo(event, id){
  event.preventDefault()
  $.ajax({
    method: 'delete',
    url: `http://localhost:3000/todo/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      todoList()
      $(`#detailTodoModal`).modal("hide")
      swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Delete To Do',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(err => {
      swal.close()
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors,
        footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

function updateModal(event, id){
  event.preventDefault()
  $.ajax({
    method: 'get',
    url: `http://localhost:3000/todo/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      var date = new Date(result.duedate);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var format = date.getFullYear()+"-"+(month)+"-"+(day) ;

      $("#title").val(result.title)
      $("#description").val(result.description)
      $("#duedate").val(format)

      $('#submitTodo').empty()
      $('#submitTodo').append(`
      <input type="submit" class="btn btn-primary" value="Update To Do" onclick="updateTodo(event, '${id}')">
      `)
      swal.close()
      $(`#detailTodoModal`).modal("hide")
      $(`#addTodoModal`).modal("show")
    })
    .fail(err => {
      swal.close()
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors,
        footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

function updateTodo(event, id){
  event.preventDefault()
  $(`#detailTodoModal`).modal("hide")
  $.ajax({
    method: 'put',
    url: `http://localhost:3000/todo/${id}`,
    data: {
      title: $("#title").val(),
      description: $("#description").val(),
      duedate: $("#duedate").val()
    },
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      todoList()
      $(`#addTodoModal`).modal("hide")  
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Update To Do',
        showConfirmButton: false,
        timer: 1500
      })    
    })
    .fail(err => {
      swal.close()
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: err.responseJSON.errors,
        footer: '<a href>Why do I have this issue?</a>'
      })
    })
    .always(() => {
      $("#title").val('')
      $("#description").val('')
      $("#duedate").val('')
    })
}