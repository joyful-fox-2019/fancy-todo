$(document).ready( () => {
    //$('#front-page').hide()
    $('#register').show()    
    $('#main-page').hide()
    $('#login').hide() 
    $('#to_login').click(function(event) {
        event.preventDefault()
        $('#register').hide() 
        $('#login').show() 
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
            // $('#email').val('')
            // $('#password').val('')            
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
            $('#main-page').show()
            $('#front-page').hide()  
        })
        .fail( err => {
            console.log(err)
            Swal.fire({
                title: 'error',
                type: 'error',
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
        console.log(new Date(`${date} ${time}`))
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
                title: 'error',
                type: 'error',
                text: err.responseJSON.msg
            })
        })
    })

    $('#today-list').click(function(event){        
        event.preventDefault()
        console.log('apa')
        viewTodoToday()
    })

    $('#all-list').click(function(event){        
        event.preventDefault()
        console.log('apa')
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
            $('#empty-todo').show()
            return
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
                      console.log(input.value.name)
                      console.log(todo_id,'ini')
                    $.ajax({
                        url : `http://localhost:3000/todo/${todo_id}`,
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
        console.log(todos.length)
        if (todos.length === 0) {
            $('#todo-container').empty()            
            $('#empty-todo').show()
            return
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
                      console.log(input.value.name)
                    $.ajax({
                        url : `http://localhost:3000/todo/${todo_id}`,
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
    $.ajax({
        url : `http://localhost:3000/login-google`,
        method : "POST",
        data : {
            google_token : id_token
        }
    })
    .done( data => {
        localStorage.setItem("token", data.token)
        $('#user-image').attr("src", "https://media.nesta.org.uk/images/Predictions-2019_Twitter_02.width-1200.png");
        $('#main-page').show()
        $('#front-page').hide()
    })
    .done (function() {
        viewTodoToday()
    })
    .fail(err=> {
        console.log(err)
    })
}
function signOut() {
    console.log('masuk')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('#register').show()    
        $('#main-page').hide()
        $('#login').hide() 
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
            console.log(response.email);
            $.ajax({
                url : `http://localhost:3000/login-facebook`,
                method : "POST",
                data : {
                    user : JSON.stringify(response)
                }
            })
            .done( data => {
                localStorage.setItem("token", data.token)
                $('#user-image').attr("src", "https://media.nesta.org.uk/images/Predictions-2019_Twitter_02.width-1200.png");
                $('#main-page').show()
                $('#front-page').hide()
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

 