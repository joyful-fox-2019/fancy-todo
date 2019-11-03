
$(document).ready(function(){
    console.log("SIAP")
    
    //harus di refresh, token baru terbaca setelah itu
    if(localStorage.getItem('token')){
        console.log("UDAH login")
        isLogin()
        $(`#signoutbtn`).show()
        $(`#signinbtn`).hide()
        $(`#user-information`).empty()
        $(`#user-information`).append(
            `<h5><b>Hello, ${localStorage.getItem('email')}</b></h5>
            `
        )
        $(`#groupContent`).show()
    }else{
        notLogin()
    }    
    
    
})

function isLogin(){
    $('#opening').hide()
    $('#todoPage').show()
    $('#groupPage').hide()
    $('#holidayPage').hide()
    $(`#user-todo-list`).show()
    $(`#user-done-list`).show()
    $(`#user-date-list`).show()
    getTodolist()
    getDoneTodolist()
    getHoliday()
    getGroup()
}

function notLogin(){
    $('#opening').show()
    $('#todoPage').hide()
    $('#groupPage').hide()
    $('#holidayPage').hide()
    $(`#user-todo-list`).hide()
    $(`#user-done-list`).hide()
    $(`#user-date-list`).hide()
    $(`#signoutbtn`).hide()
    $(`#signinbtn`).show()
    $(`#groupContent`).hide()
    $(`#content-project`).hide()
    $(`#user-information`).empty()
    $('.listedGroup').empty()
}

function showGroup(){
    $(`#content-group`).show()
    $(`#content-user`).hide()
}

function clearLogin(){
    $('.errLogin').empty()
    $('.successLogin').empty()
    $('.successRegis').empty()
    $('.errRegis').empty()
}

// register dan login

$('#register').submit(e => {
    e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/register`,
        data: {
            email: `${$("#regemail").val()}`,
            password: `${$("#regpass").val()}`
        }
    })
        .done(token => {
            $('.errRegis').empty()
            $("#regemail").val('')
            $("#regpass").val('')
            $('.successRegis').append(`<p style="color:green;">Successfully Registered</p>`)
            localStorage.setItem('token', token)
            
        setTimeout(function(){
            $('#modalForm').modal('hide')
        }, 2000);

        })
        .fail(err=>{
            $('.errRegis').empty()
            $('.errRegis').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

$('#login').submit(function(e){
    e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/login`,
        data: {
            email: `${$("#logname").val()}`,
            password: `${$("#logpass").val()}`
        }
    })
        .done((payload)=> {
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            let data = `${$("#logname").val()}`
            $("#logpass").val('')
            $("#logname").val('')
            localStorage.setItem('token', payload.token)
            localStorage.setItem('email', payload.email)
            isLogin()
            $(`#signinbtn`).hide()
            $(`#signoutbtn`).show()
            $(`#groupContent`).show()
            $(`#user-information`).show()
            $(`#user-information`).append(
                    `
                    <h5><b>Hello ${data}</b></h5>
                    `
            )
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 2000);

        })
        .fail(err=>{
            $('.errLogin').empty()
            $('.errLogin').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})


//google sign

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/googleSign',
        method: 'post',
        data:{
            id_token
        }
    })
        .done(({token}) => {
            localStorage.setItem('token', token)
            localStorage.setItem('email', profile.getEmail())
            isLogin()
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            $(`#signinbtn`).hide()
            $(`#signoutbtn`).show()

            $(`#user-information`).empty()
            $(`#user-information`).append(
                `<h5><b>Hello, ${profile.getEmail()}</b></h5>`
            )
            getTodolist()
            getDoneTodolist()
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 3000);
        })
}

//Todo here

//generate user todo's



function getTodolist(){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/todos`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data) {
        console.log(data, "ini datanya")
        let arrNotDone = []
        data.forEach(function(todo){
            if(todo.status===false){
                arrNotDone.push(todo)
            }
        })
        if(arrNotDone.length === 0){
            $(`#user-todo`).empty()
            $(`#user-todo`).append(
             `   <div style="height: 400px; background-color: grey" class="card d-flex justify-content-center" style="width: 25rem;">
                     <div class="p-5">
                         <h4 class="card-title d-flex justify-content-center">No Todo's Have Been Created !</h4>
                         <h5 class="card-title d-flex justify-content-center"><strong>ADD NOW !</strong></h5>
                     </div>
                 </div>`
            )
        }else{
            $(`#user-todo`).empty()
        }
        arrNotDone.forEach(function(element) {
 
                $(`#user-todo`).prepend(
                `   <div class="card notDone" style="width: 25rem;">
                        <div class="card-body ">
                            <h4 class="card-title d-flex justify-content-center">TODO !</h4>
                            <h5 class="card-title d-flex justify-content-center"><strong>${element.name}</strong></h5>
                            <h5 class="card-title d-flex justify-content-center">description</h5>
                            <p class="card-text d-flex justify-content-center">${element.description}</p>
                            <p class="card-text d-flex justify-content-center">Due Date !</p>
                            <p class="card-text d-flex justify-content-center">${new Date(element.dueDate).toISOString().split('T')[0]}</p>
                            <a href="#" class="btn btn-sm btn-primary d-flex justify-content-center" id="${element._id}up">Done</a>
                            <br>
                            <a href="" class="btn btn-sm btn-default btn-warning d-flex justify-content-center" data-toggle="modal" data-target="#modalEdit" id="${element._id}edit">Edit</a>
                            <br>
                            <a href="#" class="btn btn-sm btn-danger d-flex justify-content-center" id="${element._id}del">Delete Todo</a>
                        </div>
                    </div>`
                    )
            
                $(`#${element._id}del`).on('click', function () {
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
                                method: 'delete',
                                url: `http://localhost:3000/todos/${element._id}`,
                                headers: {
                                    token: localStorage.getItem('token')
                                }
                            })
                                .done(function(data) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your Todo has been deleted.',
                                        'success'
                                      )
                                    $('.resultAddTodo').empty()
                                    $('.resultAddTodo').append(`<h2 style="color:red;">Todo Deleted!</h2>`)
                                    getTodolist()
                                    getDoneTodolist()
                                })
                                .fail(function(err) {
                                    console.log(err)
                                })

                        }
                      })


                })


                $(`#${element._id}edit`).on('click', function(e){
                    e.preventDefault()
                    $(`#modalUpdate`).empty()
                    $(`#modalUpdate`).append(
                        `
                        
                        <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabelEdit">Edit Todo</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                  <form id="edit">
                                      <input type="text" id="nameEdit" value="${element.name}">
                                      <br>
                                      <input type="text" id="descriptionEdit" value="${element.description}">
                                      <br>
                                      <input type="date" id="dueDateEdit" value="${element.dueDate}">
                                      <br>
                                      <div class="errEdit">
                                      </div>
                                      <div class="successEdit">
                                      </div>
                                      <input type="submit" value="Edit">
                                  </form>
                              </div>
                              <div class="modal-footer">
                                <button onclick="clearEdit();" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        
                        `
                    )

                    updateTodo(element._id)

                })


                $(`#${element._id}up`).on('click', function () {
                    console.log(`update ${element.name}`)
                    $.ajax({
                        method: 'patch',
                        url: `http://localhost:3000/todos/${element._id}`,
                        data: {
                            status : true
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .done(function(data) {
                            $('.resultAddTodo').empty()
                            $('.resultAddTodo').append(`<h2 style="color:green;">Todo Achieved</h2>`)
                            getTodolist()
                            getDoneTodolist()
                        })
                        .fail(function(err) {
                            console.log(err)
                        })
                })
        });
    })
    .fail(function(err) {
        console.log(err)
    })
           
}


function updateTodo(id){
    $(`#edit`).on(`submit`, function(e) {
        e.preventDefault()
        $('.successEdit').empty()
        $('.errEdit').empty()


        $.ajax({
            method: 'put',
            url: `http://localhost:3000/todos/${id}`,
            data: {
                name : `${$("#nameEdit").val()}`,
                description : `${$("#descriptionEdit").val()}`,
                dueDate : `${$("#dueDateEdit").val()}`
                
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(function(data) {
                $("#nameEdit").val('')
                $("#descriptionEdit").val('')
                $("#dueDateEdit").val('')
                $('.resultAddTodo').empty()
                $('.resultAddTodo').append(`<h2 style="color:green;">Todo Updated!</h2>`)
                getTodolist()
                getDoneTodolist()
                $('.successEdit').empty()
                $('.successEdit').append(`<p style="color:green;">success</p>`)
                $('#modalEdit').modal('hide')
            })
            .fail(function(err) {
                console.log(err)
                $('.errEdit').empty()
                $('.errEdit').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
            })
    })
}


function updateGroupTodo(id){
    $(`#edit`).on(`submit`, function(e) {
        e.preventDefault()
        $('.successEdit').empty()
        $('.errEdit').empty()


        $.ajax({
            method: 'patch',
            url: `http://localhost:3000/users/editProject/${id}`,
            data: {
                name : `${$("#nameEdit").val()}`,
                description : `${$("#descriptionEdit").val()}`,
                dueDate : `${$("#dueDateEdit").val()}`
                
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(function(data) {
                $("#nameEdit").val('')
                $("#descriptionEdit").val('')
                $("#dueDateEdit").val('')
                $('.resultAddTodo').empty()
                $('.resultAddTodo').append(`<h2 style="color:green;">Todo Updated!</h2>`)
                getGroupTodolist(localStorage.getItem('projectId'))
                getDoneGroupTodolist(localStorage.getItem('projectId'))
                $('.successEdit').empty()
                $('.successEdit').append(`<p style="color:green;">success</p>`)
                $('#modalEdit').modal('hide')
            })
            .fail(function(err) {
                console.log(err)
                $('.errEdit').empty()
                $('.errEdit').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
            })
    })
}



function editItem(){
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/todos/${element._id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(data=>{
        $("#nameEdit").val(`${data.name}`)
        $("#descriptionEdit").val(`${data.description}`)
        $("#dueDateEdit").val(`${data.dueDate}`)
    })
    .fail(err=>{
        console.log(err)
    })
}


function clearEdit(){
    $('.successEdit').empty()
    $('.errEdit').empty()
    $("#nameEdit").val('')
    $("#descriptionEdit").val('')
    $("#dueDateEdit").val('')
}


//add todo

$('#add-todo').submit(e =>{
    $('.resultAddTodo').empty()
    e.preventDefault();
    cekLogin(function(status){
        if (status){
    $.ajax({
        method:'post',
        url: `http://localhost:3000/todos`,
        data: {
            name: `${$("#name").val()}`,
            description: `${$("#description").val()}`,
            dueDate : `${$("#dueDate").val()}`
        },
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        $("#name").val('')
        $("#description").val('')
        $("#dueDate").val('')
        console.log(data)
        getTodolist()
        getDoneTodolist()
        $('.resultAddTodo').empty()
        $('.resultAddTodo').append(`<h2 style="color:green;">Success Add Todo!</h2>`)
    })
    .fail(function(err){
        console.log(err)
        $('.resultAddTodo').empty()
        $('.resultAddTodo').append(`<h2 style="color:red;">${err.responseJSON.message}!</h2>`)
    })
    }else{
        $(`#modalForm`).modal("show")
        cb(false)
        }
    })
})



//generate achieved user todo's

function getDoneTodolist(){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/todos`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data) {
        $(`#user-todo-done`).empty()
        let arrDone = []
        data.forEach(function(todo){
            if(todo.status===true){
                arrDone.push(todo)
            }
        })
        if(arrDone.length === 0){
            $(`#user-todo-done`).empty()
            $(`#user-todo-done`).append(
             `   <div style="height: 400px; background-color: grey" class="card d-flex justify-content-center" style="width: 25rem;">
                     <div class="p-5">
                         <h4 class="card-title d-flex justify-content-center">No Todo's Have Been Achieved !</h4>
                     </div>
                 </div>`
            )
        }else{
            $(`#user-todo-done`).empty()
        }
        data.forEach(function(element) {
            if(element.status===true){
                $(`#user-todo-done`).prepend(
                `   <div class="card" style="width: 25rem;">
                        <div class="card-body ">
                            <h4 class="card-title d-flex justify-content-center">TODO !</h4>
                            <h5 class="card-title d-flex justify-content-center"><strong>${element.name}</strong></h5>
                            <h5 class="card-title d-flex justify-content-center">description</h5>
                            <p class="card-text d-flex justify-content-center">${element.description}</p>
                            <p class="card-text d-flex justify-content-center">Due Date !</p>
                            <p class="card-text d-flex justify-content-center">${new Date(element.dueDate).toISOString().split('T')[0]}</p>
                            <p class="card-text d-flex justify-content-center">Congrats!, you did it!!</p>
                            <a href="#" class="btn btn-sm btn-danger d-flex justify-content-center" id="${element._id}">Delete Todo</a>
                        </div>
                    </div>`
                    )
            }
                $(`#${element._id}`).on('click', function () {
                    console.log(`discard ${element.name}`)
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
                                method: 'delete',
                                url: `http://localhost:3000/todos/${element._id}`,
                                headers: {
                                    token: localStorage.getItem('token')
                                }
                            })
                                .done(function(data) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your Achieved Todo has been deleted.',
                                        'success'
                                      )
                                    $('.resultAddTodo').empty()
                                    $('.resultAddTodo').append(`<h2 style="color:red;">Achieved Todo Deleted!</h2>`)
                                    getTodolist()
                                    getDoneTodolist()
                                })
                                .fail(function(data) {
                                    console.log(err)
                                })

                        }
                      })

                })
        });
    })
    .fail(function(err) {
        console.log(err)
    })
}

function toMain(){
    $('.resultAddTodo').empty()
    $('#todoPage').show()
    $('#holidayPage').hide()
    $('#groupPage').hide()
}

//generate holiday list

function toHoliday(){
    $('.resultAddTodo').empty()
    $('#todoPage').hide()
    $('#holidayPage').show()
}

function getHoliday(){
    $.ajax({
        method : "get",
        url : "http://localhost:3000/holidays",
        headers : {
            token : localStorage.getItem("token")
        }
    })
    .done(function(data){
        console.log(data)
        data.response.holidays.forEach(function(element){
            console.log("MASUKKKKK")
            if(element.type[0]==="National holiday" && element.description!== null){
            $('#holiday').prepend(
                `   <div class="card" style="width: 15rem;">
                        <div class="card-body m-3 p-2">
                            <p class="card-title d-flex justify-content-center">DATE !</p>
                            <p class="card-text d-flex justify-content-center">${element.date.iso}</p>
                            <p class="card-title d-flex justify-content-center">Why is it special?</p>
                            <p style="height: 50px" class="text-center card-title d-flex justify-content-center"><strong>${element.name}</strong></p>
                            
                            <a href="#" class="btn btn-sm btn-info d-flex justify-content-center" id="${element.date.iso}">Mark this Date !</a>
                        </div>
                        <div class="m-1">
                        <p class="card-text d-flex justify-content-center">Description</p>
                        <p style="height:100px; overflow:scroll;" class="card-text d-flex justify-content-center">${element.description}</p>
                        </div>
                    </div>
                `
            )
            }else if (element.type[0]==="National holiday"){
                $('#holiday').prepend(
                    `   <div class="card" style="width: 15rem;">
                            <div class="card-body m-3 p-2">
                                <p class="card-title d-flex justify-content-center">DATE !</p>
                                <p class="card-text d-flex justify-content-center">${element.date.iso}</p>
                                <p class="card-title d-flex justify-content-center">Why is it special?</p>
                                <p style="height: 50px" class="text-center card-title d-flex justify-content-center"><strong>${element.name}</strong></p>
                                
                                <a href="#" class="btn btn-sm btn-info d-flex justify-content-center" id="${element.date.iso}">Mark this Date !</a>
                            </div>
                            <div class="m-1">
                            <p class="card-text d-flex justify-content-center">Description</p>
                            <p style="height:100px; overflow:scroll;" class="card-text d-flex justify-content-center">No Description</p>
                            </div>
                        </div>
                    `
                )
            }
            $(`#${element.date.iso}`).on('click',_ =>{
                $('.resultAddTodo').empty()
                cekLogin(function(status){
                    if (status){
                $.ajax({
                    method:'post',
                    url: `http://localhost:3000/todos`,
                    data: {
                        name: element.name,
                        description: element.description,
                        dueDate : element.date.iso
                    },
                    headers: {
                        token : localStorage.getItem('token')
                    }
                })
                .done(function(data){
                    getTodolist()
                    getDoneTodolist()
                    $('.resultAddTodo').empty()
                    $('.resultAddTodo').append(`<h2 style="color:green;">Success Add Todo!</h2>`)
                })
                .fail(function(err){
                    console.log(err)
                    $('.resultAddTodo').empty()
                    $('.resultAddTodo').append(`<h2 style="color:red;">${err.responseJSON.message}!</h2>`)
                })
                }
                })
            })
        })

    })
            .fail(function(err){
            console.log(err)
        })
}



//getGroup

function getGroup(){
    $('.listedGroup').empty()
    $.ajax({
        method : 'GET',
        url : 'http://localhost:3000/users',
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        data.forEach(element=>{
            $('.listedGroup').prepend(
                `
                    <li onclick="
                    toGroupPage() ;
                    getMember('${element._id}');
                    getGroupTodolist('${element._id}'); 
                    getDoneGroupTodolist('${element._id}');
                    localStorage.setItem('projectId', '${element._id}');" 
                    style="height:50px;" 
                    class="btn list-group-item p-0 rounded-0 d-flex justify-content-center"
                    >
                        <h6 class="my-0 align-self-center  ">${element.name}</h6>
                    </li>
                
                `
            )
        })
    })
    .fail(err=>{
        console.log(err)
    })
}

//getMember

function getMember(id){
    $('#listedMember').empty()
    $.ajax({
        method : 'GET',
        url : `http://localhost:3000/users/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        data.UsersId.forEach(element=>{
            $('#listedMember').prepend(
                `
                    <li 
                    style="height:50px;" 
                    class="list-group-item p-0 rounded-0 d-flex justify-content-center"
                    >
                        <h6 class="my-0 align-self-center  ">${element.email}</h6>
                    </li>
                
                `
            )
        })
        if(data.UsersId[0].email===localStorage.getItem('email')){
            $('#deleteProject').empty()
            $('#deleteProject').append(
                `
                <li onclick="deleteProject('${id}')" style="height: 40px;" class="bg-danger btn list-group-item rounded d-flex justify-content-center mt-2">
                    <div class="align-self-center">
                      <h6 class="my-0">Delete This Project</h6>
                    </div>
                </li>
                `
            )
        }
    })
    .fail(err=>{
        console.log(err)
    })
}

function toGroupPage(){
    $('#todoPage').hide()
    $('#holidayPage').hide()
    $('#groupPage').show()
    $('.resultAddGroupTodo').empty()
    $('#deleteProject').empty()
}

//Create Group

$('#createGroup').submit(e=>{
    e.preventDefault()
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/users',
        data : {
            name : $('#nameGroup').val()
        },
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        $('#nameGroup').val('')
        console.log('success')
        console.log(data)
        $('#listedMember').empty()
        getGroup()
        getMember(localStorage.getItem('projectId'))
        $('#modalCreateGroup').modal('hide')
    })
    .fail(err=>{
        $('.errCreateGroup').empty()
        $('.errCreateGroup').append(`<p style="color:red;">${err.responseJSON.message}!</p>`)
    })
})


//addMember

$('#addMember').submit(e=>{
    e.preventDefault()
    $('.errAddMember').empty()
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/users/member/${localStorage.getItem('projectId')}`,
        data : {
            email : $('#emailMember').val()
        },
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        $('#listedMember').empty()
        getMember(localStorage.getItem('projectId'))
        getGroup()
        $('#modalCreateGroup').modal('hide')
        $('#emailMember').val('')
    })
    .fail(err=>{

        console.log(err)
        $('.errAddMember').append(`<p style="color:red;">${err.responseJSON.message}!</p>`)
    })
})

function clearResult(){
    $('.errAddMember').empty()
    $('.successAddMember').empty()
    $('#emailMember').val('')
    $('.errCreateGroup').empty()
    $('.successCreateGroup').empty()
    $('#nameGroup').val('')
    $(`.resultAddTodo`).empty()
    $(`.resultAddGroupTodo`).empty()
}

function getGroupTodolist(id){
    $(`#group-todo`).empty()
    $.ajax({
        method :'GET',
        url :`http://localhost:3000/users/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        $('#projectName').empty()
        $('#projectName').append(`<h1 class="text-center text-white">${data.name}</h1>`)
        let arrNotDone = []
        data.TodosId.forEach(function(todo){
            if(todo.status===false){
                arrNotDone.push(todo)
            }
        })
        if(arrNotDone.length === 0){
            $(`#group-todo`).empty()
            $(`#group-todo`).append(
             `   <div style="height: 400px; background-color: grey" class="card d-flex justify-content-center" style="width: 25rem;">
                     <div class="p-5">
                         <h4 class="card-title d-flex justify-content-center text-center">No Group Todo's Have Been Created !</h4>
                         <h5 class="card-title d-flex justify-content-center"><strong>ADD NOW !</strong></h5>
                     </div>
                 </div>`
            )
        }else{
            $(`#group-todo`).empty()
        }
        arrNotDone.forEach(function(element) {
 
                $(`#group-todo`).prepend(
                `   <div class="card notDone" style="width: 25rem;">
                        <div class="card-body ">
                            <h4 class="card-title d-flex justify-content-center">TODO !</h4>
                            <h5 class="card-title d-flex justify-content-center"><strong>${element.name}</strong></h5>
                            <h5 class="card-title d-flex justify-content-center">description</h5>
                            <p class="card-text d-flex justify-content-center">${element.description}</p>
                            <p class="card-text d-flex justify-content-center">Due Date !</p>
                            <p class="card-text d-flex justify-content-center">${new Date(element.dueDate).toISOString().split('T')[0]}</p>
                            <a href="#" class="btn btn-sm btn-primary d-flex justify-content-center" id="${element._id}up">Done</a>
                            <br>
                            <a href="" class="btn btn-sm btn-default btn-warning d-flex justify-content-center" data-toggle="modal" data-target="#modalEdit" id="${element._id}edit">Edit</a>
                            <br>
                            <a href="#" class="btn btn-sm btn-danger d-flex justify-content-center" id="${element._id}del">Delete Todo</a>
                        </div>
                    </div>`
                    )
            
                $(`#${element._id}del`).on('click', function () {
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
                                method: 'delete',
                                url: `http://localhost:3000/users/projectTodo/${element._id}`,
                                headers: {
                                    token: localStorage.getItem('token')
                                }
                            })
                                .done(function(data) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your Todo Project has been deleted.',
                                        'success'
                                      )
                                    $('.resultAddGroupTodo').empty()
                                    $('.resultAddGroupTodo').append(`<h2 style="color:red;">Group Todo Deleted!</h2>`)
                                    getGroupTodolist(id)
                                    getDoneGroupTodolist(id)
                                })
                                .fail(function(err) {
                                    console.log(err)
                                })

                        }
                      })

                })


                $(`#${element._id}edit`).on('click', function(e){
                    e.preventDefault()
                    $(`#modalUpdate`).empty()
                    $(`#modalUpdate`).append(
                        `
                        
                        <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabelEdit">Edit Todo</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                  <form id="edit">
                                      <input type="text" id="nameEdit" value="${element.name}">
                                      <br>
                                      <input type="text" id="descriptionEdit" value="${element.description}">
                                      <br>
                                      <input type="date" id="dueDateEdit" value="${element.dueDate}">
                                      <br>
                                      <div class="errEdit">
                                      </div>
                                      <div class="successEdit">
                                      </div>
                                      <input type="submit" value="Edit">
                                  </form>
                              </div>
                              <div class="modal-footer">
                                <button onclick="clearEdit();" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        
                        `
                    )

                    updateGroupTodo(element._id)

                })


                $(`#${element._id}up`).on('click', function () {
                    $.ajax({
                        method: 'patch',
                        url: `http://localhost:3000/users/statusProject/${element._id}`,
                        data: {
                            status : true
                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .done(function(data) {
                            console.log(data)
                            $('.resultAddGroupTodo').empty()
                            $('.resultAddGroupTodo').append(`<h2 style="color:green;">Group Todo Achieved</h2>`)
                            getGroupTodolist(id)
                            getDoneGroupTodolist(id)
                        })
                        .fail(function(err) {
                            console.log(err)
                        })
                })
        });
    })
    .fail(function(err) {
        console.log(err)
    })
           
}


function getDoneGroupTodolist(id){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/users/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data) {
        $(`#group-todo-done`).empty()
        let arrDone = []
        data.TodosId.forEach(function(todo){
            if(todo.status===true){
                arrDone.push(todo)
            }
        })
        if(arrDone.length === 0){
            $(`#group-todo-done`).empty()
            $(`#group-todo-done`).append(
             `   <div style="height: 400px; background-color: grey" class="card d-flex justify-content-center" style="width: 25rem;">
                     <div class="p-5">
                         <h4 class="card-title d-flex justify-content-center text-center">No  Group Todo's Have Been Achieved !</h4>
                     </div>
                 </div>`
            )
        }else{
            $(`#group-todo-done`).empty()
        }
        arrDone.forEach(function(element) {
            if(element.status===true){
                $(`#group-todo-done`).prepend(
                `   <div class="card" style="width: 25rem;">
                        <div class="card-body ">
                            <h4 class="card-title d-flex justify-content-center">TODO !</h4>
                            <h5 class="card-title d-flex justify-content-center"><strong>${element.name}</strong></h5>
                            <h5 class="card-title d-flex justify-content-center">description</h5>
                            <p class="card-text d-flex justify-content-center">${element.description}</p>
                            <p class="card-text d-flex justify-content-center">Due Date !</p>
                            <p class="card-text d-flex justify-content-center">${new Date(element.dueDate).toISOString().split('T')[0]}</p>
                            <p class="card-text d-flex justify-content-center">Congrats!, you did it!!</p>
                            <a href="#" class="btn btn-sm btn-danger d-flex justify-content-center" id="${element._id}">Delete Todo</a>
                        </div>
                    </div>`
                    )
            }
                $(`#${element._id}`).on('click', function () {
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
                                method: 'delete',
                                url: `http://localhost:3000/users/projectTodo/${element._id}`,
                                headers: {
                                    token: localStorage.getItem('token')
                                }
                            })
                                .done(function(data) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your Achieved Todo Project has been deleted.',
                                        'success'
                                      )
                                    $('.resultAddGroupTodo').empty()
                                    $('.resultAddGroupTodo').append(`<h2 style="color:red;">Achieved Group Todo Deleted!</h2>`)
                                    getGroupTodolist(id)
                                    getDoneGroupTodolist(id)
                                })
                                .fail(function(data) {
                                    console.log(err)
                                })

                        }
                      })

                })
        });
    })
    .fail(function(err) {
        console.log(err)
    })
}

//add todo group


    $('#add-group-todo').submit(e =>{
        e.preventDefault();
        cekLogin(function(status){
            if (status){
        $.ajax({
            method:'patch',
            url: `http://localhost:3000/users/projectTodo/${localStorage.getItem('projectId')}`,
            data: {
                name: `${$("#group-todo-name").val()}`,
                description: `${$("#group-todo-description").val()}`,
                dueDate : `${$("#group-todo-dueDate").val()}`
            },
            headers: {
                token : localStorage.getItem('token')
            }
        })
        .done(function(data){
            $("#group-todo-name").val('')
            $("#group-todo-description").val('')
            $("#group-todo-dueDate").val('')
            console.log(data)
            getGroupTodolist(localStorage.getItem('projectId'))
            getDoneGroupTodolist(localStorage.getItem('projectId'))
            $('.resultAddGroupTodo').empty()
            $('.resultAddGroupTodo').append(`<h2 style="color:green;">Success Add Group Todo!</h2>`)
        })
        .fail(function(err){
            console.log(err)
            $('.resultAddGroupTodo').empty()
            $('.resultAddGroupTodo').append(`<h2 style="color:red;">${err.responseJSON.message}!</h2>`)
        })
        }else{
            $(`#modalForm`).modal("show")
            cb(false)
            }
        })
    })

function deleteProject(id){
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
                method : 'DELETE',
                url : `http://localhost:3000/users/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .done(data=>{
                Swal.fire(
                    'Deleted!',
                    'Your Project has been deleted.',
                    'success'
                  )
                toMain()
                getGroup()
            })
            fail(err=>{
                console.log(err)
            })

        }
      })

}


//signout here

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    notLogin()
    clearResult()
}


//access todo if login

function cekLogin(cb){
    if (localStorage.getItem('token')){
        cb(true)
    }else{
        $(`#modalForm`).modal("show")
        cb(false)
    }
} 