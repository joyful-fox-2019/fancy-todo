function showAddTodo() {
  $('#main-page').hide()
  $('#add-todo').show()
}

function showMainPage() {
  randomQuotes()
  $('#add-todo').hide()
  $('#main-page').show()
  $.toast('Don\'t miss the quotes!')

}

function addTodo() {
  console.log('masuk addTodo')
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos/`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name: $('#todo-name').val(),
      description: $('#todo-description').val(),
      dueDate: $('#todo-dueDate').val(),
    }
  })
    .done(() => {
      $('#navbar').show()
      $('#main-page').show()
      $('#add-todo').hide()
      $('#todo-name').val('')
      $('#todo-description').val('')
      $('#todo-dueDate').val('')
      $.toast('Todo successfully added')
      fetchTodos()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}

function deleteTodo(params) {
    $.ajax({
      method: 'DELETE',
      url: `${baseUrl}/todos/${params}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(() => {
        $.toast('Todo successfully deleted')
        fetchTodos()
      })
      .fail(err => {
        console.log(err)
      })
  }
  
function fetchTodos() {
    console.log('masuk')
    $.ajax({
      method: 'GET',
      url: `${baseUrl}/todos`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todos => {
        console.log('done fetch')
        randomQuotes()
        $('#showAll').empty()
        if (todos) {
          todos.forEach(todo => {
            const desc = todo.description
            let status
            if (todo.status == 'completed') {
              status = '<i class="fa fa-check" style="font-size:28px"></i>'
            } else {
              status = '<i class="fa fa-exclamation-triangle" style="font-size:28px"></i>'
            }
            // const status = todo.status
            const date = (todo.dueDate) ? todo.dueDate.split('T')[0] : 'empty'
            $('#showAll').append(
              `
              <div class="card text-white bg-info mb-3" style="width: 18rem;">
              <div class="card-header"><h4><i class="fa fa-bell"></i><b> ${todo.name}</b><h4></div>
              <div class="card-body">
                <p class="card-text">${status} ${date}</i></p>
                <p class="card-text">${desc}</p>
                <button onclick="deleteTodo('${todo._id}')" class="btn btn-light"><i class="fa fa-remove"></i></button>
                <button onclick="completeTodo('${todo._id}')" class="btn btn-light"><i class="fa fa-check"></i></button>
              </div>
              </div>
              `
            )
          })

        }
        $.toast('Don\'t miss the quotes!')
      })
      .fail(err => {
        $.toast('There is something wrong, try again!')
      })
  }

function completeTodo(params) {
    $.ajax({
      method: 'PUT',
      url: `${baseUrl}/todos/${params}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(() => {
        $.toast('Todo successfully completed')
        fetchTodos()
      })
      .fail(err => {
        $.toast('There is something wrong, try again!')
        console.log(err.responseJSON.message)
      })
  }
  