function editTodo(params) {
    // $('#edit-todo').empty()
    $.ajax({
      method: 'GET',
      url: `${baseUrl}/todos/${params}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        console.log(todo)
        $('#edit-todo').append(
          `
          <div>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">
              <div class="flex flex-col mb-4">
                <label for="title">Title</label>
                <input type="text" value="${todo.name}" id="title"
                  class="rounded w-64 rounded-sm border border-blue-200 focus:border-blue-400 focus:outline-none px-2 py-1">
              </div>
              <div class="flex flex-col mb-4">
                <label for="Description">Description</label>
                <input type="text" value="${todo.description}" id="description"
                  class="rounded w-64 rounded-sm border border-blue-200 focus:border-blue-400 focus:outline-none px-2 py-1">
              </div>
              <div class="flex flex-col mb-4">
                <label for="due-date">Due Date</label>
                <input type="text" value="${todo.due_date ? '' : ''}" id="due-date"
                  class="rounded w-64 rounded-sm border border-blue-200 focus:border-blue-400 focus:outline-none px-2 py-1">
              </div>
              <div class="flex flex-col mb-4">
                <p>Status: <span class="font-bold">${todo.status ? 'done' : 'not completed'}</span></p>
              </div>
              <div class="w-full flex justify-center">
                <button onclick="submitEdit('${todo._id}')" class="px-2 py-1 rounded bg-blue-500 text-white">Save edits</button>
              </div>
            </form>
          </div>
          `
        )
        navigate(['#edit-todo', '#logout-btn'])
        preventClick()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  
  }
  
function fetchTodos() {

    console.log('masuk')
    // $('#table').DataTable().destroy()
    $.ajax({
      method: 'GET',
      url: `${baseUrl}/todos`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todos => {
        $('#showAll').empty()
        if (todos) {
            let run =  `
                <h1 style="text-align: center; margin-top: 100px;">Your ToDo List</h1>
                <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                `
          todos.forEach(todo => {
            const desc = todo.description
            const status = todo.status
            const date = (todo.dueDate) ? todo.dueDate.split('T')[0] : 'empty'
            run = run + `
            <tr>
                <td><button onclick="editTodo('${todo._id}')">${todo.name}</button></td>
                <td>${desc}</td>
                <td>${date}</td>
                <td>${status}</td>
                <td><button onclick="deleteTodo('${todo._id}')" class="text-blue-600 hover:text-blue-400">Delete</button> | <button onclick="completeTodo('${todo._id}')" class="text-blue-600 hover:text-blue-400">Complete</button></td>
            </tr>
            `
          })
          $('#showAll').append(
              run + `
                </tbody>
              </table>
              `
          )
        }
        // randomQuotes()
        preventClick()
        $('#table').DataTable()
  
      })
      .fail(err => {
        console.log(err)
      })
  }