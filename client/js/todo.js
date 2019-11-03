$(document).ready(()=>{
    PNotify.defaults.delay = '2000';

    $(".selectordate").flatpickr(
        {
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            enableTime: true
        }
    );

    if(localStorage.getItem('token')){
        fetchTodos()
    }

    $('#add-todo-btn').click(function(e){
        $('#id-todo-modal').show()
    })

    $('.close-todo-modal').click(function(e){
       $('.fancy-modal').hide()
    })

    $('#form-add-todo').submit(function(e){
        e.preventDefault()
        $('#id-todo-modal').hide()
        createTodo()
    })

    $('#form-edit-todo').submit(function(e){
        e.preventDefault()
        $('#edit-todo-modal').hide()
        editTodo()
    })

    $('#delete-todo').click(function(e){
        e.preventDefault()
        $('#edit-todo-modal').hide()
        deleteTodo()
    })

})

function createTodo(){
    Swal.showLoading()
    let name = $('#input-todo-name').val()
    let description = $('#input-todo-desc').val()
    let dueDate = $('#input-todo-date').val()

    $.ajax({
        method: 'post',
        url: `${baseUrl}/todos`,
        data: {
            name,
            description,
            dueDate
        },
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(todo=>{
        PNotify.success("success add todo")
        printTodo(todo)
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
        $('#input-todo-name').val('')
        $('#input-todo-desc').val('')
        $('#input-todo-date').val('')
    })
}

function fetchTodos(){
    Swal.showLoading()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/todos`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(todos =>{
        $('#todos').html('')
       todos.forEach(todo => {
        printTodo(todo)
       });
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
    })

}

function editTodo(){
    Swal.showLoading()
    let name = $('#edit-todo-name').val()
    let description = $('#edit-todo-desc').val()
    let dueDate = $('#edit-todo-date').val()
    let todoId = $('#edit-todo-id').val()

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/todos/${todoId}`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            name,
            description,
            dueDate
        }
    })
    .done(() =>{
        PNotify.success('success edit todo')
        $('#todos').html('')
        fetchTodos()
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
    })

}

function deleteTodo(){
    let todoId = $('#edit-todo-id').val()
    Swal.showLoading()
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
                url: `${baseUrl}/todos/${todoId}`,
                headers:{
                    token : localStorage.getItem('token')
                },
        
            })
            .done(() =>{
                PNotify.success('success delete todo')
                $('#todos').html('')
                fetchTodos()
                fetchSocial()
            })
            .fail(err =>{
                err.responseJSON.forEach(error => {
                    PNotify.error(error)
                });
            })
            .always(()=>{
                Swal.close()
            })
        }
      })

    
}

// CLIKED
function fetchTodo(todoId){
    Swal.showLoading()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/todos/${todoId}`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(todo =>{
        $('#edit-todo-name').val(todo.name)
        $('#edit-todo-desc').val(todo.description)
        $('#edit-todo-date').val(dateFormat(todo.dueDate))
        $('#edit-todo-id').val(todo._id)
        $('#edit-todo-modal').show()
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
    })

}

function changeStatus(todoId, status){
    
    if(status === 'UNCOMPLETE'){
        status = 'COMPLETE'
    } else {
        status = 'UNCOMPLETE'
    }

    Swal.showLoading()
    $.ajax({
        method: 'patch',
        url: `${baseUrl}/todos/${todoId}`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            status
        }
    })
    .done(() =>{
        PNotify.success(status)
        $('#todos').html('')
        fetchTodos()
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
    })
}

function shareTodo(todoId, share){
    Swal.showLoading()

    let method = 'post'
    if (share == 'true') method = 'delete'

    $.ajax({
        method,
        url: `${baseUrl}/socials/${todoId}`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(() =>{
        let status = method === 'post' ? 'success share todo to social media' : 'remove todo from social media'
        PNotify.success(status)
        $('#todos').html('')
        fetchTodos()
        fetchSocial()


    })
    .fail(err =>{
        PNotify.error(err.responseJSON)
    })
    .always(()=>{
        Swal.close()
    })


}

// PRINT
function dateFormat(date) {
    let event = new Date(date);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return event.toLocaleDateString("en-US", options);
  }

function printTodo(todo){

    let statusIcon = `<i  onclick="changeStatus('${todo._id}', '${todo.status}')" class="fas fa-check-circle"></i>`
    let shareIcon = `<i onclick="shareTodo('${todo._id}', '${todo.share}')" class="fas fa-share-alt"></i>`

    if(todo.status === 'COMPLETE') statusIcon = `<i style="color: #68eb3d;" onclick="changeStatus('${todo._id}', '${todo.status}')" class="fas fa-check-circle"></i>`
    if(todo.share) shareIcon = `<i onclick="shareTodo('${todo._id}', '${todo.share}')" style="color: #07f5dd75;" class="fas fa-share-alt"></i>`

    $('#todos').append(`
    <div ondblclick="fetchTodo('${todo._id}')" class="todo-card d-flex flex-column justify-content-between p-2">
        <div>
            <h6 class="text-center">${todo.name}</h6>
            <span style="font-size: 10px;">${todo.description}</span>
        </div>
        <div class="date d-flex align-items-center justify-content-between">
            <span>${dateFormat(todo.dueDate)}</span>
            ${shareIcon}
            ${statusIcon}
        </div>
    </div> 
    `)

}
