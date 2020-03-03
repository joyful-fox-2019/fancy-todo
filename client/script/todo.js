function todoScript(){
  // - Noel Delgado | @pixelia_me
  
  const nodes = [].slice.call(document.querySelectorAll('li'), 0);
  const directions  = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
  const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));
  
  const getDirectionKey = (ev, node) => {
    const { width, height, top, left } = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = (l - (width/2) * (width > height ? (height/width) : 1));
    const y = (t - (height/2) * (height > width ? (width/height) : 1));
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }
  
  class Item {
    constructor(element) {
      this.element = element;    
      this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
      this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
    }
    
    update(ev, prefix) {
      this.element.classList.remove(...classNames);
      this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
    }
  }
  
  nodes.forEach(node => new Item(node));
}

function todoList (projectId){
  let url
  if(projectId){
    navbarProject(projectId)
    url = `http://localhost:3000/project/${projectId}`
  }
  else{
    navbarMe()
    url = 'http://localhost:3000/todo'
    projectId = ''
  }
  $.ajax({
    method: 'get',
    url,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      let todos
      if(projectId){
        todos = result.todoId
      }
      else{
        todos = result
      }
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
            <button class="btn btn-danger btn-xs" onclick="updateStatus(event,'${todo._id}', '${projectId}')">Undone</button>
            <button class="btn btn-primary btn-xs" onclick="detailUpdate(event,'${todo._id}', '${projectId}')">Detail</button>
          `)
        }
        else{
          $('#ulOnProgress').append(data) 
          $(`#todobutton${i}`).append(`
            <button class="btn btn-success btn-xs" onclick="updateStatus(event,'${todo._id}', '${projectId}')">Done</button>
            <button class="btn btn-primary btn-xs" onclick="detailUpdate(event,'${todo._id}', '${projectId}')">Detail</button>
          `)       
        }
      })
      todoScript()
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

function showModal(event, projectId) {
  event.preventDefault()
  if(projectId){
    $('#submitTodo').empty()
    $('#submitTodo').append(`
      <input type="submit" class="btn btn-primary" value="Add To Do" onclick="createTodo(event, '${projectId}')">
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
  let url
  let method
  if(projectId){
    url = `http://localhost:3000/project/${projectId}/todos`
    method = 'patch'
  }
  else{
    url = 'http://localhost:3000/todo'
    method = 'post'
  }
  $.ajax({
    method,
    url,
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
      $(`#addTodoModal`).modal("hide")
      swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Add To Do',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          if(projectId){
            todoList(projectId)
          }
          else{
            todoList()
          }
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

function updateStatus (event, id, projectId) {
  event.preventDefault()
  let url
  if(projectId){
    url = `http://localhost:3000/project/${projectId}/todos/${id}/status`
  }
  else{
    url = `http://localhost:3000/todo/${id}`
  }
  $.ajax({
    method: 'patch',
    url,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Update Status',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          if(projectId){
            todoList(projectId)
          }
          else{
            todoList()
          }
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

function detailUpdate(event, id, projectId) {
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
          <input type="submit" class="btn btn-danger" value="Delete To Do" onclick="deleteTodo(event, '${id}', '${projectId}')">
          <input type="submit" class="btn btn-primary" value="Update To Do" onclick="updateModal(event, '${id}', '${projectId}')">
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

function deleteTodo(event, id, projectId){
  event.preventDefault()
  let url
  if(projectId){
    url = `http://localhost:3000/project/${projectId}/todos/${id}`
  }
  else{
    url = `http://localhost:3000/todo/${id}`
  }
  $.ajax({
    method: 'delete',
    url,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done((result) => {
      $(`#detailTodoModal`).modal("hide")
      swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Delete To Do',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          if(projectId){
            todoList(projectId)
          }
          else{
            todoList()
          }
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

function updateModal(event, id, projectId){
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
      <input type="submit" class="btn btn-primary" value="Update To Do" onclick="updateTodo(event, '${id}', '${projectId}')">
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

function updateTodo(event, id, projectId){
  event.preventDefault()
  let url
  let method
  if(projectId){
    method = 'patch'
    url = `http://localhost:3000/project/${projectId}/todos/${id}`
  }
  else{
    method = 'put'
    url = `http://localhost:3000/todo/${id}`
  }
  $(`#detailTodoModal`).modal("hide")
  $.ajax({
    method,
    url,
    data: {
      title: $("#title").val(),
      description: $("#description").val(),
      duedate: $("#duedate").val()
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done((result) => {
      $(`#addTodoModal`).modal("hide")  
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Update To Do',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          if(projectId){
            todoList(projectId)
          }
          else{
            todoList()
          }
        })
    })
    .fail(err => {
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