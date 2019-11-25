$(document).ready( () => {
    ceckStatus()         
    $('#to_login').click(function(event) {
        event.preventDefault()
        $('#register').hide() 
        $('#login').show() 
    })
    $('#to_register').click(function(event) {
        event.preventDefault()
        $('#register').show() 
        $('#login').hide() 
    })
    $('#empty-todo').hide()   
    $('#register').submit( event => {
        event.preventDefault()
        let email = $('#email').val()
        let password = $('#password').val()
        $.ajax({
            url : `http://localhost:3000/register`,
            method : 'POST',
            data : {
                email : email,
                password : password
            }
        }).done( result => {
            Swal.fire(
                'Register Success!',
                'You have been registered in our web!',
                'success'
              )
            $('#register').hide()
            $('#login').show()
        }).fail( err => {
            Swal.fire({
                title: 'error',
                type: 'error',
                text: err.responseJSON.msg
            })
        })
    })

    $('#login').submit(event => {
        event.preventDefault()        
        let email = $('#email_login').val()
        let password = $('#password_login').val()
        $.ajax({
            url : `http://localhost:3000/login`,
            method : 'POST',
            data : {
                email : email,
                password : password
            }
        })
        .done( data => {
            Swal.fire(
                'Loggin Success!',
                'You are now loggin in our web!',
                'success'
              )
            localStorage.setItem("token", data.token)
            ceckStatus()   
        })
        .fail( err => {
            Swal.fire({
                title: 'Ops...',
                type: 'error',
                text: err.responseJSON.msg
            })
        })
    })
    $('#todo_form').hide()    
    $('#add-button').click(function(event){
        console.log('ini')
        $('#todo_form').show()
    })
    // ini form untuk membuat todolist baru
    $('#todo_form').submit(event => {
        event.preventDefault()        
        let name = $('#input_activity').val()
        let date = $('#input_date').val()
        let time = $('#input_time').val()
        let token = localStorage.getItem("token") // ambil token yang berisi email dan id
        $.ajax({
            url : `http://localhost:3000/todo`,
            method : 'POST',
            headers : {
                token: localStorage.getItem('token')
            },
            data : {
                name,
                date : new Date(`${date} ${time}`),
            }
            
        })
        .done( data => {
            Swal.fire(
                'Adding the todo list success!',                
                'success'
              )
            //localStorage.setItem("token", data.token)  
        })
        .fail( err => {
            console.log(err)
            Swal.fire({
                title: 'Ops...',
                type: 'error',
                text: err.responseJSON.msg
            })
        })
    })

    $('#today-list').click(function(event){        
        event.preventDefault()
        viewTodoToday()
    })

    $('#all-list').click(function(event){        
        event.preventDefault()
        viewAll()
    })
        
    
}) // ini tutup bagian document ==============================================>


function viewAll() {
    let token = localStorage.getItem("token") // ambil token yang berisi email dan id
    $.ajax({
        url : `http://localhost:3000/todo/all`,
        method : 'GET',
        headers : {
            token: localStorage.getItem('token')
        }
    })
    .then(todos => {
        if (todos.length === 0) {
            $('#todo-container').empty()    
            $('#todo-container').append(`
            <li class="list-group-item pt-5 pb-5" id="empty-todo">
                <div class="card" style="width: 70%; margin : 0px auto;">
                    <img src="./image/empty.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Todays Activity</h5>
                        <p class="card-text">It seems that you have no activity, do you want to add new todo list ?</p>
                        <button class="btn btn-secondary" id="add-button">
                            <i class="glyphicon glyphicon-plus-sign"  ></i>
                            Add Activity</button>
                    </div>
                </div>
            </li> `)
        }
        $('#todo-container').empty()
        todos.forEach(todo => {            
            $('#todo-container').append(
            `<li class="list-group-item pb-4 pt-4"> 
                <div class="glyphicon glyphicon-ok"></div> ${todo.name}
                <div class="glyphicon glyphicon glyphicon-time pl-5 pr-0"> ${new Date(todo.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </div> 
                <a class='delete' href="" ><div class="float-right glyphicon glyphicon-trash ml-3" id="${todo._id}" ></div></a> 
                <a class='delete' href="" ><div class="float-right glyphicon glyphicon-edit" id="${todo._id}"></div></a> 
            </li>`)
        });
        $('#todo-container').append(`
        <li <button class="btn btn-secondary" id="add-button">
                <i class="glyphicon glyphicon-plus-sign"  ></i>
            Add Activity</button> 
        </li>
        <li>
            <div class="container">
                <form id="todo_form">
                    <div class="form-row align-items-center pl-1">
                        <div class="col-sm-5 my-2">
                            <input type="text" class="form-control" required id="input_activity" placeholder="Please fill your your todo list">
                        </div>
                        <div class="col-sm-2 my-1 pl-0 ml-2">
                            <input type="date" class="form-control" required id="input_date" placeholder="input date">
                        </div>   
                        <div class="col-sm-2 my-1 pl-0 ml-2">
                            <input type="time" class="form-control" required id="input_time" placeholder="input time">
                        </div>                                
                        <div class="col-auto my-1 pl-3 pt-0 pb-0">
                            <button type="submit" class="btn btn-secondary">Add</button>
                            <button class="btn btn-secondary">Cencel</button>
                        </div>
                    </div>
                </form>
            </div>
        </li> 
        `)

        $('#todo_form').submit(event => {
            event.preventDefault()        
            let name = $('#input_activity').val()
            let date = $('#input_date').val()
            let time = $('#input_time').val()
            let token = localStorage.getItem("token") // ambil token yang berisi email dan id
            $.ajax({
                url : `http://localhost:3000/todo`,
                method : 'POST',
                headers : {
                    token: localStorage.getItem('token')
                },
                data : {
                    name,
                    date : new Date(`${date} ${time}`),
                }
                
            })
            .done( data => {
                Swal.fire(
                    'Adding the todo list success!',                
                    'success'
                  )
                  let temp = new Date (data.date)
                  let now = new Date                 
                  if (temp.getFullYear() == now.getFullYear() && temp.getMonth() == now.getMonth() && temp.getDate() == now.getDate() ) {
                    $('#todo-container').prepend(
                        `<li class="list-group-item pb-4 pt-4"> 
                            <div class="glyphicon glyphicon-ok"></div> ${data.name}
                            <div class="glyphicon glyphicon glyphicon-time pl-5 pr-0"> ${new Date(data.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </div> 
                            <a class='delete' href="" ><div class="float-right glyphicon glyphicon-trash ml-3" id="${data._id}" ></div></a> 
                            <a class='delete' href="" ><div class="float-right glyphicon glyphicon-edit" id="${data._id}"></div></a> 
                        </li>`)   
                }      
            })
            .fail( err => {
                console.log(err)
                Swal.fire({
                    title: 'Ops...',
                    type: 'error',
                    text: err.responseJSON.msg
                })
            })
        })
        $('.glyphicon-trash').click(function (event) {            
            event.preventDefault()
            let todo_id = $(this).attr('id')                        
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then( function(result) {
                if (result.value) {
                    $.ajax({
                        method: 'DELETE',
                        url: `http://localhost:3000/todo/${todo_id}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(function(data) {
                        $(`#${todo_id}`).parents('li').hide() 
                        Swal.fire(
                            'Deleted!',
                            'Your Todo has been deleted.',
                            'success'
                        )                        
                    })
                    .fail(function(err) {
                        console.log(err)
                    })

                }
              })
        });
        
        $(`.glyphicon-edit`).click(function(event){
            event.preventDefault()
            let todo_id = $(this).attr('id') 
            $.ajax({
                url : `http://localhost:3000/todo/${todo_id}`,
                method : 'GET',                
                headers : {
                    token: localStorage.getItem('token')
                }
            })
            .then(function (todo) {                
                Swal.fire({
                    title: 'Update Data',
                    html:
                      `<label for="name">please input name</label>` +
                      `<input id="name" class="swal2-input" value= "${todo.name}">` +
                      `<label for="date">please input date</label>` +
                      `<input id="date" class="swal2-input" value= "${todo.date}">`,
                    focusConfirm: false,
                    preConfirm: () => {
                      return {
                        name : document.getElementById('name').value,
                        date : document.getElementById('date').value
                      }   
                    }
                  })
                  .then (function (input) {
                    $.ajax({
                        url : `http://localhost:3000/todo/${todo._id}`,
                        method : 'PUT',   
                        data : {
                            name : input.value.name,
                            date : input.value.date
                        },             
                        headers : {
                            token: localStorage.getItem('token')
                        },
                        
                    })
                    .done (function (data) {
                        Swal.fire(
                            'Updated!',
                            'Your Todo has been updated.',
                            'success'
                        )   
                        viewAll()
                        })
                      .fail (function(err) {
                        console.log(err)
                      })
                  })
                  
            })                      
        })
    })
}

function oneWeekTodolist(){

} 
function viewTodoToday(data) {    
    let token = localStorage.getItem("token") // ambil token yang berisi email dan id
    $.ajax({
        url : `http://localhost:3000/todo`,
        method : 'GET',
        headers : {
            token: localStorage.getItem('token')
        }
    })
    .then(todos => {
        if (todos.length === 0) {
            $('#todo-container').empty()    
            $('#todo-container').append(`
            <li class="list-group-item pt-5 pb-5" id="empty-todo">
                <div class="card" style="width: 70%; margin : 0px auto;">
                    <img src="./image/empty.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Todays Activity</h5>
                        <p class="card-text">It seems that you have no activity, do you want to add new todo list ?</p>
                        <button class="btn btn-secondary" id="add-button">
                            <i class="glyphicon glyphicon-plus-sign"  ></i>
                            Add Activity</button>
                    </div>
                </div>
            </li> 
            <li>
            <div class="container">
                <form id="todo_form">
                    <div class="form-row align-items-center pl-1">
                        <div class="col-sm-5 my-2">
                            <input type="text" class="form-control" required id="input_activity" placeholder="Please fill your your todo list">
                        </div>
                        <div class="col-sm-2 my-1 pl-0 ml-2">
                            <input type="date" class="form-control" required id="input_date" placeholder="input date">
                        </div>   
                        <div class="col-sm-2 my-1 pl-0 ml-2">
                            <input type="time" class="form-control" required id="input_time" placeholder="input time">
                        </div>                                
                        <div class="col-auto my-1 pl-3 pt-0 pb-0">
                            <button type="submit" class="btn btn-secondary">Add</button>
                            <button class="btn btn-secondary">Cencel</button>
                        </div>
                    </div>
                </form>
            </div>
        </li> `)        
        } else {
            $('#todo-container').empty()
            todos.forEach(todo => {
                $('#todo-container').append(
                `<li class="list-group-item pb-4 pt-4"> 
                    <div class="glyphicon glyphicon-ok"></div> ${todo.name}
                    <div class="glyphicon glyphicon glyphicon-time pl-5 pr-0"> ${new Date(todo.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </div> 
                    <a class='delete' href="" ><div class="float-right glyphicon glyphicon-trash ml-3" id="${todo._id}" ></div></a> 
                    <a class='delete' href="" ><div class="float-right glyphicon glyphicon-edit" id="${todo._id}"></div></a> 
                </li>`)
            });
            $('#todo-container').append(`
            <li <button class="btn btn-secondary" id="add-button">
                    <i class="glyphicon glyphicon-plus-sign"  ></i>
                Add Activity</button> 
            </li>
            <li>
                <div class="container">
                    <form id="todo_form">
                        <div class="form-row align-items-center pl-1">
                            <div class="col-sm-5 my-2">
                                <input type="text" class="form-control" required id="input_activity" placeholder="Please fill your your todo list">
                            </div>
                            <div class="col-sm-2 my-1 pl-0 ml-2">
                                <input type="date" class="form-control" required id="input_date" placeholder="input date">
                            </div>   
                            <div class="col-sm-2 my-1 pl-0 ml-2">
                                <input type="time" class="form-control" required id="input_time" placeholder="input time">
                            </div>                                
                            <div class="col-auto my-1 pl-3 pt-0 pb-0">
                                <button type="submit" class="btn btn-secondary">Add</button>
                                <button class="btn btn-secondary">Cencel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </li> 
            `)
        }
        $('#todo_form').submit(event => {
            event.preventDefault()        
            let name = $('#input_activity').val()
            let date = $('#input_date').val()
            let time = $('#input_time').val()
            let token = localStorage.getItem("token") // ambil token yang berisi email dan id
            $.ajax({
                url : `http://localhost:3000/todo`,
                method : 'POST',
                headers : {
                    token: localStorage.getItem('token')
                },
                data : {
                    name,
                    date : new Date(`${date} ${time}`),
                }
                
            })
            .done( data => {
                Swal.fire(
                    'Adding the todo list success!',                
                    'success'
                  )
                  let temp = new Date (data.date)
                  let now = new Date                 
                  if (temp.getFullYear() == now.getFullYear() && temp.getMonth() == now.getMonth() && temp.getDate() == now.getDate() ) {
                    $('#empty-todo').hide() 
                    $('#todo-container').prepend(
                        `<li class="list-group-item pb-4 pt-4"> 
                            <div class="glyphicon glyphicon-ok"></div> ${data.name}
                            <div class="glyphicon glyphicon glyphicon-time pl-5 pr-0"> ${new Date(data.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} </div> 
                            <a class='delete' href="" ><div class="float-right glyphicon glyphicon-trash ml-3" id="${data._id}" ></div></a> 
                            <a class='delete' href="" ><div class="float-right glyphicon glyphicon-edit" id="${data._id}"></div></a> 
                        </li>`) 
                  }                     
            })
            .fail( err => {
                Swal.fire({
                    title: 'Ops...',
                    type: 'error',
                    text: err.responseJSON.msg
                })
            })
        })
        $('.glyphicon-trash').click(function (event) {            
            event.preventDefault()
            let todo_id = $(this).attr('id')                        
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then( function(result) {
                if (result.value) {
                    $.ajax({
                        method: 'DELETE',
                        url: `http://localhost:3000/todo/${todo_id}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(function(data) {
                        $(`#${todo_id}`).parents('li').hide() 
                        Swal.fire(
                            'Deleted!',
                            'Your Todo has been deleted.',
                            'success'
                        )                        
                    })
                    .fail(function(err) {
                        console.log(err)
                    })

                }
              })
        });
        
        $(`.glyphicon-edit`).click(function(event){
            event.preventDefault()
            let todo_id = $(this).attr('id') 
            $.ajax({
                url : `http://localhost:3000/todo/${todo_id}`,
                method : 'GET',                
                headers : {
                    token: localStorage.getItem('token')
                }
            })
            .then(function (todo) {     
                console.log(todo)           
                Swal.fire({
                    title: 'Update Data',
                    html:
                      `<label for="name">please input name</label>` +
                      `<input id="name" class="swal2-input" value= "${todo.name}">` +
                      `<label for="date">please input date</label>` +
                      `<input id="date" class="swal2-input" value= "${todo.date}">`,
                    focusConfirm: false,
                    preConfirm: () => {
                      return {
                        name : document.getElementById('name').value,
                        date : document.getElementById('date').value
                      }   
                    }
                  })
                  .then (function (input) {
                    $.ajax({
                        url : `http://localhost:3000/todo/${todo._id}`,
                        method : 'PUT',   
                        data : {
                            name : input.value.name,
                            date : input.value.date
                        },             
                        headers : {
                            token: localStorage.getItem('token')
                        },
                        
                    })
                    .done (function (data) {
                        Swal.fire(
                            'Updated!',
                            'Your Todo has been updated.',
                            'success'
                        )   
                        $('#todo-container').empty()
                        viewTodoToday()
                        })
                      .fail (function(err) {
                        console.log(err)
                      })
                  })
                  
            })                      
        })
    })
}

// setting untuk google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(profile)
    $('#user-image').attr("src", profile.Paa);
    $('#user-name').empty()
    $('#user-name').append(`<li class="list-group-item pl-1" id="user-name">${profile.ig}</li>`)
    $('#user-email').empty()
    $('#user-email').append(`<li class="list-group-item pl-1" id="user-name">${profile.U3}</li>`)
    $.ajax({
        url : `http://localhost:3000/login-google`,
        method : "POST",
        data : {
            google_token : id_token
        }
        
    })
    .done( data => {
        localStorage.setItem("token", data.token)
        ceckStatus()    
    })
    .done (function() {
        viewTodoToday()
    })
    .fail(err=> {
        console.log(err)
    })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        ceckStatus()   
        localStorage.removeItem("token")
    console.log('User signed out.');
    });
}


// setting untuk facebook
function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
} 

function statusChangeCallback(response) {                
    if (response.status === 'connected') {                    
        FB.api('/me', 'GET', {fields: 'first_name,last_name,name,email,id,picture'}, function(response) {
            console.log(response);
            $('#user-image').attr("src", response.picture.data.url);
            $('#user-name').empty()
            $('#user-name').append(`<li class="list-group-item pl-1" id="user-name">${response.name}</li>`)
            $('#user-email').empty()
            $('#user-email').append(`<li class="list-group-item pl-1" id="user-name">${response.email}</li>`)
            $.ajax({
                url : `http://localhost:3000/login-facebook`,
                method : "POST",
                data : {
                    user : JSON.stringify(response)
                }
            })
            .done( data => {
                localStorage.setItem("token", data.token)                
                ceckStatus()    
            })
            .done (function() {
                viewTodoToday()
            })
            .fail(err=> {
                console.log(err)
            })
        });
    }  
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '2518083844949332',
    cookie     : true,
    xfbml      : true,
    version    : '{api-version}'
  });
    
  FB.AppEvents.logPageView();   
    
};      
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 function ceckStatus() {
    if(localStorage.getItem('token')){
        $('#main-page').show()
        // $('#register').hide()    
        $('#front-page').hide()
        // $('#login').hide()
        $('#logout').show() 
        $('#google').hide()
        $('#facebook').hide()
    } else {
        $('#register').show()
        $('#logout').hide()
        $('#google').show()
        $('#facebook').show()       
    } 
 }