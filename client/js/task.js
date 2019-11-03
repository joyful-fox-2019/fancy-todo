// Patch Task from Appended AJAX Data
$('body').on('click', '.undotask', (event) => {
  Swal.fire({
    title: 'Undo',
    text: "Do you want to undone this task?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes'
  })
    .then((result) => {
      if (result.value) {
        $.ajax({
          url: `http://localhost:3000/task/${event.currentTarget.id}`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .done(response => {
            Swal.fire(
              'Success!',
              'Your file has been moved to My Day',
              'success'
            )
            showArchivedTask()
          })
          .fail(err => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: `${err.responseJSON.message}`,
            })
          })
      }
    })
})

// Delete Task from Appended AJAX Data
$('body').on('click', '.deletetask', (event) => {
  Swal.fire({
    title: 'Delete',
    text: "Do you want to delete this task?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })
    .then((result) => {
      if (result.value) {
        $.ajax({
          url: `http://localhost:3000/task/${event.currentTarget.id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .done(response => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted permanently',
              'success'
            )
            showArchivedTask()
          })
          .fail(err => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: `${err.responseJSON.message}`,
            })
          })
      }
    })
})

// Submit Edited Task from Appended AJAX Data
$('body').on('submit', "#edit-task-form", event => {
  Swal.showLoading()
  let id = event.currentTarget[0].value
  let title = event.currentTarget[1].value
  let description = event.currentTarget[2].value
  let status = event.currentTarget[3].value
  let dueDate = new Date(event.currentTarget[4].value)
  $.ajax({
    url: `http://localhost:3000/task/${id}`,
    method: 'PUT',
    data: {
      title,
      description,
      status,
      dueDate
    },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      $("#edit-task-content").empty()
      $("#edit-task-menu").hide()
      showListedTask()
      Swal.close()
    })
    .fail(err => {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
})

// Detailed Task from Appended AJAX Data
$('body').on('click', '.taskdetail', (event) => {
  Swal.showLoading()
  let taskId = event.currentTarget.id
  $.ajax({
    url: `http://localhost:3000/task/${taskId}`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      $("#my-day-menu").hide()
      let date = new Date(response.dueDate).toISOString().substr(0, 10)
      $("#edit-task-content").append(`
          <form id="edit-task-form">
            <div class="input-group mb-2">
            <input type="text" class="form-control" id="task-id" value="${response._id}" style="display: none">
              <div class="input-group-prepend">
                <div class="input-group-text alert-success">
                  Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
              <input type="text" class="form-control" id="task-title" value="${response.title}">
            </div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text alert-danger">Description</div>
              </div>
              <input type="text" class="form-control" id="task-description" value="${response.description}">
            </div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text alert-primary">Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
              <select class="custom-select" id="task-status">
                <option selected>${response.status}</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text alert-warning">Due Date&nbsp;&nbsp;&nbsp;</div>
              </div>
              <input type="date" class="form-control" value="${date}">
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-info" style="width: 30%">Submit</button>
            </div>
          </form>
        `)
      $("#edit-task-menu").fadeIn(500)
      Swal.close()
    })
    .fail(err => {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
})

// Archived Listed Tasks
function showArchivedTask() {
  Swal.showLoading()
  $("#archived-content").empty()
  $.ajax({
    url: 'http://localhost:3000/task',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(tasks => {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'Done') {
          $("#archived-content").append(`
          <li>
            <div class="input-group mb-3">
              <input type="text" disabled style="pointer-events: none" class="btn btn-outline-primary ml-1 mr-1" 
                aria-describedby="basic-addon2" value ="${tasks[i].title}" style="width: 80%">
              <div class="input-group-append">
                <button class="deletetask btn btn-danger mr-1" id="${tasks[i]._id}" type="button">Del</button>
                <button class="undotask btn btn-warning" id="${tasks[i]._id}" type="button">Act</button>
              </div>
            </div>
          </li>
          `)
        }
      }
      $("#archived-menu").fadeIn(500)
      Swal.close()
    })
    .fail(err => {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
}

// My Day Listed Tasks
function showListedTask() {
  Swal.showLoading()
  let todayDate = new Date().toDateString();
  $("#my-day-nav").text(`${formatDate(todayDate)}`)
  $("#my-day-content").empty()
  $.ajax({
    url: 'http://localhost:3000/task',
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(tasks => {
      let colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
      let colorIndex = 0
      for (let i = 0; i < tasks.length; i++) {
        let dueDate = new Date(tasks[i].dueDate).toDateString()
        if (colorIndex === 5) {
          colorIndex = 0
        }
        if (tasks[i].status === 'Active') {
          $("#my-day-content").append(`
          <li><a href="#" class="taskdetail btn btn-outline-${colors[colorIndex]} mb-1" id="${tasks[i]._id}" style="width: 95%">
              <h5>${tasks[i].title}</h5>
              <h6>Deadline: ${formatDate(dueDate)}</h6>
          </a></li>
          `)
          colorIndex++
        }
      }
      $("#my-day-menu").fadeIn(500)
      Swal.close()
    })
    .fail(err => {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `${err.responseJSON.message}`,
      })
    })
}
