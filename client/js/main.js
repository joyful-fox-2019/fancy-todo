$(document).ready(function () {

  $("#user-name").text(`Hello, ${localStorage.getItem('name')}`)
  let session = localStorage.getItem('isLogin')
  let token = localStorage.getItem('access_token')
  let user = localStorage.getItem('name')
  // First Page
  if (!(session && token && user)) {
    $("#login-content").show()
  }

  // Register Form
  $("#trigger-register").click(event => {
    event.preventDefault()
    $("#login-content").hide()
    $("#register-content").fadeIn(500)
  })
  $("#register-form").submit(() => {
    event.preventDefault()
    let name = $("#register-name").val()
    let email = $("#register-email").val()
    let password = $("#register-password").val()
    webRegister(name, email, password)
    $("#register-form")[0].reset()
  })

  // Login Form
  $("#trigger-login").click(event => {
    event.preventDefault()
    $("#register-content").hide()
    $("#login-content").fadeIn(500)
  })
  $("#login-form").submit(() => {
    event.preventDefault()
    let email = $("#login-email").val()
    let password = $("#login-password").val()
    webLogin(email, password)
    $("#login-form")[0].reset()
  })

  // After Register and Login Page
  if (session && token && user) {
    $("#todo-menu").show()
    $("#signout").show()
  }

  // My Day
  $("#my-day").click(event => {
    event.preventDefault()
    $("#todo-menu").hide()
    showListedTask()
  })
  $("#back-my-day").click(event => {
    event.preventDefault()
    $("#my-day-menu").hide()
    $("#todo-menu").fadeIn(500)
  })

  // Add Task
  $("#add-task").click(event => {
    event.preventDefault()
    $("#my-day-menu").hide()
    $("#add-task-menu").fadeIn(500)
  })
  $("#back-add-task").click(event => {
    event.preventDefault()
    $("#add-task-menu").hide()
    showListedTask()
  })

  // Add Task Form
  $("#add-task-form").submit(() => {
    event.preventDefault()
    let title = $("#task-title").val()
    let description = $("#task-description").val()
    let dueDate = $("#task-date").val()
    $("#add-task-form")[0].reset()
    $.ajax({
      url: 'http://localhost:3000/task',
      method: 'POST',
      data: {
        title,
        description,
        dueDate
      },
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .done(response => {
        $("#add-task-menu").hide()
        showListedTask()
      })
      .fail(err => {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: `${err.responseJSON.message}`,
        })
      })
  })

  //Edit Task
  $("#back-edit-task").click(event => {
    event.preventDefault()
    $("#edit-task-content").empty()
    $("#edit-task-menu").hide()
    showListedTask()
  })

  // Archived
  $("#archived").click(event => {
    event.preventDefault()
    $("#todo-menu").hide()
    showArchivedTask()
  })
  $("#back-archived").click(event => {
    event.preventDefault()
    $("#archived-menu").hide()
    $("#todo-menu").fadeIn(500)
  })

  // End Document Ready
})

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

// Date
function formatDate(date) {
  let dates = date.split(' ');
  let dd = Number(dates[2]);
  let yy = Number(dates[3]);
  let day = null;
  switch (dates[0]) {
    case 'Mon':
      day = 'Monday';
      break;
    case 'Tue':
      day = 'Tuesday'
      break;
    case 'Wed':
      day = 'Wednesday'
      break;
    case 'Thu':
      day = 'Thursday'
      break;
    case 'Fri':
      day = 'Friday'
      break;
    case 'Sat':
      day = 'Saturday'
      break;
    case 'Sun':
      day = 'Sunday'
      break;
  }
  let mm = null;
  switch (dates[1]) {
    case 'Jan':
      mm = 'January';
      break;
    case 'Feb':
      mm = 'February'
      break;
    case 'Mar':
      mm = 'March'
      break;
    case 'Apr':
      mm = 'April';
      break;
    case 'May':
      mm = 'May'
      break;
    case 'Jun':
      mm = 'June'
      break;
    case 'Jul':
      mm = 'July';
      break;
    case 'Aug':
      mm = 'August'
      break;
    case 'Sep':
      mm = 'September'
      break;
    case 'Oct':
      mm = 'October'
      break;
    case 'Nov':
      mm = 'November'
      break;
    case 'Dec':
      mm = 'December'
      break;
  }
  return `${day}, ${dd} ${mm} ${yy}`
}

