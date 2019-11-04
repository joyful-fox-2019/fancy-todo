$('document').ready(function () {
  hideAll()
  startApp()
  if (localStorage.getItem('token')) {
    $('#nav-section').show()
    $('#main-page').show()
    $('#username').empty()
    $('#username').append(`
    <a><i class="fas fa-user"></i> ${localStorage.getItem('name')}</a>
    `)
    fetchTodo()
  } else {
    $('#login-page').show()  
  }

  $('#linkToLogin').on('click', function (e) {
    e.preventDefault()
    hideAll()
    $('#login-page').show()
  })

  $('#linkToRegister').on('click', function (e) {
    e.preventDefault()
    hideAll()
    $('#register-page').show()
  })

  $(".btn-danger").popConfirm({
    title: "Delete Item",
    content: "Are you sure you want to delete this item?",
    placement: "top"
  })
})
