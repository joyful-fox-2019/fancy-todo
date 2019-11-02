const baseUrl = 'http://localhost:3000'



const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000
})
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


$(document).ready( function () {
  $('#login').hide()
  $('#project').hide()
  $('#notif').hide()
  $('.invitemember').hide()
  $('#other').hide()
  $('#createProject').hide()
  $('#createProject1').hide()
  $('#register').hide()
  $('#createTodo1').hide();
  $('#showNotif').hide()
  $('.container2').hide();
  $('.social').hide()
  $('#todoListProject').hide();
  checkLogin()
})

//=================================================== HOME ================================================


function home () {
  focusTodo()
  showTodo()
  $('.progress').show();
  $('.invitemember').hide()
  $('.mainMain').show();
  $('#register').hide();
  $('#login').hide();
  $('#createTodo1').hide();
  $('#todo-side-bar').show()
}

function showPortFolio() {
  $('.social').show()
}

//=================================================== TAKE DATA USER ================================================


function takeDataUser () {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'get',
      url: `${baseUrl}/users/getlogin`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(data => {
        resolve(data.Invitation)
      })
      .fail(err => {
        reject(err)
      })
  })
}

//=================================================== CHECK LOGIN ================================================


function checkLogin () {
  if(localStorage.getItem('token')) {
    $('#islogin').hide()
    $('#logout').show()
    lengthNotif()
    showTodo()
  } else {
    $('#islogin').show()
    $('#logout').hide()
    $('#login').show()
    $('.mainMain').hide()
  }
}

//=================================================== GO SOMEWHERE ================================================

function lengthNotif () {
  $('.lengthNotif').empty()
  takeDataUser()
  .then(invitation => {
    $('.lengthNotif').append(`${invitation.length} Invitation`)
  })
  .catch(err => {
    Toast.fire({
      type: 'error',
      title: err.responseJSON.msg
    })
  })
}

function goLogin() {
  $('#login').show()
  $('.mainMain').hide()
  $('#register').hide()

  $('#todoListProject').hide()
  $('.invitemember').hide()
  $('.container2').hide()

}
function goRegister() {
  $('#register').show()
  $('.mainMain').hide()
  $('#login').hide()
  $('#todoListProject').hide()
  $('.container2').hide()
  $('.invitemember').hide()
}
function goLogout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('token');
  checkLogin()
  $('.list-item').empty()  
  $('#login').show()
  $('#myList').empty()
  $('.progress').empty()
  $('.mainMain').hide()
  $('#islogin').show()
  $('.invitemember').hide()
  $('.container2').hide()
  $('#logout').hide()
}
function goCreateTodo() {
  focusTodo()
  $('#todo-side-bar').hide();
  $('#createTodo1').show();
  $('.list-item').empty();

  $('.social').hide()
  $('.invitemember').hide()
  $('.container2').hide()

  $('#todoListProject').hide()
}
function goProject () {
  focusProject()
  $('#myList').empty()
  $('.progress').empty().hide()
  $('#createProject1').hide()
  $('.invitemember').hide()
  $('.social').hide()
  $('.container2').hide()
  showProject()

  $('#todoListProject').hide()
}
function goCreateProject () {
  $('#todoListProject').hide()

  $('#todo-side-bar').hide();
  $('.invitemember').hide()
  $('#createProject1').show();
  $('.container2').hide()
  $('.social').hide()
  focusProject()
  fetchMember()
  showProject()
}
function goNotification () {
  focusNotif()
  $('#createProject1').hide()
  $('.invitemember').hide()
  $('.social').hide()
  $('#myList').empty()
  $('.progress').empty().hide()
  $('.container2').hide()

  fetchNotification()
  $('#todoListProject').hide()
  // $('#todo-side-bar').hide()
}


//=================================================== ALL FOCUS ================================================


function focusTodo() {
  $('#todo').show()
  $('#createTodo').show()
  
  $('#project').hide()
  $('#createProject').hide()
  $('#createProject1').hide()

  $('#notif').hide()
  $('.social').hide()
  $('.invitemember').hide()
  $('#other').hide()
}
function focusProject() {
  $('#project').show()
  $('.social').hide()
  $('#createProject').show()
  $('#createProject1').show()

  $('.invitemember').hide()
  $('#todo').hide()
  $('#createTodo').hide()
  $('#createTodo1').hide()

  $('#notif').hide()
  $('#other').hide()
}
function focusNotif() {
  $('#notif').show()
  $('#showNotif').show()
  $('.invitemember').hide()
  $('.social').hide()

  $('#todo').hide()
  $('#createTodo').hide()

  $('#project').hide()
  $('#createProject').hide()

  $('#other').hide()
}
function focusOther() {
  $('#other').show()

  $('.social').show()
  $('.invitemember').hide()
  $('#todo').hide()
  $('#notif').hide()
  $('#project').hide()
}


//=================================================== FETCHING MEMBER ================================================


let tempCheck = []
function fetchMember () {
  $('.list-item').empty()
  $.ajax({
    method: 'get',
    url: `${baseUrl}/users`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      data.forEach((el, i) => {
        $('.list-item').prepend(`
        <div class="item">
          <input type="checkbox" class='${el.username}' onclick='checkboxClick("${el.username}")'>
          <label for="">${el.username}</label>
          <span><i class="fas fa-bell"></i></span>
        </div>
        `)
      })
    })
    .fail(err => {
      swal.fire({
        type: 'warning',
        title: 'Woops',
        text: err.responseJSON.msg
      })
    })
}


function checkboxClick (username) {
  tempCheck.push(username)
}

var tempInvitation = ''

//=================================================== INVITE MEMBER FOR PROJECT ================================================



let tempCheckProject = []
function fetchMemberPROJECT () {
  $('.invitemember').empty()
  $('.container2').show()
  $.ajax({
    method: 'get',
    url: `${baseUrl}/users`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      data.forEach((el, i) => {
        $('.invitemember').prepend(`
        <div class="item2">
          <input type="checkbox"  onclick='checkboxClickProject("${el.username}")'>
          <label for="">${el.username}</label>
        </div>
        `)
      })
    })
    .fail(err => {
      swal.fire({
        type: 'warning',
        title: 'Woops',
        text: err.responseJSON.msg
      })
    })
}


function checkboxClickProject (username) {
  tempCheckProject.push(username)
}




//=================================================== FETCH NOTIFICATION ================================================


function fetchNotification () {
  $('.social').hide()
  $('.rowcard').empty()
  getDataLogin()
  let timerInterval
  Swal.fire({
    title: 'Wait get your Invitation',
    html: 'Fetching Data in <b></b>',
    timer: 1500,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector('b')
          .textContent = Swal.getTimerLeft()
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (
      result.dismiss === Swal.DismissReason.timer
    ) {
      tempInvitation.forEach((el, i) => {
        $('.rowcard').append(`
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${el.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted"></h6>
              <p class="card-text">Member ${el.Members.length}<br> Todo ${el.Todo.length}</p>
              <a href="#" class="card-link" onclick='acceptProject("${el._id}")'>Accept</a>
              <a href="#" class="card-link" onclick='declineProject("${el._id}")'>Decline</a>
            </div>
          </div>
        </div>
        `)
      })
    }
  })
}


//=================================================== GET DATA LOGIN ================================================


function getDataLogin () {
  $.ajax({
    method: 'get',
    url: `${baseUrl}/users/getlogin`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      tempInvitation = data.Invitation
    })
    .fail(err => {
      swal.fire({
        type: 'error',
        title: 'wooppps',
        text: err.responseJSON.msg
      })
    })
}

//=================================================== DECLINE THE INVITATION ================================================


function declineProject (id) {
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "This project is very fun!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, decline it!',
    cancelButtonText: 'Wait, let me think first',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: 'patch',
        url: `${baseUrl}/users/dec/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          setTimeout(() => {
            lengthNotif()
          }, 1000);
          goProject()
          $('.rowcard').empty().hide()
          swalWithBootstrapButtons.fire(
            'Decline',
            'Your invitation has been decline.',
            'success'
          )
        })
        .catch(err => {
          swal.fire({
            type: 'info',
            title: 'oops',
            text: err.responseJSON.msg
          })
        })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary Todo is safe :)',
        'error'
      )
    }
  })
}

//=================================================== ACCEPT THE INVITATION ================================================


function acceptProject (id) {
  $.ajax({
    method: 'patch',
    url: `${baseUrl}/users/acc/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then((data) => {
      setTimeout(() => {
        lengthNotif()
      }, 1000);
      goProject()
      $('.rowcard').empty().hide() 
      swal.fire({
        type: 'success',
        title: 'Welcome to the Project',
        text: data.msg
      })
    })
    .fail(err => {
      swal.fire({
        type: 'error',
        title: 'woops',
        text: err.responseJSON.msg
      })
    })
}

function inviteListMember () {
  let tempProject = []
  let countProject = []
  for( let i=0; i<tempCheckProject.length; i++ ){
    if(tempProject.length == 0) {
      tempProject.push(tempCheckProject[i]);
      countProject.push(1);
    } else {
      var counter = 0
      for(let j=0; j<tempProject.length; j++ ){
        if(tempProject[j] == tempCheckProject[i]){
          counter ++
          countProject[j] ++
        }
      }
    }
    if(counter == 0) {
      tempProject.push(tempCheckProject[i]);
      countProject.push(1)
    }
  }
  for(let i=0; i<tempProject.length; i++ ){
    if(countProject[i] %2 == 0 ) {
      tempProject.splice(i,2)
    }
  }
  tempProject.forEach(el => {
    sendInvited(el, projectId)
  })
}

//=================================================== CREATE PROJECT ================================================


function triggerCreateProject () {
  let temp = []
  let count = []
  for( let i=0; i<tempCheck.length; i++ ){
    if(temp.length == 0) {
      temp.push(tempCheck[i]);
      count.push(1);
    } else {
      var counter = 0
      for(let j=0; j<temp.length; j++ ){
        if(temp[j] == tempCheck[i]){
          counter ++
          count[j] ++
        }
      }
    }
    if(counter == 0) {
      temp.push(tempCheck[i]);
      count.push(1)
    }
  }
  for(let i=0; i<temp.length; i++ ){
    if(count[i] %2 == 0 ) {
      temp.splice(i,2)
    }
  }
  const name = $('#newNameProject').val()
  $.ajax({
    method: 'post',
    url: `${baseUrl}/projects`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name
    }
  })
    .then(data => {
      showProject()
      focusProject()
      temp.forEach((el, i) => {
        sendInvited(el, data.data._id)
      })
      const project = data.data
      $('#myList').prepend(`
      <div class="card card22">
        <div class="card-header">
          <p style='font-size: 25px'>${project.name}</p>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>Owner ${data.msg}</p>
            <footer class="blockquote-footer">${el.Members.length} Member & ${el.Todo.length} Todo <cite title="Source Title"></cite></footer>
            <button class='btn btn-outline-success btn-sm' onclick="">Join</button>
            <button class='btn btn-outline-danger btn-sm' onclick="">Delete</button>
          </blockquote>
        </div>
      </div>
      `)
      $('#newNameProject').val('');
    })
    .fail(err => {
      swal.fire({
        type: 'warning',
        title: 'Woops',
        text: err.responseJSON.msg
      })
      $('#newNameProject').val('');
    })
}

//=================================================== FUNCTION SEND INVITED ================================================


function sendInvited (el, id) {
  $.ajax({
    method: 'patch',
    url: `${baseUrl}/users/coming/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      username: el
    }
  })
    .then(data => {
      Toast.fire({
        type: 'success',
        title: data.msg
      })
      $('#createProject1').hide();
      $('#todo-side-bar').show();
    })
    .fail(err => {
      swal.fire({
        type: 'warning',
        title: 'Woops',
        text: err.responseJSON.msg
      })
    })
}

//=================================================== SHOW PROJECT ================================================


function showProject () {
  $('#todoListProject').hide()
  $('#myList').empty()
  $.ajax({
    method: 'get',
    url: `${baseUrl}/projects`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(projects => {
      projects.reverse().forEach((el, i) => {
        $('#myList').append(`
        <div class="card card22">
          <div class="card-header">
            <p style='font-size: 25px'>${el.name}</p>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>Owner ${el.owner.username}</p>
              <footer class="blockquote-footer">${el.Members.length} Member & ${el.Todo.length} Todo <cite title="Source Title"></cite></footer>
              <button class='btn btn-outline-success btn-sm' onclick="goTodoProject('${el._id}')">Go</button>
              <button class='btn btn-outline-danger btn-sm' onclick="deleteProject('${el._id}')">Delete</button>
            </blockquote>
          </div>
        </div>
        `)
      })
    })
    .catch(err => {
      swal.fire({
        type: 'error',
        title: 'woops',
        text: err.responseJSON.msg
      })
    })
}

//=================================================== GO TODO PROJECT ( PROJECT TODO ) ================================================

var projectId = ''

function goTodoProject (id) {
  $('#todo-side-bar').hide();
  $('#formTodoProject').hide();
  $('.footProject').hide()
  $('.progress').empty();
  $('.headerProject').empty();
  $('#button-1').hide()
  $('#createProject1').hide()
  $('.bodyMainProject').empty();
  fetchMemberPROJECT()
  $.ajax({
    method: 'get',
    url: `${baseUrl}/projects/find/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      $('#todoListProject').show();
      $('.invitemember').show();
      $('#button-1').show()
      $('.bodyMainProject').show()    
      projectId = data._id
      $('.headerProject').append(`
      <h3>${data.name.toUpperCase()}</h3>
      `)
      if(data.Todo.length == 0) $('.bodyMainProject').append('<h2>Empty Todo List</h2>')
      else {
        data.Todo.reverse().forEach((el, i) => {
          if(el.status){
            statusColor = 'success'
          }else {
            statusColor = ''
            falsee++
          }
          $('.bodyMainProject').append(`
          <div class="card card22">
            <div class="card-header bg-${statusColor}">
              ${el.title}
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${el.description}</p>
                <footer class="blockquote-footer">Created At <cite title="Source Title">${el.UserId}</cite></footer>
                <button class='btn btn-outline-success' onclick="checkListProject('${el._id}')">Check Done</button>
                <button class='btn btn-outline-danger' onclick="deleteTodoProject('${el._id}')">Delete</button>
              </blockquote>
            </div>
          </div>
          `)
        })
      }
    })
    .catch(err => {
      $('#todo-side-bar').show()
      swal.fire({
        type: 'warning',
        title: err.responseJSON.msg
      })
    })
}



//=================================================== CREATE TODO PROJECT ================================================


function goCreateTodoProject () {
  $('.bodyMainProject').empty().hide()
  $('#formTodoProject').show();
  $('.footProject').show()
}

function createTodoProject () {
  const date = $('#dateProject').val()
  const title = $('#projectTitle').val();
  const description = $('#projectDescription').val();
  const id = projectId;
  $.ajax({
    method: 'post',
    url: `${baseUrl}/todos/project/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      date,
      title,
      description
    }
  })
    .then(data => {
      goTodoProject(id)
      $('#formTodoProject').hide();
      $('.bodyMainProject').show();
      $('#projectTitle').val('');
      $('#projectDescription').val('');
      swal.fire({
        type: 'success',
        title: 'Yeah',
        text: data.msg
      })
    })
    .fail(err => {
      swal.fire({
        type: 'error',
        title: 'woops',
        text: err.responseJSON.msg
      })
    })
}



//=================================================== DELETE PROJECT ================================================



function deleteProject(id) {
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "This project so Awesome!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: 'delete',
        url: `${baseUrl}/projects/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          goProject()
          swalWithBootstrapButtons.fire(
            'Deleted!',
            data.msg,
            'success'
          )
        })
        .catch(err => {
          swal.fire({
            type: 'info',
            title: 'oops',
            text: err.responseJSON.msg
          })
        })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary Todo is safe :)',
        'error'
      )
    }
  })
}

//=================================================== REGISTER CLICK ================================================


function registerClick () {
  const username = $('#username').val();
  const email = $("#emailRegister").val();
  const password = $("#passwordRegister").val();
  $.ajax({
    method: 'post',
    url: `${baseUrl}/users/signup`,
    data: {
      username,
      email,
      password
    }
  })
    .then( (data) => {
      $('#username').val('');
      $('#emailRegister').val('');
      $('#passwordRegister').val('');
      $('#register').hide();
      $('#login').show()
    })
    .catch(err => {
      swal.fire({
        type: 'error',
        title: 'woops',
        text: err.responseJSON.msg
      })
    })
}

//=================================================== SIGN IN MANUAL ================================================


function login () {
  const email = $('#email').val();
  const password = $('#password').val();
  $('.list-item').empty()
  $.ajax({
    method: 'post',
    url: `${baseUrl}/users/signin`,
    data: {
      email,
      password
    }
  })
    .then(data => {
      setTimeout(() => {
        lengthNotif() // asyn wait login success and get token
      }, 1500);
      localStorage.setItem('token', data.token)
      fetchMember()
      showTodo()
      $('#login').hide()
      $('#islogin').hide()
      $('#logout').show()
      $('.mainMain').show()
      $('#email').val('')
      $('#password').val('')
      return $.ajax({
        method: 'get',
        url: `${baseUrl}/quote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    })
    .then(data => {
      const username = data.username;
      const quote = data.data.quoteText;
      const author = data.data.quoteAuthor;
      setTimeout(() => {
        Toast.fire({
          type: 'success',
          title: author,
          text: quote
        })
      }, 1200);
    })
    .catch(err => {
      swal.fire({
        type: 'error',
        title: 'wooops',
        text: err.responseJSON.msg
      })
    })
}

//=================================================== SIGN IN GOOGLE ================================================


function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'post',
    url: `${baseUrl}/users/signinG`,
    data: {
      id_token
    }
  })
    .then(data => {
      setTimeout(() => {
        lengthNotif()
      }, 1500);
      localStorage.setItem('token', data.token);
      swal.fire({
        type: 'success',
        title: 'Success Login',
        text: 'Welcome'
      })
      $('#login').hide();
      $('#islogin').hide()
      $('.mainMain').show();
      $('#logout').show();
      showTodo()
    })
    .catch(err => {
      swal.fire({
        type: 'error',
        title: 'something wrong',
        text: err.responseJSON.msg
      })
    })
}


//=================================================== SHOW TODO ================================================


let persentase
let falsee
function showTodo () {
  $('#todoListProject').hide()

  $('.progress').empty()
  $('#myList').empty()
  $.ajax({
    method: 'get',
    url: `${baseUrl}/todos`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(todos => {
      Toast.fire({
        type: 'success',
        title: 'Fetching Todo'
      })
      falsee = 0;
      let statusColor
      todos.reverse().forEach((el, i) => {
        if(el.status){
          statusColor = 'success'
        }else {
          statusColor = ''
          falsee++
        }
        $('#myList').append(`
        <div class="card card22">
          <div class="card-header bg-${statusColor}">
            ${el.title}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>${el.description}</p>
              <footer class="blockquote-footer">Created By <cite title="Source Title">${el.UserId.username}</cite></footer>
              <button class='btn btn-outline-success' onclick="checkList('${el._id}')">Check Done</button>
              <button class='btn btn-outline-danger' onclick="deleteTodo('${el._id}')">Delete</button>
            </blockquote>
          </div>
        </div>
        `)
      })

      persentase = 0;
      persentase = Math.round((falsee/todos.length) * 100);
      $('.progress').append(`
      <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${100-persentase}%">${100-persentase}%</div>  
      <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${persentase}%">${persentase}%</div>  

      `)
    })
    .fail(err => {
      swal.fire({
        type: 'error',
        title: 'wooops',
        text: err.responseJSON.msg
      })
    })
}

//=================================================== CHECK LIST Project TODO ================================================



function checkListProject(id) {
  $.ajax({
    method: 'patch',
    url: `${baseUrl}/todos/checklist/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      swal.fire({
        type: 'success',
        title: 'Yeah',
        msg: data.msg
      })
    })
    .fail(err => {
      if(err.responseJSON.msg == 'Authorization Error!'){
        swal.fire({
          type: 'warning',
          title: err.responseJSON.msg,
          text: 'Can\'t change other people\'s data'
        })
      } else {
        swal.fire({
          type: 'info',
          title: 'Oops',
          text: err.responseJSON.msg
        })
      }
    })
}


//=================================================== DELETE PROJECT TODO ================================================


function deleteTodoProject(id) {
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: 'delete',
        url: `${baseUrl}/todos/project/${id}`,
        data: {
          projectId: projectId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            data.msg,
            'success'
          )
        })
        .catch(err => {
          if(err.responseJSON.msg == 'Authorization Error!'){
            swal.fire({
              type: 'warning',
              title: err.responseJSON.msg,
              text: 'Can\'t change other people\'s data'
            })
          } else {
            swal.fire({
              type: 'info',
              title: 'Oops',
              text: err.responseJSON.msg
            })
          }
        })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary Todo is safe :)',
        'error'
      )
    }
  })
}


//=================================================== CHECK LIST ================================================

function checkList(id) {
  $.ajax({
    method: 'patch',
    url: `${baseUrl}/todos/checklist/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      showTodo()
      swal.fire({
        type: 'success',
        title: 'Yeah',
        msg: data.msg
      })
    })
    .fail(err => {
      if(err.responseJSON.msg == 'Authorization Error!'){
        swal.fire({
          type: 'warning',
          title: err.responseJSON.msg,
          text: 'Can\'t change other people\'s data'
        })
      } else {
        swal.fire({
          type: 'info',
          title: 'Oops',
          text: err.responseJSON.msg
        })
      }
    })
}

//=================================================== DELETE TODO ================================================


function deleteTodo(id) {
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      $.ajax({
        method: 'delete',
        url: `${baseUrl}/todos/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          showTodo()
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
          )
        })
        .catch(err => {
          if(err.responseJSON.msg == 'Authorization Error!'){
            swal.fire({
              type: 'warning',
              title: err.responseJSON.msg,
              text: 'Can\'t change other people\'s data'
            })
          } else {
            swal.fire({
              type: 'info',
              title: 'Oops',
              text: err.responseJSON.msg
            })
          }
        })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary Todo is safe :)',
        'error'
      )
    }
  })
}

//=================================================== Trigger Cancel ================================================

function cancelBack () {
  $('#createTodo1').hide()
  $('#todo-side-bar').show()
}
function cancelBackProject () {
  $('#createProject1').hide();
  $('#newNameProject').val('');
  $('#todo-side-bar').show()
  focusProject()
}

//=================================================== CREATE TODO ================================================

function createTodo () {
  const due_date = $('#date').val();
  const title = $('#newTitle').val();
  const description = $('#description').val();
  $.ajax({
    method: 'post',
    url: `${baseUrl}/todos`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      due_date,
      title,
      description
    }
  })
    .then(data => {
      showTodo()
      $('#date').val('')
      $('#newTitle').val('')
      $('#description').val('')
      $('#createTodo1').hide()
      $('#todo-side-bar').show()
      const todo = data.todo
      $('#myList').prepend(`
      <div class="card card22">
        <div class="card-header bg-${statusColor}">
          ${todo.title}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${todo.description}</p>
            <footer class="blockquote-footer">Created By <cite title="Source Title">${todo.UserId.username}</cite></footer>
            <button class='btn btn-outline-success' onclick="checkList('${todo._id}')">Check Done</button>
            <button class='btn btn-outline-danger' onclick="deleteTodo('${todo._id}')">Delete</button>
          </blockquote>
        </div>
      </div>
      `)
    })
    .fail(err => {
      swal.fire({
        type: 'error',
        title: err.responseJSON.msg
      })
    })
}