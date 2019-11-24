let baseUrl = 'http://todoserver.arnoldtherigan.site'
$(document).ready(function () {
  auth()
})


function auth () {
  if (localStorage.getItem('token')) {
    
    $('.beforeLogin').hide(1000,function() {
      $('.afterLogin').show(1500,function(){
        $('#live-chat').show()
      })
      getProject()
      if(localStorage.getItem('project')== true) {
        $('.my-project').show()
        $('.main-view').hide()
      } else {
        fetchData()
        $('.my-project').hide()
        $('.main-view').show()
      
      }
      $('.top-bar-btn').empty()
      $('.top-bar-btn').append(`<p>${localStorage.getItem('name')}</>`)
      $('.profile-avatar').append(`
        <img src="https://api.adorable.io/avatars/300/${localStorage.getItem('name')}">
      `)
    })
  } else {
    $('.chat-history').empty()
    $('#live-chat').hide()
    $('.afterLogin').hide()
    $('.beforeLogin').show(500)
  }
}


function logout(event) {
  event.preventDefault()
  $('.profile-avatar').empty()
  $('.main-view').empty()
  fetchData()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    })
    
    Toast.fire({
      type: 'success',
      title: 'See you again'
    })
  });

  localStorage.removeItem('token')
  localStorage.removeItem('name')
  localStorage.removeItem('_id')
  localStorage.removeItem('project')
  // $('#afterLogin').hide(2000,function() {
  //     $('#beforeLogin').show(1000)
  // })
  auth()
}


function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
      url : baseUrl + '/users/googleSign',
      method : 'POST',
      data : {
          id_token
      }
  })
      .done(data=>{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000
        })
        
        Toast.fire({
          type: 'success',
          title: 'Login Success, Check your email please'
        })
        localStorage.setItem('token',data.token)
        localStorage.setItem('name',data.name)
        localStorage.setItem('_id',data._id)
        localStorage.setItem('project',false)
        auth()
      })
}


function login(event) {
  event.preventDefault()
  $.ajax({
    url: baseUrl + '/users/login',
    method: 'POST',
    data: {
      email: $('.email').val(),
      password: $('#pass').val()
    }
  })
    .done(data=>{
      localStorage.setItem('token',data.token)
      localStorage.setItem('project',false)
      localStorage.setItem('name',data.name)
      localStorage.setItem('_id',data._id)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      
      Toast.fire({
        type: 'success',
        title: 'Signed in successfully'
      })
      $('.email').val('')
      $('#pass').val('')
      auth()
    })
    .fail(err=>{
      Swal.fire('error', err.responseJSON.message , 'error')
    })
}

function register(event) {
  event.preventDefault()
  $.ajax({
    url: baseUrl + '/users/register',
    method: 'POST',
    data: {
      name: $('#regname').val(),
      email: $('#email').val(),
      password: $('#regpass').val()
    }
  })
    .done(_=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      })
      
      Toast.fire({
        type: 'success',
        title: 'Register Success, Check your email please'
      })
      $('#regname').val('')
      $('#email').val('')
      $('#regpass').val('')
      auth()
    })
    .fail(err=>{
      Swal.fire('error', err.responseJSON.message.join(', ') , 'error')
    })
}