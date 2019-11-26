$('#toLogin').on('click', function (e) {
  e.preventDefault()
  $('.loginpage').show()
  $('.registerpage').hide()
})

$('#toRegister').on('click', function (e) {
  e.preventDefault()
  $('.loginpage').hide()
  $('.registerpage').show()
})
