
$(document).ready(function(){
    if(localStorage.getItem('token')){
         generateTodo()
    }
})



function generateTodo(){
    // console.log('tesss')
    $.ajax({
        url : 'http://localhost:3000/todos/',
        method : 'get',
        headers : {
             token : localStorage.getItem("token") 
        }
    })
    .done((todos)=>{
        // console.log('testt',todos[0],'dari todos')
        for(let i = 0 ; i < todos.length ; i++){
            if(todos[i].status === true){
                let html = ''
                html += `
                <div class="jumbotron jumbotron-fluid">
                <div class="container">
                <h2 class="display-4">${todos[i].name}</h2>
                <p class="lead">${todos[i].description}</p>
                </div>
                </div>
                
                <button id = on-progress onclick="statusUndone('${todos[i]._id}')">on progress</button>
                <button id = done type="button" onclick="deleteTodo('${todos[i]._id}')">delete</button>

                <h2>update form</h2>
 
                <form id = "updateTodo">
                    name :<br>
                <input id = "update-name" type="text" placeholder="name">
                <br>
                    description :<br>
                <input id = "update-description" type="text"  placeholder="description">
                <br>
                    due-date :<br>
                <input id = "update-due_date" type="text" placeholder="yyyy-mm-dd">
                <br>
                <br>
                <button id = on-progress onclick="updateTodo('${todos[i]._id}')">on progress</button>
                </form> 
                
                `
                $(`#todolist`).append(html)
            }else{
                let html = ''
                html += `
                <div class="jumbotron jumbotron-fluid">
                <div class="container">
                <h2 class="display-4" style="color:red">${todos[i].name}</h2>
                <p class="lead">${todos[i].description}</p>
                </div>
                </div>
                
                <button id = on-progress onclick="statusDone('${todos[i]._id}')">done</button>
                <button id = done type="button" onclick="deleteTodo('${todos[i]._id}')">delete</button>
                `
                $(`#todolist`).append(html)
            }
        }
    })
    .fail((err)=>{
        console.log(err)
    })
}


function deleteTodo(id){

    // console.log(id)
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'delete',
            headers : {
                token : localStorage.getItem("token") 
            }   
        })
        .done(_ =>{
            console.log('successfully deleted')
        })
        .fail((err)=>{
            console.log(err)
        })
    }
        


function statusDone(id){
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'patch',
        headers : {
            status : true,
             token : localStorage.getItem("token") 
        }
    })
    .done(_=>{
        console.log('successfully updated')
    })
    .fail((err)=>{
        console.log(err)
    })
}

function statusUndone(id){
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'patch',
        headers : {
             status : false,
             token : localStorage.getItem("token") 
        }
    })
    .done(_=>{
        console.log('successfully updated')
    })
    .fail((err)=>{
        console.log(err)
    })
}


$('#createTodo').on('submit',(e)=>{
    e.preventDefault()
    let name = $(`#todo-name`).val()
    let description = $(`#todo-description`).val()
    let due_date = $(`#todo-due_date`).val()
    // console.log(username,password)
    create(name,description,due_date)
})

function create(name,description,due_date){
    $.ajax({
        url : `http://localhost:3000/todos/`,
        method : 'post',
        data : {
            name : name,
            description : description,
            due_date : due_date
        },
        headers : {
             token : localStorage.getItem("token") 
        }
    })
}


// $('#updateTodo').on('submit',(e)=>{
//     e.preventDefault()
//     let name = $(`#todo-name`).val()
//     let description = $(`#todo-description`).val()
//     let due_date = $(`#todo-due_date`).val()
//     // console.log(username,password)
//     update(name,description,due_date)
// })

function updateTodo(id){
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'put',
        data : {
            name : $(`#todo-name`).val(),
            description : $(`#todo-description`).val(),
            due_date : $(`#todo-due_date`).val()
        },
        headers : {
             token : localStorage.getItem("token") 
        }
    })
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('token')
    });
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    const token = localStorage.getItem('token')

    if(!token){
        $.ajax({
            url : `http://localhost:3000/users/google`,
            method : 'post',
            data : {
                id_token
            }
        })
        .done((token)=>{
            localStorage.setItem('token', token)
        })
        .fail(err=>{
            console.log(err)
        })
    }
}

$('#login').on('submit',(e)=>{
    e.preventDefault()
    let username = $(`#usernameLogin`).val()
    let password = $('#passwordLogin').val()
    // console.log(username,password)
    signin(username,password)
})

function signin(username,password){
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
            username : username,
            password : password
        }
    })
    .done((token) => {
        console.log(token)
        localStorage.setItem("token",token)
    })
    .fail((err)=>{
        console.log(err)
    })
}



$('#register').on('submit',(e)=>{
    e.preventDefault()
    let username = $(`#usernameRegister`).val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    console.log(username,email,password)
    register(username,email,password)
})

function register(username,email,password){
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
            username : username,
            email : email,
            password : password
        }
    })
    .done(user => {
        console.log(user)
        console.log(`successfully created`)
        // localStorage.setItem("token",token)
        //pakai sweetalert
    })
    .fail((err)=>{
        console.log(err)
    })
}
