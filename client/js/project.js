$(document).ready(()=>{

    if(localStorage.getItem('token')){
        fetchProjects()
    }

    $('#add-project-btn').click(function(e){
        $('#id-project-modal').show()
    })
    
    $('#form-add-project').submit(function(e){
        e.preventDefault()
        createProject()
        $('.fancy-modal').hide()
    })

    $('#add-todo-project-btn').click(function(e){
        $('#id-todo-project-modal').show()
    })

    $('#form-add-todo-project').submit(function(e){
        e.preventDefault()
        $('#id-todo-project-modal').hide()
        addTodo()
    })

    $('#form-edit-todo-project').submit(function(e){
        e.preventDefault()
        $('#edit-todo-project-modal').hide()
        editProjectTodo()
    })

    $('#add-member').submit(function(e){
        e.preventDefault()
        addMember()
    })

    $('#add-member-btn').click(function(e){
        addMember()
    })

    $('#update-project-btn').click(function(e){
        editProject()
    })

    $('#delete-project-btn').click(function(e){
        deleteProject()
    })

})

function createProject(){
    Swal.showLoading()
    let title = $('#input-project-title').val()
    let description = $('#input-project-desc').val()
    let dueDate = $('#input-project-date').val()

        $.ajax({
        method: 'post',
        url: `${baseUrl}/projects`,
        data: {
            title,
            description,
            dueDate
        },
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(project=>{
        PNotify.success("success add project")
        printProject(project)
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
        $('#input-project-name').val('')
        $('#input-project-desc').val('')
        $('#input-project-date').val('')
    })
}

function fetchProjects(){
    Swal.showLoading()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/projects`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(projects =>{
        $('#projects').html('')
       projects.forEach(project => {
        printProject(project)
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

function editProject(){
    Swal.showLoading()
    const projectId = $('#project-id').val()
    const title = $('#project-desc-title').val()
    const description = $('#project-desc-description').val()
    const dueDate = $('#project-desc-duedate').val()

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/projects/${projectId}`,
        data: {
            title,
            description,
            dueDate
        },
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{
        PNotify.success("success edit project")
        fetchProject(projectId)
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
        $('#input-project-name').val('')
        $('#input-project-desc').val('')
        $('#input-project-date').val('')
    })

}

function deleteProject(){
    Swal.showLoading()
    const projectId = $('#project-id').val()

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
                url: `${baseUrl}/projects/${projectId}`,
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            .done(()=>{
                PNotify.success("success delete project")
                resetPage()
                fetchProjects()
                $('#project-page').show()
            })
            .fail(err =>{
                err.responseJSON.forEach(error => {
                    PNotify.error(error)
                });
            })
            .always(()=>{
                Swal.close()
                $('#input-project-name').val('')
                $('#input-project-desc').val('')
                $('#input-project-date').val('')
            })
        }
      })
}

function addTodo(){
    Swal.showLoading()
    const projectId = $('#project-id').val()
    let name = $('#input-project-todo-name').val()
    let description = $('#input-project-todo-desc').val()
    let dueDate = $('#input-todo-project-date').val()

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/projects/${projectId}/addtodo`,
        data: {
            name,
            description,
            dueDate
        },
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(()=>{
        PNotify.success("success add todo")
        fetchProject(projectId)
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
        $('#input-project-todo-name').val('')
        $('#input-project-todo-desc').val('')
        $('#input-todo-project-date').val('')
    })

}

function fetchProjectTodo(name, description, dueDate, id){

    $('#edit-todo-project-name').val(name)
    $('#edit-todo-project-desc').val(description)
    $('#edit-todo-project-date').val(dateFormat(dueDate))
    $('#edit-todo-project-id').val(id)
    $('#edit-todo-project-modal').show()

}

function editProjectTodo(){

    const projectId = $('#project-id').val()
    let name = $('#edit-todo-project-name').val()
    let description = $('#edit-todo-project-desc').val()
    let dueDate = $('#edit-todo-project-date').val()
    let todoId = $('#edit-todo-project-id').val()

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/projects/${projectId}/updatetodo`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            todoId,
            name,
            description,
            dueDate
        }
    })
    .done(() =>{
        PNotify.success('success edit todo')
        fetchProject(projectId)
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

function addMember(){
    
    const projectId = $('#project-id').val()
    const memberEmail = $('#input-member-email').val()

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/projects/${projectId}/addmember`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            email: memberEmail
        }

    })
    .done(() =>{
        PNotify.success('success add member')
        fetchProject(projectId)
    })
    .fail(err =>{
        PNotify.error(err.responseJSON)
    })
    .always(()=>{
        Swal.close()
        $('#input-member-email').val('')
    })
}

// CLIKED
function fetchProject(projectId){

    Swal.showLoading()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/projects/${projectId}`,
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done(project =>{
        resetPage()
        $('#project-detail').show()
        printProjectDetail(project)
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

function removeTodo(todoId, projectId){
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
                method: 'patch',
                url: `${baseUrl}/projects/${projectId}/removetodo`,
                headers:{
                    token : localStorage.getItem('token')
                },
                data: {
                    todoId
                }

            })
            .done(() =>{
                PNotify.success('success delete todo')
                fetchProject(projectId)
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

function removeMember(memberEmail, projectId){
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
                method: 'patch',
                url: `${baseUrl}/projects/${projectId}/removemember`,
                headers:{
                    token : localStorage.getItem('token')
                },
                data: {
                    email : memberEmail
                }
        
            })
            .done(() =>{
                PNotify.success('success delete member')
                fetchProject(projectId)
            })
            .fail(err =>{
                PNotify.error(err.responseJSON)
            })
            .always(()=>{
                Swal.close()
            })
        }
      })
}

function changeStatusProject(projectId, status){

    if(status === 'UNCOMPLETE'){
        status = 'COMPLETE'
    } else {
        status = 'UNCOMPLETE'
    }

    Swal.showLoading()
    $.ajax({
        method: 'patch',
        url: `${baseUrl}/projects/${projectId}`,
        headers:{
            token : localStorage.getItem('token')
        },
        data: {
            status
        }
    })
    .done(() =>{
        PNotify.success(status)
        $('#projects').html('')
        fetchProjects()
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

// PRINT
function printProject(project){
    let statusIcon = `<i  onclick="changeStatusProject('${project._id}', '${project.status}')" class="fas fa-check-circle"></i>`

    if(project.status === 'COMPLETE') statusIcon = `<i style="color: #68eb3d;" onclick="changeStatusProject('${project._id}', '${project.status}')" class="fas fa-check-circle"></i>`

    $('#projects').append(`
    <div ondblclick="fetchProject('${project._id}')" class="todo-card d-flex flex-column justify-content-between p-2">
        <div>
            <h6 class="text-center">${project.title}</h6>
            <span style="font-size: 10px;">${project.description}</span>
        </div>
        <div class="date d-flex align-items-center justify-content-between">
            <span>${dateFormat(project.dueDate)}</span>
            ${statusIcon}
        </div>
    </div> 
    `)
}

function printProjectDetail(project){
    $('#project-id').html('')
    $('#project-id').val(project._id)
    // title
    $('#project-detail-title').html('')
    $('#project-detail-title').append(project.title)

    // date
    $('#project-detail-duedate').html('')
    $('#project-detail-duedate').append('| ' +dateFormat(project.dueDate))

    //todo list
    $('#project-todos').html('')
     
    project.todoList.forEach(todo => {
        $('#project-todos').append(`
            <div style="cursor: pointer;" ondblclick="fetchProjectTodo('${todo.name}', '${todo.description}', '${todo.dueDate}', '${todo._id}')" class="project-todo d-flex mt-2">
                <div class="desc d-flex align-items-center pl-2">
                    <span>${todo.name}</span>
                </div>
                <div onclick="removeTodo('${todo._id}', '${project._id}')" class="delete-todo d-flex justify-content-center align-items-center">
                    <span style="font-size: 15px; cursor: pointer;" class="text-white">x</span>
                </div>
            </div> 
        `)
    });

    // member list

    $('#project-member').html('')

    project.member.forEach(user => {
        $('#project-member').append(`
        <div class="project-todo d-flex mt-2">
            <div class="desc d-flex align-items-center pl-2">
                <span>${user.email}</span>
            </div>
            <div onclick="removeMember('${user.email}', '${project._id}')" class="delete-todo d-flex justify-content-center align-items-center">
                <span style="font-size: 15px; cursor: pointer;" class="text-white">x</span>
            </div>
        </div>
        
        `)
    })

    // project description

    $('#project-desc-title').val('')
    $('#project-desc-description').val('')
    $('#project-desc-duedate').val('')

    $('#project-desc-title').val(project.title)
    $('#project-desc-description').val(project.description)
    $('#project-desc-duedate').val(dateFormat(project.dueDate))
    
}