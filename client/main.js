
$(document).ready(function () {
  checkToken()
})

function checkToken() {

  let access_token = localStorage.getItem("access_token")
  if (access_token) {
    // navs
    $('#register').hide()
    $('#sign-in').hide()
    $("#sign-out").show()

    // forms
    $('#registration-form').hide()
    $('#signin-form').hide()
    $('#todo-input').show()

    // todo items
    getTodoItems()

    // change background
    changeToBgGeneral()

    // show barriers
    $('.barrier').show()
  }
  else {
    // navs
    $("#sign-out").hide()
    $('#register').show()
    $('#sign-in').show()

    // forms
    $('#registration-form').hide()
    $('#signin-form').hide()
    $('#todo-input').hide()

    // todo items
    $('#todo-container').hide()

    // change background
    changeToBgWithWords()

    // hide barriers
    $('.barrier').hide()
  }
}

function displayRegistrationForm(event) {
  event.preventDefault()
  $('#signin-form').hide()
  $('#todo-container').hide()
  $('#registration-form').show()
}

function displaySignInForm(event) {
  event.preventDefault()
  $('#registration-form').hide()
  $('#todo-container').hide()
  $('#signin-form').show()
}

function displayTodoItems() {
  $('#todo-container').show()
}

function changeToBgWithWords() {
  $('html').css({
    "background": "url(./images/background-home.png) no-repeat center center fixed",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover"
  })
}

function changeToBgGeneral() {
  $('html').css({
    "background": "url(./images/background-general.png) no-repeat center center fixed",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover"
  })
}

function redirectToHome(event) {
  event.preventDefault()
  checkToken()
}

function createTodo(event) {
  event.preventDefault()
  if ($('#todo-add-title').val().length < 1 ||
    $('#todo-add-description').val().length < 1 ||
    $('#datepicker').val().length < 1) {
    Swal.fire('Oops..', 'All fields must be filled!')
    return
  }

  if (new Date($('#datepicker').val()) < new Date()) {
    Swal.fire('Oops..', 'The due date can\'t be before today!')
    return
  }

  $.ajax({
    url: 'http://localhost:3000/todo',
    method: 'post',
    data: {
      title: $('#todo-add-title').val(),
      description: $('#todo-add-description').val(),
      dueDate: $('#datepicker').val()
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      console.log(response);
      getTodoItems()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function updateTodo(event) {
  event.preventDefault()
  const todoId = event.target.id

  if ($('#todo-update-title').val().length < 1 ||
    $('#todo-update-description').val().length < 1 ||
    $('#todo-update-date').val().length < 1) {
    Swal.fire('Oops..', 'All fields must be filled!')
    return
  }

  if (new Date($('#todo-update-date').val()) < new Date()) {
    Swal.fire('Oops..', 'The due date can\'t be before today!')
    return
  }

  $.ajax({
    url: `http://localhost:3000/todo/${todoId}`,
    method: 'put',
    data: {
      title: $('#todo-update-title').val(),
      description: $('#todo-update-description').val(),
      dueDate: $('#todo-update-date').val()
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      $('#todo-input-update').hide()
      $('#todo-input').show()
      getTodoItems()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function getTodoItems() {
  $('#todo-container').hide()
  $('#todo-items').empty()
  return $.ajax({
    url: 'http://localhost:3000/todo',
    method: 'get',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      response.forEach((todoItem, index) => {
        let params = {
          id: todoItem._id,
          index: index + 1,
          title: todoItem.title,
          description: todoItem.description,
          dueDate: new Date(todoItem.dueDate),
          completed: todoItem.completed,
          important: todoItem.important
        }
        $('#todo-container').show()
        $('#todo-items').append(renderTodoList(params))
      })
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function renderTodoList(params) {
  console.log('masuk sini');
  let rendering

  if (!params.completed && !params.important) {
    rendering =
      `
    <tr>
      <th class="text-center m-2" scope="row">
        ${params.index}
      </th>
      <td class="text-center m-2">
        ${params.title}
      </td>
      <td class="text-center m-2">
        ${params.description}
      </td>
      <td class="text-center m-2">
        ${params.dueDate.toDateString()}
      </td>
      <td class="text-center">
        <input class="m-2" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()">
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Mark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  else if (!params.completed && params.important) {
    console.log("condition2")
    rendering =
      `
    <tr>
      <th class="text-center" scope="row">
        ${params.index}
      </th>
      <td class="text-center">
        <strong><em>${params.title}</em></strong>
      </td>
      <td class="text-center">
        <strong><em>${params.description}</em></strong>
      </td>
      <td class="text-center">
        <strong><em>${params.dueDate.toDateString()}</em></strong>
      </td>
      <td class="text-center">
        <input class="m-2" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()">
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Unmark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  else if (params.completed && !params.important) {
    console.log("condition3")
    rendering =
      `
    <tr>
      <th scope="row" class="text-center m-2">
        <strike>${params.index}</strike>
      </th>
      <td class="text-center m-2">
        <strike>${params.title}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.description}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.dueDate.toDateString()}</strike>
      </td>
      <td class="text-center">
        <input class="m-2" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()" checked>
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> |
        <input type="button" class="btn btn-dark m-2" value="Mark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  else {
    console.log("condition4")
    rendering =
      `
    <tr>
      <th scope="row" class="text-center m-2">
        <strike>${params.index}</strike>
      </th>
      <td class="text-center m-2">
        <strike>${params.title}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.description}</strike>
      </td>
      <td class="text-center m-2">
        <strike>${params.dueDate.toDateString()}</strike>
      </td>
      <td class="text-center">
        <input class="m-2" type="checkbox" value="${params.id}" id="check-complete" onclick="complete()" checked>
      </td>
      <td class="text-center">
        <input type="button" class="btn btn-dark m-2" value="Delete" onclick="deleteTodo(event)" id="${params.id}"> | 
        <input type="button" class="btn btn-dark m-2" value="Edit" onclick="findTodo(event)" id="${params.id}"> |
        <input type="button" class="btn btn-dark m-2" value="Unmark as important" onclick="updateImportant(event)" id="${params.id}">
      </td>
    </tr>
    `
  }
  return rendering
}

function updateImportant(event) {
  const todoId = event.target.id
  console.log('update important');
  
  $.ajax({
    url: `http://localhost:3000/todo/${todoId}/important`,
    method: 'patch',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(todo => {
      console.log(todo)
      getTodoItems()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function findTodo(event) {
  const todoId = event.target.id

  $.ajax({
    url: `http://localhost:3000/todo/${todoId}`,
    method: 'get',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(todo => {
      $('#todo-input').hide()
      $('#todo-input-update').html(renderUpdateTodoForm(todo))
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function renderUpdateTodoForm(params) {
  let rendering =
    `
    <div id="accordion">
      <div class="card">
        <div class="card-header bg-dark" id="headingOne">
          <h5 class="text-center mb-0">
            <button class=" btn btn-link text-white" data-toggle="collapse" data-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
              Click here to edit
            </button>
          </h5>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <form>

              <div class="col my-3">
                <input type="text" class="text-center form-control" id="todo-update-title" placeholder="Title" value="${params.title}" required>
              </div>

              <div class="col my-3">
                <input type="text" class="text-center form-control" id="todo-update-description" placeholder="Description" value="${params.description}"
                  required>
              </div>

              <div id="date-form" class="col my-3">
                <input id="todo-update-date" class="text-center form-control" placeholder="Due date" value="${params.dueDate}"/>
              </div>

              <div class="text-center submit-button mt-4 mb-3">
                <input id="${params._id}" type="button" value="Submit" class="btn-dark btn" onclick="updateTodo(event)">
                <br>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  `
  return rendering
}

function deleteTodo(event) {
  const todoId = event.target.id
  $.ajax({
    url: `http://localhost:3000/todo/${todoId}`,
    method: 'delete',
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(function (response) {
      $('#todo-container').hide()
      getTodoItems()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function complete() {
  $('input[type=checkbox]').on('change', function () {
    const todoId = $(this).val()
    $.ajax({
      url: `http://localhost:3000/todo/${todoId}`,
      method: 'patch',
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function (response) {
        getTodoItems()
      })
      .fail(err => {
        console.log(err)
        Swal.fire('Oops..', 'Something went wrong.')
      })
  });
}

function register(event) {
  event.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/user/register',
    method: 'post',
    data: {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
    .done(function (response) {
      console.log("Successfully registered");
      let { token } = response
      localStorage.setItem("access_token", token)
      checkToken()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function signin(event) {
  event.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/user/login',
    method: 'post',
    data: {
      email: $('#signin-email').val(),
      password: $('#signin-password').val()
    }
  })
    .done(function (response) {
      let { token } = response
      localStorage.setItem("access_token", token)
      checkToken()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', err.responseJSON.messages[0])
    })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: `http://localhost:3000/user/googleSignIn`,
    method: 'post',
    data: {
      googleIdToken: id_token
    }
  })
    .done(function (response) {
      console.log("Posted googleIdToken to the server", response.token)
      let { token } = response
      localStorage.setItem("access_token", token)
      checkToken()
    })
    .fail(err => {
      console.log(err)
      Swal.fire('Oops..', 'Something went wrong.')
    })
}

function signOut(event) {
  event.preventDefault()
  const auth2 = gapi.auth2.getAuthInstance()

  if (auth2) {
    auth2.signOut().then(function () {
      localStorage.removeItem("access_token")
      checkToken()
    })
  }
  else {
    localStorage.removeItem("access_token")
    checkToken()
  }
}