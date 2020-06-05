$(document).ready((event)=>{
    if (!localStorage.getItem('token')) {
        $("#signoutG").hide()
        $(".nonlogged").show()
        $("g-signin2").show()
        $(".loggedMenu").hide()
        $(".profileImage").hide()
        $("#menu-right").hide()
        $('#addTodo').hide()
        $('#addTodolist').hide()
        $('#hideTodolist').hide()
        $(".listAllTodo").empty()
        button()
        login()
    } else {
        $("#signoutG").show()
        $('#EmailLogin').val('')
        $('#PasswordLogin').val('')
        $(".loginForm").hide();
        $(".nonlogged").hide()
        $("g-signin2").hide()
        $("#menu-right").hide()
        $(".loggedMenu").show()
        $(".profileImage").show()
        $('#addTodo').hide()
        $('#addTodolist').show()
        $('#hideTodolist').hide()
        button()
        addTodo()
        login()
        MyListTodoDefault()
    }
})

function login(){
    $("#signinG").click(function(event) {
        $(".loginForm").show('slow');
        $(".signupForm").hide('slow');
    })
    $("#signupG").click(function(event) {
        $(".loginForm").hide('slow');
        $(".signupForm").show('slow');
    })
}

function button(){
    $("#menu-left").click(function(event) {
        $("#wrapper").toggleClass("toggled");
        $("#menu-left").hide('slow')
        $("#menu-right").show('slow')
    });

    $("#menu-right").click(function(event) {
        $("#wrapper").toggleClass("toggled");
        $("#menu-right").hide('slow')
        $("#menu-left").show('slow')
    });
}

function addTodo(){
    $('#addTodolist').click(event =>{
        $('#addTodo').show('slow')
        $('#addTodolist').hide('slow')
        $('#hideTodolist').show('slow')
    })
    
    $('#hideTodolist').click(event =>{
        $('#addTodo').hide('slow')
        $('#addTodolist').show('slow')
        $('#hideTodolist').hide('slow')
    })
}

function MyListTodoDefault(){
    $(".listAllTodo").empty()
    $.ajax({
        url : `http://localhost:3000/todos/`,
        method : 'get',
        headers : {
            token : localStorage.getItem('token')
        },
        beforeSend : ()=>{ 
            swal.fire({
                title : 'Please Wait..',
                html : `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                onBeforeOpen : () =>{
                    swal.showLoading()
                }
            })
        }
    })
    .done(todos=>{
        todos.forEach(todo=>{
            $(".listAllTodo").append(`
                <div class="container-fluid mt-2" >
                    <div class="card text-center" style="background: linear-gradient(rgb(228, 169, 60),rgb(189, 137, 40));">
                        <div class="card-body">
                            <h2 class="card-title">${todo.title}</h2>
                            <hr>
                            <h6 class="card-text mt-4">${todo.description}</h6>
                            </div>
                        <hr>
                        <div class="ml-3 mr-3 text-center">
                            <div class="mr-auto mb-3">
                                <span>createdAt : ${new Date(todo.createdAt).toLocaleDateString()} </span>
                                <span class="ml-5">due_date : ${new Date(todo.due_date).toLocaleDateString()} </span>
                                <span class="ml-5">status : ${todo.status == false ? 'Uncomplete' : 'Complete'} </span>
                                <br>
                                <button type="button" class="btn btn-sm btn-primary mt-2" onclick="updateTodo(event,'${todo._id}')"><i class="fa fa-check-square-o" aria-hidden="true"></i> Update</button>       
                            </div>
                        </div>
                    <button type="button" class="btn btn-sm btn-danger" onclick="removeTodo(event,'${todo._id}')"><i class="fa fa-window-close" aria-hidden="true"></i> Remove</button>   
                    <button type="button" class="btn btn-md btn-success" onclick="bookmark(event,'${todo._id}')"><i class="fa fa-check-square-o" aria-hidden="true"></i> Bookmark</button>       
                    </div>
                </div>
            `)
        })
    })
    .fail((err)=>{
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: `<a href> ${err._message}</a>`
        })
    })
    .always(()=>{
        swal.close()
    })
}

function updateTodo(event,id){
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'get',
        headers : {
            token : localStorage.getItem('token')
        },
        beforeSend : ()=>{ 
            swal.fire({
                title : 'Please Wait..',
                html : `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                onBeforeOpen : () =>{
                    swal.showLoading()
                }
            })
        }
    })
    .done(todo=>{
        const { value: formValues } = Swal.fire({
            title: 'Update Todo',
            html:
                `<input id="swal-input1" value="${todo.title}" class="swal2-input">` +
                `<input id="swal-input2" value="${todo.description}" class="swal2-input">` +
                `<input id="swal-input3" value="${todo.status}" class="swal2-input">`,
                focusConfirm: false,
            preConfirm: () => {
                $.ajax({
                    url : `http://localhost:3000/todos/${id}`,
                    method : 'patch',
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        title : $('#swal-input1').val(),
                        description : $('#swal-input2').val(),
                        status : $('#swal-input3').val(),
                    },
                    beforeSend : ()=>{ 
                        swal.fire({
                            title : 'Please Wait..',
                            html : `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                            onBeforeOpen : () =>{
                                swal.showLoading()
                            }
                        })
                    }
                })
                .done(()=>{
                    MyListTodo(event)
                })
                .fail()
                .always()
            }
        })
    })
    .fail()
    .always()
}

function MyListTodo(event){
    $(".listAllTodo").empty()
    event.preventDefault()
    $.ajax({
        url : `http://localhost:3000/todos/`,
        method : 'get',
        headers : {
            token : localStorage.getItem('token')
        },
        beforeSend : ()=>{ 
            swal.fire({
                title : 'Please Wait..',
                html : `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                onBeforeOpen : () =>{
                    swal.showLoading()
                }
            })
        }
    })
    .done(todos=>{
        todos.forEach(todo=>{
            $(".listAllTodo").append(`
                <div class="container-fluid mt-2" >
                    <div class="card text-center" style="background: linear-gradient(rgb(228, 169, 60),rgb(189, 137, 40));">
                        <div class="card-body">
                            <h2 class="card-title">${todo.title}</h2>
                            <hr>
                            <h6 class="card-text">${todo.description}</h6>
                        </div>
                        <hr>
                        <div class="ml-3 mr-3 text-center">
                            <div class="mr-auto mb-3">
                                <span>createdAt : ${new Date(todo.createdAt).toLocaleDateString()} </span>
                                <span class="ml-5">due_date : ${new Date(todo.due_date).toLocaleDateString()} </span>
                                <span class="ml-5">status : ${todo.status == false ? 'Uncomplete' : 'Complete'} </span>                                
                                <br>
                                <button type="button" class="btn btn-sm btn-primary mt-2" onclick="updateTodo(event,'${todo._id}')"><i class="fa fa-check-square-o" aria-hidden="true"></i> Update</button>                                       
                            </div>
                        </div>
                    <button type="button" class="btn btn-sm btn-danger" onclick="removeTodo(event,'${todo._id}')"><i class="fa fa-window-close" aria-hidden="true"></i> Remove</button>   
                    <button type="button" class="btn btn-md btn-success" onclick="bookmark(event,'${todo._id}')"><i class="fa fa-check-square-o" aria-hidden="true"></i> Bookmark</button>       
                    
                    </div>
                </div>
            `)
        })
    })
    .fail((err)=>{
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: `<a href> ${err}</a>`
        })
    })
    .always(()=>{
        swal.close()
    })
}

function removeTodo(event,id){
    $(".listAllTodo").empty()
    event.preventDefault()
    $('.listAllTodo').empty()
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        type : 'DELETE',
        headers : {
            token : localStorage.getItem('token')
        },
        beforeSend : ()=>{ 
            swal.fire({
                title : 'Please Wait..',
                html : `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                onBeforeOpen : () =>{
                    swal.showLoading()
                }
            })
        }
    })
    .done(()=>{
        MyListTodo(event)
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Create Success',
            showConfirmButton: false,
            timer: 1500
        })
    })
    .fail((err)=>{
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: `<a href> ${err}</a>`
        })
    })
    .always(()=>{
        swal.close()
    })
}

function addMyTodo(event){
    $(".listAllTodo").empty()
    event.preventDefault()
    $('.listAllTodo').empty()
    $.ajax({
        url : `http://localhost:3000/todos/`,
        method : 'post',
        data : {
            title : $('#titleTodo').val(),
            description : $('#descriptionTodo').val(),
            due_date : $('#dateInput').val()
        },
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{
        MyListTodo(event)
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Create Success',
            showConfirmButton: false,
            timer: 1500
        })
    })
    .fail((err)=>{
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: `<a href> ${err}</a>`,
        })
    })
    .always(()=>{
        swal.close()
    })
}

function bookmark(event,id){
    
}

function update(event,id){
    
}

function onSignIn(googleUser) {
    const { id_token } = googleUser.getAuthResponse();
    $.ajax({
        url : `http://localhost:3000/user/googlesignin`,
        method : 'post',
        data : { id_token }
    })
    .done(token=>{
        localStorage.setItem('token',token)
        $('#EmailLogin').val('')
        $('#PasswordLogin').val('')
        $("#signoutG").show('slow')
        $(".loginForm").hide('slow');
        $(".nonlogged").hide('slow')
        $("g-signin2").hide('slow')
        $(".loggedMenu").show('slow')
        $(".profileImage").show('slow')
        $('#addTodolist').show('slow')
        button()
        addTodo()
        login()
    })
    .fail()
    .always()
}

function signUp(event){
    event.preventDefault()
    $.ajax({
        url : `http://localhost:3000/user/signup`,
        method : 'post',
        data : {
            email : $('#email').val(),
            password : $('#password').val()
        }
    })
    .done(user=>{
        $(".signupForm").show('slow');
        $(".loginForm").show('slow');
    })
    .fail(err)
    .always()
}

function loginAccount(event){
    event.preventDefault()
    $.ajax({
        url : `http://localhost:3000/user/signin`,
        method : 'post',
        data : {
            email : $('#EmailLogin').val(),
            password : $('#PasswordLogin').val()
        },
    })
    .done(token=>{
        localStorage.setItem('token',token)
        $('#EmailLogin').val('')
        $('#PasswordLogin').val('')
        $("#signoutG").show('slow')
        $(".loginForm").hide('slow');
        $(".nonlogged").hide('slow')
        $("g-signin2").hide('slow')
        $(".loggedMenu").show('slow')
        $(".profileImage").show('slow')
        $('#addTodolist').show('slow')
        button()
        addTodo()
        login()
    })
    .fail(err)
    .always()
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    $(".listAllTodo").empty('slow')
    $("#signoutG").hide('slow')
    $(".nonlogged").show('slow')
    $("g-signin2").show('slow')
    $(".loggedMenu").hide('slow')
    $(".profileImage").hide('slow')
    $("#menu-right").hide('slow')
    $('#addTodo').hide('slow')
    $('#addTodolist').hide('slow')
    $('#hideTodolist').hide('slow')
    $(".loginForm").show('slow');    
    button()
    login()
}