const baseURL = `http://localhost:3000`

$(document).ready(function() {
  if (!localStorage.getItem('jwtToken')) {
    $('.login').show()
    $('.homepage').hide()
  } else {
    $('.login').hide()
    $('.homepage').show()
    showTodoList()
  }
})

function register(event) {
  event.preventDefault()
  $('.login-form').show()
  $.ajax({
    url: `${baseURL}/user/register`,
    method: "POST",
    data : {
      email : $('#email-register').val(),
      password : $('#password-register').val()
    }
  })
  .done(user => {
  console.log(`Register success`, user);
  $('.register-form').hide()
  $('#email-register').val('')
  $('#password-register').val('')
  $('.login-form').show()
  })
  .fail(err => {
    console.log(`Register failed. Proceed resubmission or try proceed login`, err);
  })
  .always(() => {
    console.log(`complete`);
  })
}

/*
.done(todos => {
    console.log(todos);
    
    todos.forEach(data => {
      $('.alltodos').append(`

    <li class="collection-item"><i class="material-icons">radio_button_unchecked</i></a>${data.title}<a href="#!" class="secondary-content"><i class="material-icons">delete</i></a></li>

      `)
    })
  })
  .fail(console.log)
*/



$('#addtodo').submit(e => {
  e.preventDefault()
  $.ajax({
    url: `${baseURL}/todo`,
    method: `POST`,
    data : {
      title : $(`#add-todo`).val(),
      description : `This is a template generator. Please update your description`,

      dueDate : new Date()

    },
    headers : {
      access_token : localStorage.getItem('jwtToken')
    }
  })
  .done(todo => {
    // console.log(todo, "ini todo nyaaaaaaaaaaaaaa");
    
    console.log(`Adding new todo on your list`, todo);
    $(`#add-todo`).val('')
    $(`.alltodos`).append(`

    <li class="collection-item row">
    <div class="col s1">
      <i class="material-icons">radio_button_unchecked</i>
    </div>
    <div class="col s10" >
        ${todo.title}
    </div>
    <div class="col s1">
        <a href="#!" class="secondary-content">
        <i class="material-icons">delete</i>
        </a>
    </div>
  </li>


    `)
  })
  .fail(err => {
    console.log(`Failed to add todo`, err);
  })
  .always(() => {
    console.log(`complete`);
  })
})


function login(event) {
  event.preventDefault()
  $.ajax({
    url: `${baseURL}/user/login`,
    method: "POST",
    data : {
      email : $('#email-login').val(),
      password : $('#password-login').val()
    }
  })
  .done(token => {
    localStorage.setItem('jwtToken', token.token)
    showTodoList()
    $('.login').hide()
    $('.homepage').show()
    $('#email-login').val('')
    $('#password-login').val('')
  })
  .fail(err => {
    console.log(err);
    
    console.log(`Login failed`);
  })
  .always(() => {
    console.log(`complete`);
    
  })
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: `http://localhost:3000/user/google-signin`,
    method: `POST`,
    data : {
      idToken : id_token
    }
  })
  .done(result => {
    // console.log(result);
    localStorage.setItem('jwtToken', result.token)
    $('.homepage').show()
    $('.login').hide()


  })

  
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });    
    localStorage.removeItem('jwtToken')
    $('.login').show()
    $('.homepage').hide()
    $('.alltodos').empty()
}

function showTodoList() {
  $.ajax({
    url: `${baseURL}/todo`,
    method : `GET`,
    headers : {
      access_token: localStorage.getItem('jwtToken')
    }
  })
  .done(todos => {
    console.log(todos);
    
    todos.forEach(data => {
      $('.alltodos').append(`


    <li class="collection-item row">
    <div class="col s1">
      <i class="material-icons">radio_button_unchecked</i>
    </div>
    <div class="col s10" >
        ${data.title}
    </div>
    <div class="col s1">
        <a href="#!" class="secondary-content">
        <i class="material-icons">delete</i>
        </a>
    </div>
  </li>


      `)
    })
  })
  .fail(console.log)
}




/*
utk date


let dt = new Date();

console.log(`${dt.getDate()} ${dt.toLocaleString('id-ID', {month: 'short'})} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} `)
*/