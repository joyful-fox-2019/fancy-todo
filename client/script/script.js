const baseURL = `http://localhost:3000`

$(document).ready(function () {
  islogin()
  

  $('#btn-register').on('click', function (e) {
    e.preventDefault()
    getRegister()
  })

  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    getLogin()
  })
  
  $('#btn-add-todo').on('click', function (e) {
    e.preventDefault()
    createToDo()
  })
  
})

  

