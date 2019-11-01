$(document).ready(()=>{
  console.log('DOM is ready');
  loginCard()

  if(localStorage.getItem('token')){

  } else {
    // loginpage()
  }

})

function show(element){
  $(element).show()
}
function hide(element){
  $(element).hide()
}

$('#loginTab').click(()=>{
  $('#loginTab').addClass('active')
  $('#registerTab').removeClass('active')
  $('#registerCreatorTab').removeClass('active')
  loginCard()
})

$('#registerTab').click(()=>{
  $('#loginTab').removeClass('active')
  $('#registerTab').addClass('active')
  $('#registerCreatorTab').removeClass('active')
  registerCard()
})

$('#registerCreatorTab').click(()=>{
  $('#loginTab').removeClass('active')
  $('#registerTab').removeClass('active')
  $('#registerCreatorTab').addClass('active')
  registerCreatorCard()
})

function loginCard(){
  show('#loginCard')
  hide('#registerCard')
  hide('#registerCreatorCard')
}

function registerCard(){
  hide('#loginCard')
  show('#registerCard')
  hide('#registerCreatorCard')
}

function registerCreatorCard(){
  hide('#loginCard')
  hide('#registerCard')
  show('#registerCreatorCard')
}

$('form')
  .form({
    on: 'blur',
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your password'
          }
        ]
      },
      username: {
        identifier  : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your username'
          }
        ]
      }
    }
  })