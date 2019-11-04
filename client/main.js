
$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('#opening-page').hide()
        $('#signout-button').show()
        $('#welcome-page').show()
        generateTodo()
         $('#todolist').show()

    }else{
        $('#opening-page').show()
        $('#signout-button').hide()
        $('#welcome-page').hide()
    }
})

function generateTodo(){
   
    Swal.showLoading({
        timer: 3000
    })
    console.log('tesss')
    $.ajax({
        url : 'http://localhost:3000/todos/',
        method : 'get',
        headers : {
             token : localStorage.getItem("token") 
        }
    })
    .done((todos)=>{
        
        // console.log('testt',todos[0],'dari todos')
        // console.log(todos)
        for(let i = 0 ; i < todos.length ; i++){
            if(todos[i].status === true){
                let html = ''
                html += `
                
                <div class = "container" style="display: flex; flex-direction: column;justify-content: center;">
                <div class="row">
                        <div class="shadow card-body" style="width:80%; margin:20px ;padding: 4%;font-weight: 900; background: linear-gradient(93deg, rgba(45,122,205,1) 0%, rgba(97,232,255,1) 100%); border-radius: 25px;">
                            
                            <h3 class="display-4" style="color: white;">${todos[i].name}</h3>
                            <br>
                            <h5 style="color:white; font-weight: 100 ;font-style:italic"> due-date : ${todos[i].due_date.slice(0,10)}</h5>
                            <h5 class="card-title" style="color: white;">${todos[i].description}</h5>
                            
                            <button id="done" onclick="statusUndone('${todos[i]._id}')" type="button" class="btn btn-outline-light" value="Submit" style="border-radius: 25px; box-shadow: none;"><i class="fas fa-check" style="margin-right:5px;"></i>undone</button>
                            <button id="deleteTodo" onclick="deleteConfirmation('${todos[i]._id}')" type="button" class="btn btn-outline-light" value="Submit" style="border-radius: 25px; box-shadow: none;"><i class="fas fa-edit" style="margin-right:5px;""></i>delete</button>
                            <button id="updateTodo" onclick="toogleUpdate('${todos[i]._id}')" type="button" class="btn btn-outline-light" style="border-radius: 25px; box-shadow: none;"><i class="fas fa-edit" style="margin-right:5px;""></i>update</button>
                                   
                        </div>
                </div>  
                
            
                `
                $(`#todolist`).append(html)
            }else{
                // console.log(todos[i])
                let html = ''
                html += `
    
                <div class = "container" style="display: flex; flex-direction: column;justify-content: center;">
                <div class="row">
                <div class="shadow card-body" style="width:80%; margin:20px ;padding: 4%;font-weight: 900; background: linear-gradient(93deg, rgba(205,45,45,1) 0%, rgba(255,170,97,1) 100%); border-radius: 25px;">
                            
                            <h3 class="display-4"  style="color: white; ">${todos[i].name}</h3>
                            <br>
                            <h5 style="color:white; font-weight: 100 ;font-style:italic"> due-date : ${todos[i].due_date.slice(0,10)}</h5>
                            <h5 class="card-title" style="color: white;">${todos[i].description}</h5>
                            
                            <button id="on-progress" onclick="statusDone('${todos[i]._id}')" type="button" class="btn btn-outline-light" style="border-radius: 25px; box-shadow: none;"><i class="fas fa-check" style="margin-right:5px;"></i>done</button>
                            <button id="deleteTodo" onclick="deleteConfirmation('${todos[i]._id}')" type="button" class="btn btn-outline-light" style="border-radius: 25px; box-shadow: none;"><i class="fas fa-edit" style="margin-right:5px;""></i>delete</button>
                            <button id="updateTodo" onclick="toogleUpdate('${todos[i]._id}')" type="button" class="btn btn-outline-light" style="border-radius: 25px; box-shadow: none;"><i class="fas fa-edit" style="margin-right:5px;""></i>update</button>
                           
                        </div>
                </div>  
               
                `
                $(`#todolist`).append(html)
            }
        }
        console.log(todos)
    })
    .fail((err)=>{
        console.log(err)
    })
    .always(()=>{
        Swal.close()
    })
}

function deleteConfirmation(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          deleteTodo(id)
        }
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
            $('#todolist').empty()
            generateTodo()
            console.log('successfully deleted')
        })
        .fail((err)=>{
            console.log(err)
        })
    }

function toogleUpdate(id){
    $('#modalUpdateForm').modal('show')
    let userid = $("#todo-id").val(id)
    console.log(userid,'ini togleeee')
    // let name = $("#update-name").val()
    // let description = $("#update-description").val()
    // let due_date = $("#update-description").val()
    // console.log(userid,name,description,due_date,'dari toogle')
    // updateTodo(userid,name,description,due_date)
}


$("#submitUpdate").on("click",(err)=>{
    console.log('ini submittt')
    let userid = $("#todo-id").val()
    let name = $("#update-name").val()
    let description = $("#update-description").val()
    let due_date = $("#update-description").val()
    updateTodo(userid,name,description,due_date)
})


    



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
        Swal.fire(
            'Updated',
            'todo succesfully updated!',
            'success'
          )
        $('#todolist').empty()
        $('#welcome-page').show()
        generateTodo()
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
        Swal.fire(
            'Updated',
            'todo succesfully updated!',
            'success'
          )
        $('#todolist').empty()
        $('#welcome-page').show()
        generateTodo()
        console.log('successfully updated')
    })
    .fail((err)=>{
        console.log(err)
    })
}


$('#addTodo-submit').on('click',(e)=>{
    e.preventDefault()
    let name = $(`#todo-name`).val()
    let description = $(`#todo-description`).val()
    let due_date = $(`#todo-due_date`).val()
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

    .done((todo)=>{
        Swal.fire(
            'Created!',
            `todo : ${name} has been added to your todo list`,
            'success'
          )
        $('#todolist').empty()
        $('#welcome-page').show()
        generateTodo()
        $('#todolist').show()
        Swal.fire(
            'Success!',
            'To-do has been added!',
            'success'
          )
        console.log(todo,'dari todo')
    })
}




function updateTodo(id,name,description,due_date){
    // console.log(name,description,due_date)
    console.log(id,'ini dari update')
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'put',
        data : {
            name : name,
            description : description,
            due_date : due_date
        },
        headers : {
            token : localStorage.getItem("token") 
        }
    })
    .done((todo)=>{
        $('#todolist').empty()

        generateTodo()
        console.log(todo,'masuk dari ajax')
    })
    .fail((err)=>{
        console.log(err)
    })
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    //   console.log('User signed out.');
      localStorage.removeItem('token')
      $('#welcome-page').hide()
    });
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    const token = localStorage.getItem('token')
    // console.log(id_token)

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
            $('#welcome-page').show()
            $('#opening-page').hide()
            $('#login-page').hide()
            $('#signout-button').show()
            
            generateTodo()
        })
        .fail(err=>{
            console.log(err)
        })
    }
}




function signin(username,password){
    // event.preventDefault()
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
            username : username,
            password : password
        }
    })
    .done((token) => {
        $('#welcome-page').show()
        $('#opening-page').hide()
        $('#login-page').hide()
        $('#signout-button').show()
        generateTodo()

        localStorage.setItem("token",token)
    })
    .fail((err)=>{
        console.log(err)
    })
}

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
        
        localStorage.setItem("token",token)
        // pakai sweetalert
    })
    .fail((err)=>{
        console.log(err)
    })
}




// $('#login-submit').click(function(){

//     // e.preventDefault()
//     let username = $(`#usernameLogin`).val()
//     let password = $('#passwordLogin').val()
//     // console.log(username,password)
//     signin(username,password)
// })



$('#login-button').click((e)=>{
    e.preventDefault()
    let username = $(`#usernameLogin`).val()
    let password = $('#passwordLogin').val()
    console.log(username,password,'darii login button')
    signin(username,password)
    $('#opening-page').hide()
    $('#signout-button').show()
})

$('#google-singin').click((e)=>{
    console.log('googleeeee')
    e.preventDefault()
    $('#opening-page').hide()
    $('#signout-button').show()
})

$('#register-form').click((e)=>{
    e.preventDefault()
    $('#register-page').show()
    $('#login-page').hide()
})

$('#register-button').click((e)=>{
    e.preventDefault()
    let username = $(`#usernameRegister`).val()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    register(username,email,password)
    $('#register-page').hide()
    $('#login-page').show()
})

$('#signout-button').click((e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    $('#opening-page').show()
    $('#signout-button').hide()

})

$(".findAll").click((e)=>{
    e.preventDefault()
    generateTodo()
})

$('#done').click((e)=>{
    console.log('jalan ga sih')
    e.preventDefault()
    generateTodo()
    $('#todolist').show()
    
})

$('#on-progress').on("click",function(event){
    console.log('jalan ga sih')
    event.preventDefault()
    generateTodo()
    $('#todolist').show()
    
})