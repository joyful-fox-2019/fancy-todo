var googleUser = {}
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function startApp() {
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '73466446457-o33l3k8s3dpakj1ekpsiuf6c0ibqonf1.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('gPlusLogin'));
  });
};

function attachSignin(element) {
  auth2.attachClickHandler(element, {}, function(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $
      .ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/googleSignIn',
        data: {
          id_token
        }
      })
      .done(response => {
        hideAll()
        $('#nav-section').show()
        $('#main-page').show()
        localStorage.setItem('token', response.token)
        localStorage.setItem('name', response.name)
        $('#username').empty()
        $('#username').append(`
        <a><i class="fas fa-user"></i> ${localStorage.getItem('name')}</a>
        `)
        fetchTodo()
      })
      .fail(err => {
        console.log(err)
      })
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }, function(error) {
    console.log(JSON.stringify(error, undefined, 2));
  });
}

// function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

function login(event) {
  event.preventDefault()
  const email = $('#email-login').val()
  const password = $('#pass-login').val()
  $
    .ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: {
        email,
        password
      }
    })
    .done(response => {
      hideAll()
      $('#nav-section').show()
      $('#main-page').show()
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.name)
      $('#username').empty()
      $('#username').append(`
      <a><i class="fas fa-user"></i> ${localStorage.getItem('name')}</a>
      `)
      fetchTodo()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      $('#email-login').val('')
      $('#pass-login').val('')
    })
}

function register(event) {
  event.preventDefault()
  const name = $('#name-register').val()
  const email = $('#email-register').val()
  const password = $('#pass-register').val()
  $
    .ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/register',
      data: {
        name,
        email,
        password
      }
    })
    .done(response => {
      hideAll()
      $('#nav-section').show()
      $('#main-page').show()
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.name)
      $('#username').empty()
      $('#username').append(`
      <a><i class="fas fa-user"></i> ${localStorage.getItem('name')}</a>
      `)
      fetchTodo()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      $('#name-register').val('')
      $('#email-register').val('')
      console.log(response)
      $('#pass-register').val('')
    })
}

function signOut(event) {
  event.preventDefault()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2
    .signOut()
    .then(function () {
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      hideAll()
      $('#login-page').show()
      console.log('User signed out.');
    })
}

function addTodo(event) {
  event.preventDefault()
  const name = $('#name-todo').val()
  const desc = $('#desc-todo').val()
  const due_date = $('#duedate-todo').val()
  $
    .ajax({
      method: 'POST',
      url: 'http://localhost:3000/todos',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        name,
        desc,
        due_date
      }
    })
    .done(response => {
      $('#newTodoModal').modal('hide')
      fetchTodo()
      console.log(response)
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      $('#name-todo').val('')
      $('#desc-todo').val('')
      $('#duedate-todo').val('')
    })
}

function fetchTodo() {
  $
    .ajax({
      method: 'GET',
      url: 'http://localhost:3000/todos',
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(response => {
      $('#todo-list').empty()
      response.forEach(todo => {
        console.log(todo)
        $('#todo-list').append(`
          <li class="card">
            <div class="card__flipper">
              <div class="card__front">
                <p class="card__name"><br>${todo.name}</p>
                <p class="card__name"><br>${monthNames[new Date(todo.due_date).getMonth()]}</p>
                <p class="card__num">${new Date(todo.due_date).getDate()}</p>
              </div>
              <div class="card__back">
                <div class="blog-card spring-fever">
                  <div class="title-content">
                    <h3>${todo.name}</h3>
                    <hr />
                  </div><!-- /.title-content -->
                  <div class="card-info">${todo.desc}</div><!-- /.card-info -->
                  <div class="utility-info">
                    <ul class="utility-list">
                      <li class="date">${new Date(todo.createdAt).getDate()}.${new Date(todo.createdAt).getMonth()}.${new Date(todo.createdAt).getFullYear()}</li>
                    </ul>
                  </div><!-- /.utility-info -->
                  <button type="button" class="btn btn-success">Done</button>
                  <button type="button" class="btn btn-danger">Delete</button>
                  <!-- overlays -->
                  <div class="gradient-overlay"></div>
                  <div class="color-overlay"></div>
                </div><!-- /.blog-card -->
              </div>
            </div>
          </li>
        `)
      });
    })
    .fail(err => {
      console.log(err)
    })
}