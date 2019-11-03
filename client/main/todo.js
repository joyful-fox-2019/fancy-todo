function home(event) {
    event.preventDefault()
    localStorage.setItem('project',false)
    $('.my-project').hide()
    $('.main-view').show()
    fetchData()
}

function fetchData () {
    localStorage.getItem('project',false)
    // $('.my-project').hide()
    Swal.fire({
        title: 'fetching todos',
        onOpen: ()=>{
          Swal.showLoading()
        }
      })
    $.ajax({
        url : baseUrl + '/todos',
        method : 'GET',
        headers : {
            token: localStorage.getItem('token')
        }
    })
        .done(({data})=>{
            Swal.close()
            $('.main-view').empty()
            for(let i = 0; i < data.length; i++) {
                // console.log(new Date(data[i].dueDate).toDateString(),'dateeeeeee');
                
                if(new Date(data[i].dueDate) < new Date()) {
                    $('.main-view').prepend(`
                    <div class="d-card red">
                        <div class="card-header">
                        <div class="icon">
                            <i class="fa fa-fire"></i>
                        </div>
                        <p>${data[i].title}</p>
                        </div>
                        <div class="card-body" style="he">
                        <p>${data[i].description}</p>
                        </div>
                        <p style ="font-size:12px; vertical-align:bottom; text-align:center; color:white;">${new Date(data[i].dueDate).toDateString()}</p>
                        <div class="card-actions">
                        <a onclick=deleteTodo(this) data-arg1="${data[i]._id}"><i class="fa fa-trash"></i></a>
                        </div>
                    </div>
                    `)
                } else {
                    if(data[i].status === false) {
                        $('.main-view').prepend(`
                        <div class="d-card blue">
                            <div class="card-header">
                            <div class="icon">
                                <i class="fa fa-tint"></i>
                            </div>
                            <p>${data[i].title}</p>
                            </div>
                            <div class="card-body">
                            <p>${data[i].description}</p>
                            </div>
                            <p style ="font-size:12px; vertical-align:bottom; text-align:center; color:white;">${new Date(data[i].dueDate).toDateString()}</p>
                            <div class="card-actions">
                            <a onclick=changeStatus(this) data-arg1="${data[i]._id}"><i class="fas fa-check mt-1" style="color:white;"></i></a>
                            <a onclick=updateMdlBtn(this) data-arg1="${data[i]._id}" data-arg2="${data[i].title}" data-arg3="${data[i].description}" data-arg4="${data[i].dueDate}" data-toggle="modal" data-target=".updateModal"><i class="fa fa-edit"></i></a>
                            <a onclick=deleteTodo(this) data-arg1="${data[i]._id}"><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                        `)
                    } else if (data[i].status === true) {
                            $('.main-view').prepend(`
                            <div class="d-card green">
                                <div class="card-header">
                                <div class="icon">
                                    <i class="fa fa-leaf"></i>
                                </div>
                                <p>${data[i].title}</p>
                                </div>
                                <div class="card-body">
                                <p>${data[i].description}</p>
                                </div>
                                <p style ="font-size:12px; vertical-align:bottom; text-align:center; color:white;">${new Date(data[i].dueDate).toDateString()}</p>
                                <div class="card-actions">
                                <a onclick=undoStatus(this) data-arg1="${data[i]._id}"><i class="fas fa-undo mt-1" style="color:white;"></i></a>
                                <a onclick=updateMdlBtn(this) data-arg1="${data[i]._id}" data-arg2="${data[i].title}" data-arg3="${data[i].description}" data-arg4="${data[i].dueDate}" data-toggle="modal" data-target=".updateModal"><i class="fa fa-edit"></i></a>                                
                                <a onclick=deleteTodo(this) data-arg1="${data[i]._id}"><i class="fa fa-trash"></i></a>
                                </div>
                            </div>
                            `)
                    }
                }
            }
        })
        .fail(err =>{
            $('.main-view').empty()
            Swal.close()
            console.log(err)
        })
  }

function updateTodo(event) {
    event.preventDefault()
    
    $.ajax({
        method:'PUT',
        url: baseUrl + `/todos/${todoIdTemp}`,
        data: {
            title: $('#uptitle').val(),
            description: $('#updescription').val(),
            dueDate: $('#updueDate').val(),
            userId: localStorage.getItem('_id')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(_=>{
            $('#uptitle').val('')
            $('#updescription').val('')
            $('#updueDate').val('')
            todoIdTemp = ''
            auth()
        })
        .fail(err=>{
            $('#uptitle').val('')
            $('#updescription').val('')
            $('#updueDate').val('')
            Swal.fire('error',err.responseJSON.message[0],'error')
        })
}

let todoIdTemp

function updateMdlBtn(id) {
    let dataId = $(id).data('arg1')
    todoIdTemp = dataId
    let newTitle = $(id).data('arg2')
    let newDescription = $(id).data('arg3')
    let newDueDate = $(id).data('arg4')
    $('#uptitle').val(`${newTitle}`)
    $('#updescription').val(`${newDescription}`)
    $('#updueDate').val(`${newDueDate}`)
}

function deleteTodo(id) {
    let dataId = $(id).data('arg1')
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
                url : baseUrl + `/todos/${dataId}`,
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

function createTodo(event) {
    event.preventDefault()
    $.ajax({
        method:'POST',
        url: baseUrl + `/todos`,
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            userId: localStorage.getItem('_id')
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(_=>{
            $('#title').val('')
            $('#description').val('')
            $('#dueDate').val('')
            auth()
        })
        .fail(err=>{
            console.log(err,'errrrrrooooooooor');
            
            $('#title').val('')
            $('#description').val('')
            $('#dueDate').val('')
            Swal.fire('error',err.responseJSON.message[0],'error')
        })
}

function changeStatus(id) {
    let dataId = $(id).data('arg1')
    $.ajax({
        method:'PATCH',
        url: baseUrl + `/todos/${dataId}`,
        data: {
            status: true
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

function undoStatus(id) {
    let dataId = $(id).data('arg1')
    $.ajax({
        method:'PATCH',
        url: baseUrl + `/todos/${dataId}`,
        data: {
            status: false
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