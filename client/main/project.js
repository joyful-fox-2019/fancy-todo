

function getProject () {
    // $('.main-view').hide(2000,function(){
        // $('.project').show()
    // })
    // localStorage.getItem('project',true)
    $.ajax({
        method: 'GET',
        url: baseUrl + `/projects`,
        headers: {
            token : localStorage.getItem('token')
        }
    })
        .done(data=>{
            console.log(data,'????????????');
            
            $('.project').empty()
            for(let i = 0; i < data.length; i++) {
                console.log(data[i]._id);
                
                $('.project').prepend(`
                
                    
                <div class="dropdown">
                    <button class="dropbtn"><i class="fas fa-project-diagram"></i> ${data[i].name}</button>
                    <div class="dropdown-content">
                    <li onclick="saveProjectId('${data[i]._id}')" data-toggle="modal" data-target=".memberModal">
                    Add Member
                    </li>
                    <li onclick="projectTodo('${data[i]._id}')">
                    See Todo
                    </li>
                    <li onclick="saveProjectId('${data[i]._id}')" data-toggle="modal" data-target=".todoProjectModal">
                    Add Project Todo
                    </li>
                    <li onclick="deleteProject('${data[i]._id}')">
                    Delete Project
                    </li>
                    </div>
                </div>

                
                `)

                // $('.project').append(`
                //     <li onclick="projectTodo('${data[i]._id}')">
                //     <i class="fas fa-project-diagram"></i>
                //     ${data[i].name}
                //     </li>
                // `)
            }
            console.log(data,'projexttttt');

        })
        .fail(err=>{
            console.log(err);
            
        })
}

function projectTodo(id) {
    localStorage.setItem('project',true)
    Swal.fire({
        title: 'fetching project todos',
        onOpen: ()=>{
          Swal.showLoading()
        }
      })
    // alert('masuk')
    $('.my-project').show()
    $('.main-view').hide()
    $.ajax({
        method : 'GET',
        url : baseUrl + `/projects/${id}`,
        headers : {
            token: localStorage.getItem('token')
        }
    })
        .done(data=>{
            Swal.close()
            $('.my-project').empty()
            for(let i = 0; i < data.todoId.length; i++) {
                
                
                if(new Date(data.todoId[i].dueDate) < new Date()) {
                    $('.my-project').prepend(`
                    <div class="d-card red">
                        <div class="card-header">
                        <div class="icon">
                            <i class="fa fa-fire"></i>
                        </div>
                        <p>${data.todoId[i].title}</p>
                        </div>
                        <div class="card-body" style="he">
                        <p>${data.todoId[i].description}</p>
                        </div>
                        <p style ="font-size:12px; vertical-align:bottom; text-align:center; color:white;">${new Date(data.todoId[i].dueDate).toDateString()}</p>
                        <div class="card-actions">
                        <a onclick=deleteTodoProject(this) data-arg1="${data.todoId[i]._id}" data-arg2="${id}"><i class="fa fa-trash"></i></a>
                        </div>
                    </div>
                    `)
                } else {
                    if(data.todoId[i].status === false) {
                        $('.my-project').prepend(`
                        <div class="d-card blue">
                            <div class="card-header">
                            <div class="icon">
                                <i class="fa fa-tint"></i>
                            </div>
                            <p>${data.todoId[i].title}</p>
                            </div>
                            <div class="card-body">
                            <p>${data.todoId[i].description}</p>
                            </div>
                            <p style ="font-size:12px; vertical-align:bottom; text-align:center; color:white;">${new Date(data.todoId[i].dueDate).toDateString()}</p>
                            <div class="card-actions">
                            <a onclick=changeStatusProject(this) data-arg1="${data.todoId[i]._id}" data-arg2="${id}"><i class="fas fa-check mt-1" style="color:white;"></i></a>
                            <a onclick=updateProjectMdlBtn(this) data-arg1="${data.todoId[i]._id}" data-arg2="${data.todoId[i].title}" data-arg3="${data.todoId[i].description}" data-arg4="${data.todoId[i].dueDate}" data-arg5="${id}" data-toggle="modal" data-target=".updateProjectModal"><i class="fa fa-edit"></i></a>
                            <a onclick=deleteTodoProject(this) data-arg1="${data.todoId[i]._id}" data-arg2="${id}"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                        `)
                    } else if (data.todoId[i].status === true) {
                            $('.my-project').prepend(`
                            <div class="d-card green">
                                <div class="card-header">
                                <div class="icon">
                                    <i class="fa fa-leaf"></i>
                                </div>
                                <p>${data.todoId[i].title}</p>
                                </div>
                                <div class="card-body">
                                <p>${data.todoId[i].description}</p>
                                </div>
                                <p style ="font-size:12px; vertical-align:bottom; text-align:center; color:white;">${new Date(data.todoId[i].dueDate).toDateString()}</p>
                                <div class="card-actions">
                                <a onclick=undoStatusProject(this) data-arg1="${data.todoId[i]._id}" data-arg2="${id}"><i class="fas fa-undo mt-1" style="color:white;"></i></a>
                                <a onclick=updateProjectMdlBtn(this) data-arg1="${data.todoId[i]._id}" data-arg2="${data.todoId[i].title}" data-arg3="${data.todoId[i].description}" data-arg4="${data.todoId[i].dueDate}" data-arg5="${id}" data-toggle="modal" data-target=".updateProjectModal"><i class="fa fa-edit"></i></a>
                                <a onclick=deleteTodoProject(this) data-arg1="${data.todoId[i]._id}" data-arg2="${id}"><i class="fa fa-trash"></i></a>
                                </div>
                            </div>
                            `)
                    }
                }
            }
        })
        .fail(err=>{
            console.log(err);
            
        })

}

function addProject(event) {
    event.preventDefault()
    $.ajax({
        method : 'POST',
        url : baseUrl + `/projects`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            name : $('#projectName').val()
        }
    })
        .done(_=>{
            $('#projectName').val('')
            Swal.fire('success','project created','success')
            //   auth()
            getProject()
        })
        .fail(err=>{
            $('#projectName').val('')
            Swal.fire('error',err.responseJSON.message,'error')
        })
}

function deleteProject(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
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
                method : 'DELETE',
                url : baseUrl + `/projects/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
                .done(_=>{
                    auth()
                })
                .fail(err=>{
                    Swal.fire('error',err.responseJSON.message,'error')  
                })

         
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your file is safe :)',
            'error'
          )
        }
      })
}

let projectId

function saveProjectId(id) {
    projectId = id
}

function addProjectTodo(event) {
    event.preventDefault()
    $.ajax({
        method: 'PATCH',
        url : baseUrl + `/projects/${projectId}/todos`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            title : $('#titlePro').val(),
            description : $('#descriptionPro').val(),
            dueDate: $('#dueDatePro').val()
        }
    })
        .done(_=>{
            $('#titlePro').val(''),
            $('#descriptionPro').val(''),
            $('#dueDatePro').val('')
            // auth()
            getProject()
        })
        .fail(err=>{
            $('#titlePro').val(''),
            $('#descriptionPro').val(''),
            $('#dueDatePro').val('')
            Swal.fire('error',err.responseJSON.message,'error')
        })
}

function deleteTodoProject(id) {
    let todoId = $(id).data('arg1')
    let proId = $(id).data('arg2')
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
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
                url : baseUrl + `/projects/${proId}/todos/${todoId}`,
                method : 'DELETE',
                headers : {
                    token: localStorage.getItem('token')
                }
            })
                .done(_=>{
                    auth()
                })
                .fail(err=>{
                    Swal.fire('error',err.responseJSON.message,'error')
                })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your todo is safe :)',
            'error'
          )
        }
      })
}

function addMember(event) {
    event.preventDefault()
    $.ajax({
        method : 'PATCH',
        url : baseUrl + `/projects/${projectId}`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            email : $('#memberEmail').val()
        }
    })
        .done(_=>{
            $('#memberEmail').val('')
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              })
              
              Toast.fire({
                type: 'success',
                title: 'Add New Member'
              })
        })
        .fail(err=>{
            $('#memberEmail').val('')
            Swal.fire('error',err.responseJSON.message,'error')  
        })
}

function changeStatusProject(id) {
    let todoId = $(id).data('arg1')
    let proId = $(id).data('arg2')
    $.ajax({
        method: 'PATCH',
        url : baseUrl + `/projects/${proId}/todos/${todoId}/status`,
        data : {
            status : true
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(_=>{
            auth()
        })
        .fail(err=>{
            Swal.fire('error',err.responseJSON.message,'error')
        })
}

function undoStatusProject(id) {
    let todoId = $(id).data('arg1')
    let proId = $(id).data('arg2')
    $.ajax({
        method: 'PATCH',
        url : baseUrl + `/projects/${proId}/todos/${todoId}/status`,
        data : {
            status : false
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(_=>{
            auth()
        })
        .fail(err=>{
            Swal.fire('error',err.responseJSON.message,'error')
        })
}

function updateTodoProject(event) {
    event.preventDefault()
    // let todoId = $(id).data('arg1')
    // let proId = $(id).data('arg2')
    $.ajax({
        method: 'PATCH',
        url : baseUrl + `/projects/${projectId}/todos/${todoProjectId}`,
        data : {
            title : $('#upProtitle').val(),
            description : $('#upProdescription').val(),
            dueDate : $('#upProdueDate').val()
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(_=>{
            auth()
        })
        .fail(err=>{
            Swal.fire('error',err.responseJSON.message,'error')
        })
}

let todoProjectId
function updateProjectMdlBtn(id) {
    let dataId = $(id).data('arg1')
    todoProjectId = dataId
    let newTitle = $(id).data('arg2')
    let newDescription = $(id).data('arg3')
    let newDueDate = $(id).data('arg4')
    projectId = $(id).data('arg5')
    $('#upProtitle').val(`${newTitle}`)
    $('#upProdescription').val(`${newDescription}`)
    $('#upProdueDate').val(`${newDueDate}`)
}