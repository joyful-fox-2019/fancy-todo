$(document).ready(function(){
    console.log('document is ready')
    let tokenExist = localStorage.getItem('token');
    if(tokenExist){
        $('#main-page').show()
        $('#user-name').append(`
        <h1>Welcome, ${localStorage.getItem('name')}</h1>
        `)
        currentUserTodo()
        $('#home-page').hide()
        $('#modal-editTodo').hide()
    }else{
        $('#home-page').show()
        $('#main-page').hide()
        $('#modal-editTodo').hide()
        $('#login').hide()
    }
    
    $('#have-account').click(function(event){
        event.preventDefault()
        $('#register').hide('slow')
        $('#login').show('slow')
    })
    
    $('#no-account').click(function(event){
        event.preventDefault()
        $('#login').hide('slow')
        $('#register').show('slow')
    })

    login()
    register()
    createTodo()
    showTodo(event)
    getPendingTodo(event)
    getCompleteTodo(event)
})

function register(){
    $('#submit-register').click(function(){
        let name = $('#nameReg').val()
        let email = $('#emailReg').val()
        let password = $('#passwordReg').val()
        $('#register-form').submit(function(event){
            event.preventDefault()
            $.ajax({
                url: 'http://localhost:3000/users/register',
                method: 'POST',
                data:{
                    name, email, password
                }
            })
            .done(response => {
                Swal.fire('Success !', 'Your account is successfully register','success')
                $('#nameReg').val('')
                $('#emailReg').val('')
                $('#passwordReg').val('')
                $('#home-page').show()
                $('#login').show()
                $('#register').hide()
                console.log('success', response)
            })
            .fail(err => {
                Swal.fire('Error', err.responseJSON.msg, 'error')
                console.log('error', err)
            })
        })
    })
}

function login(){
    $('#submit-login').click(function(){
        let email = $('#emailLog').val()
        let password = $('#passwordLog').val()
        $('#login-form').submit(function(event){
            event.preventDefault()
            $.ajax({
                url: 'http://localhost:3000/users/login',
                method: 'POST',
                data:{
                    email, password
                }
            })
            .done(response => {
                localStorage.setItem('token', response.jwt_token)
                localStorage.setItem('name', response.user.name)
                Swal.fire('Success', 'Login Successfull', 'success')
                $('#home-page').hide('slow')
                $('#modal-editTodo').hide()
                $('#user-name').append(`
                <h1>Welcome, ${localStorage.getItem('name')}</h1>
                `)
                $('#main-page').show('slow')
                currentUserTodo()
            })
            .fail(err => {
                Swal.fire('Error', err.responseJSON.msg, 'error')
                console.log(err)
            })
        })
    })
}

function showTodo(event){
        event.preventDefault()
        let time = 3;
        let showLoading = setInterval(()=>{
            time--;
            if(time > 0){
                Swal.showLoading()
            }else{
                clearInterval(showLoading)
                Swal.close()
            }
        },250)
        $.ajax({
            url: 'http://localhost:3000/todo',
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(response => {
            $('#insert-todo').empty()
            for(let i = 0; i < response.length; i++){
                let date = stringDate(response[i].dueDate)
                if(response[i].status === false){
                    $('#insert-todo').append(`
                    <tr>
                    <td>${i+1}</td>
                    <td>${response[i].title}</td>
                    <td>${response[i].description}</td>
                    <td>${date}</td>
                    <td>Pending</td>
                    <td><a href="" id="edit" data-index="${response[i]._id}" onclick="editTodo(event)">Edit</a>  |  <a href="" id="delete" data-index="${response[i]._id}" onclick="deleteTodo(event)">Delete</a></td>
                    </tr>
                `)
                }else{
                    $('#insert-todo').append(`
                    <tr>
                    <td>${i+1}</td>
                    <td>${response[i].title}</td>
                    <td>${response[i].description}</td>
                    <td>${date}</td>
                    <td>Complete</td>
                    <td><a href="" id="edit" data-index="${response[i]._id}" onclick="editTodo(event)">Edit</a>  |  <a href="" id="delete" data-index="${response[i]._id}" onclick="deleteTodo(event)">Delete</a></td>
                    </tr>
                    `)
                }
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function createTodo(){
    $('#submit-todo').click(function(){
        let title = $('#title').val()
        let description = $('#desc').val()
        let due_date = $('#due_date').val()
        $('#form-todo').submit(function(event){
            event.preventDefault()
            $.ajax({
                url: 'http://localhost:3000/todo',
                method: 'POST',
                data:{
                    title, description, due_date
                },
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .done(response => {
                $('#title').val('')
                $('#desc').val('')
                $('#due_date').val('')
                $('#exampleModalCenter').hide()
                $('.modal-backdrop').hide()
                $('#insert-todo').empty()
                showTodo(event)
                Swal.fire('Done', 'Add todo Success!', 'success')
            })
            .fail(err => {
                console.log('masuk error')
                console.log(err)
            })
        })
    })
}

function currentUserTodo(){
    $.ajax({
        url: 'http://localhost:3000/todo',
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(response => {
        $('#insert-todo').empty()
        for(let i = 0; i < response.length; i++){
            let date = stringDate(response[i].dueDate)
            if(response[i].status === false){
                $('#insert-todo').append(`
                <tr>
                <td>${i+1}</td>
                <td>${response[i].title}</td>
                <td>${response[i].description}</td>
                <td>${date}</td>
                <td>Pending</td>
                <td><a href="" id="edit" data-index="${response[i]._id}" onclick="editTodo(event)">Edit</a>  |  <a href="" id="delete" data-index="${response[i]._id}" onclick="deleteTodo(event)">Delete</a></td>
                </tr>
            `)
            }else{
                $('#insert-todo').append(`
                <tr>
                <td>${i+1}</td>
                <td>${response[i].title}</td>
                <td>${response[i].description}</td>
                <td>${date}</td>
                <td>Complete</td>
                <td><a href="" id="edit" data-index="${response[i]._id}" onclick="editTodo(event)">Edit</a>  |  <a href="" id="delete" data-index="${response[i]._id}" onclick="deleteTodo(event)">Delete</a></td>
                </tr>
                `)
            }
        }
    })
    .fail(err => {
        console.log(err)
    })
}

function getPendingTodo(event){
    event.preventDefault()
    let time = 3;
    let showLoading = setInterval(()=>{
        time--;
        if(time > 0){
            Swal.showLoading()
        }else{
            clearInterval(showLoading)
            Swal.close()
        }
    },250)
    $.ajax({
        url: 'http://localhost:3000/todo/pending',
        method: 'GET',
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response=>{
        $('#insert-todo').empty()
        for(let i = 0; i < response.length; i++){
            let date = stringDate(response[i].dueDate)
            $('#insert-todo').append(`
                <tr>
                <td>${i+1}</td>
                <td>${response[i].title}</td>
                <td>${response[i].description}</td>
                <td>${date}</td>
                <td>Pending</td>
                <td><a href="" id="edit" data-index="${response[i]._id}" onclick="editTodo(event)">Edit</a>  |  <a href="" id="delete" data-index="${response[i]._id}" onclick="deleteTodo(event)">Delete</a></td>
                </tr>
            `)
        }
    })
    .fail(err=>{
        console.log(err)
    })
}

function getCompleteTodo(event){
    event.preventDefault()
    let time = 3;
    let showLoading = setInterval(()=>{
        time--;
        if(time > 0){
            Swal.showLoading()
        }else{
            clearInterval(showLoading)
            Swal.close()
        }
    },250)
    $.ajax({
        url: 'http://localhost:3000/todo/complete',
        method: 'GET',
        headers:{
            token: localStorage.getItem('token')
        }
    })
    .done(response=>{
        $('#insert-todo').empty()
        for(let i = 0; i < response.length; i++){
            let date = stringDate(response[i].dueDate)
            $('#insert-todo').append(`
                <tr>
                <td>${i+1}</td>
                <td>${response[i].title}</td>
                <td>${response[i].description}</td>
                <td>${date}</td>
                <td>Complete</td>
                <td><a href="" id="edit" data-index="${response[i]._id}" onclick="editTodo(event)">Edit</a>  |  <a href="" id="delete" data-index="${response[i]._id}" onclick="deleteTodo(event)">Delete</a></td>
                </tr>
            `)
        }
    })
    .fail(err=>{
        console.log(err)
    })
}

function deleteTodo(event){
    event.preventDefault()
    $('[id^="delete"]').click(function(){
        let id = $(this).data('index');
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
                $.ajax({
                    url: `http://localhost:3000/todo/${id}`,
                    method: 'DELETE',
                    headers:{
                        token: localStorage.getItem('token')
                    }
                })
                .done(response=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    showTodo(event)
                    console.log(response)
                })
                .fail(err=>{
                    console.log(err)
                })
            }
        })
    })
}

function editTodo(event){
    event.preventDefault()
    $('[id^="edit"]').click(function(){
        let id = $(this).data('index');
        console.log(id)
        $.ajax({
            url: `http://localhost:3000/todo/${id}`,
            method: 'GET',
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .done(response=>{
            $('#edit-id').val(`${response[0]._id}`)
            $('#edit-title').val(`${response[0].title}`)
            $('#edit-desc').val(`${response[0].description}`)
            $('#edit-due_date').val(`${response[0].dueDate}`)
            $('#modal-editTodo').show('slow')
            $('#home-page').hide('slow')
            $('#main-page').hide('slow')
        })
        .fail(err=>{
            console.log(err)
        })
    })
}

function backToMainPage(){
    $('#modal-editTodo').hide('slow')
    $('#main-page').show('slow')
}

function markComplete(){
    $('#submit-final-editTodo').click(function(){
        let id = $('#edit-id').val()
        let title = $('#edit-title').val()
        let description = $("#edit-desc").val()
        let due_date = $('#edit-due_date').val()
        $('#edit-form-todo').submit(function(event){
            event.preventDefault()
            $.ajax({
                url: `http://localhost:3000/todo/${id}`,
                method: 'PUT',
                data:{
                    title : title,
                    description: description,
                    dueDate: due_date,
                    status: true
                },
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .done(response=>{
                console.log(response)
            })
            .fail(err=>{
                console.log(err)
            })
        })
    })
}

function submitEditTodo(){
    console.log('masuk ke submit edit todo !!!!')
    $('#submit-edit-todo').click(function(event){
        event.preventDefault()
        let id = $('#edit-id').val()
        let title = $('#edit-title').val()
        let description = $("#edit-desc").val()
        let due_date = $('#edit-due_date').val()
        console.log(id,title,description,due_date)
        $('#edit-form-todo').submit(function(){
            $.ajax({
                url: `http://localhost:3000/todo/${id}`,
                method: 'PUT',
                data:{
                    title : title,
                    description: description,
                    dueDate: due_date,
                    status: false
                },
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .done(response=>{
                console.log(resonse)
            })
            .fail(err=>{
                console.log(err)
            })
        })
    })
}