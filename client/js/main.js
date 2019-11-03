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
