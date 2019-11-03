function generateProjectList() {
    $('#all-content').empty()
    swal.fire({
        imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text:'Loading for Update...',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
    })
    $.ajax({
        url: HOST_SERVER + '/Project',
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done (result => {
        for (let i = 0; i < result.result.length; i++) {
            cardProject(result.result[i])
        }
    })
    .fail (err => {
        swal.fire({
            type: 'error',
            title: 'Terjadi kesalahan dengan server'
        })
    })
    .always (() => {
        swal.close()
    })
}

function cardProject(result) {
    $('#all-content').prepend(`
    <div class="card mt-4" id="Project${result._id}">
        <h5 class="card-header">${result.name}</h5>
        <div class="card-body">
            <p>Total Member: ${result.MemberId.length}</p>
            <br>
            <p>Total ToDo: ${result.ToDoId.length}</p>
            <br>
            <p>Owner: ${result.OwnerId.name}</p>
            <br>
        </div>
        <div class="card-footer">
            <button class="btn btn-danger" onclick="deleteProject('${result._id}')">Delete</button>
            <button class="btn btn-primary" onclick="showAddMemberForm('${result._id}')">AddMember</button>
            <button class="btn btn-primary" onclick="showCreateToDoProject('${result._id}')">Create ToDo</button>
            <button class="btn btn-primary" onclick="showListToDoProject('${result._id}')">Show ToDo List</button>
        </div>
    </div>
    <br>
    <div id='Project-content${result._id}'></div>
`)
}

function showListToDoProject(data) {
    $(`#Project-content${data}`).empty()
    $.ajax({
        url: HOST_SERVER + `/Project/ToDo/${data}`,
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done (result => {
        for (let i = 0; i < result.ToDoId.length; i++) {
            cardToDoProject(result.ToDoId[i], data)
        }
    })
    .fail (err => {

    })
    .always (() => {

    })
}

function cardToDoProject(result, id) {
    $(`#Project-content${id}`).prepend(`
    <div class="card mt-4" id="ListToDo${result._id}">
        <h5 class="card-header">
            ${result.title}
        </h5>
        <div class="card-body">
            <h6>${result.description}</h6>
            <br>
            <p> Due Date : ${result.dueDate.slice(0, 10)} </p>
            <br>
        </div>
        <div class="card-footer">
            <button class="btn btn-danger" onclick="deleteProjectToDo('${result._id}', '${id}')">Delete</button>
            <button class="btn btn-primary" onclick="doneProjectToDo('${result._id}', '${id}')">Done</button>
            <button class="btn btn-secondary" onclick="showUpdateProjectToDo('${result._id}', '${id}')">Update</button>
            <button class="btn btn-warning" onclick="undoneProjectToDo('${result._id}', '${id}')">Undone</button>
        </div>
    </div>
    <div id='UpdateToDoProject${result._id}'></div>
    `)
    if (result.status == false) {
        $(`#ListToDo${result._id}`).css('background-color', '#ff0000')
    } else {
        $(`#ListToDo${result._id}`).css('background-color', 'rgb(55, 231, 31)')
    }
}

function deleteProjectToDo(params, id) {
    let swalWithBootstrapButtons = swal.mixin({
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
      })
    .then((result) => {
        if (result.value) {
        $.ajax({
            url: HOST_SERVER + `/Project/ToDo/${params}`,
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id
            }
        })
            .then (result => {
                generateProjectList()
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your ToDo has been deleted.',
                    'success',
                    2000
                )
            })
            .catch(() => {
                swal.fire({
                    type: 'error',
                    title: "You're unauthorize to delete this ToDo",
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        } else if (
        result.dismiss === swal.DismissReason.cancel
        ) {
        swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your ToDo is safe',
            'error'
        )
        }
    })
    .catch(() => {
        swal.close()
        swal.fire({
        type: 'error',
        title: 'Failed deleting ToDO',
        showConfirmButton: false,
        timer: 2000
        })
    })
}

function showUpdateProjectToDo(params, id) {
    $(`#UpdateToDoProject${params}`).empty()
    $.ajax({
        url: HOST_SERVER + `/Project/ToDo/get/${params}`,
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done (result => {
        $(`#UpdateToDoProject${params}`).append(`
        <form id="updateToDoProjectForm${params}" style="width: 100%;">
            <div class="form-title">
                <h1>Update Your ToDo</h1>
            </div>
            <div class="form-group">
                <label for="titleToDo">Title</label>
                <input type="text" class="form-control" id="titleToDoProject${params}" value="${result.title}">
            </div>
            <div class="form-group">
                <label for="descriptionToDo">Description</label>
                <input type="text" class="form-control" id="descriptionToDoProject${params}" value="${result.description}">
            </div>
            <div class="form-group">
                <label for="dueDateToDo">Due Date</label>
                <input type="date" class="form-control" id="dueDateToDoProject${params}"  value="${result.dueDate.slice(0, 10)}">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button class="btn btn-danger" onclick="cancelUpdateToDo('${params}')">Cancel</button>
        </form>
        `)
        document.getElementById(`dueDateToDoProject${params}`).min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]

        $(`#updateToDoProjectForm${params}`).submit(e => {
            e.preventDefault()
            swal.fire({
                imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
                text:'Loading for Update...',
                imageWidth: 200,
                imageHeight: 200,
                showConfirmButton: false
            })

            $.ajax({
                url: HOST_SERVER + `/Project/ToDo/${params}`,
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: $(`#titleToDoProject${params}`).val(),
                    description: $(`#descriptionToDoProject${params}`).val(),
                    dueDate: $(`#dueDateToDoProject${params}`).val()
                }
            })
            .done (result => {
                $(`#updateToDoProject${params}`).empty()
                showListToDoProject(id)
            })
            .fail (err => {
            })
            .always (() => {
                swal.close()
            })
        })
    })
    .fail (err => {

    })
    .always (() => {
        swal.close()
    })
}

function cancelUpdateToDo(params) {
    $(`#UpdateToDoProject${params}`).empty()
}

function doneProjectToDo (params, id) {
    $.ajax({
        url: HOST_SERVER + `/Project/ToDo/status/${params}`,
        method: 'patch',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            status: true
        }
    })
    .done (result => {
        $(`#${params}`).css('background-color', 'rgb(55, 231, 31)')
        showListToDoProject(id)
    })
    .fail (err => {

    })
}

function undoneProjectToDo (params, id) {
    $.ajax({
        url: HOST_SERVER + `/Project/ToDo/status/${params}`,
        method: 'patch',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            status: false
        }
    })
    .done (result => {
        $(`#${params}`).css('background-color', '#ff0000')
        showListToDoProject(id)
    })
    .fail (err => {
    })
}

function deleteProject(data) {
    let swalWithBootstrapButtons = swal.mixin({
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
      })
    .then((result) => {
        if (result.value) {
        $.ajax({
            url: HOST_SERVER + `/Project/${data}`,
            method: 'DELETE',
            headers: {
            token: localStorage.getItem('token')
            }
        })
            .then(result => {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your Project has been deleted.',
                'success',
                2000
            )
            generateProjectList()
            })
            .catch(() => {
            swal.fire({
                type: 'error',
                title: "You're unauthorize to delete this Project",
                showConfirmButton: false,
                timer: 2000
            })
            })
        } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
        ) {
        swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Project is safe',
            'error'
        )
        }
    })
    .catch(() => {
        swal.close()
        swal.fire({
            type: 'error',
            title: 'Failed deleting Project',
            showConfirmButton: false,
            timer: 2000
        })
    })
}

function showCreateToDoProject(params) {
    $(`#Project-content${params}`).empty()
    $(`#Project-content${params}`).append(`
    <form id="FormToDo${params}" style="width: 100%;">
        <div class="form-title">
            <h1>Create Your ToDo Project</h1>
        </div>
        <div class="form-group">
            <label for="titleToDo">Title</label>
            <input type="text" class="form-control" id="titleToDo${params}" placeholder="Enter title">
        </div>
        <div class="form-group">
            <label for="descriptionToDo">Description</label>
            <input type="text" class="form-control" id="descriptionToDo${params}" placeholder="Enter Description">
        </div>
        <div class="form-group">
            <label for="dueDateToDo">Due Date</label>
            <input type="date" class="form-control" id="dueDateToDo${params}">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `)
    document.getElementById(`dueDateToDo${params}`).min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
    $(`#FormToDo${params}`).submit(e => {
        e.preventDefault()
        let title = $(`#titleToDo${params}`).val()
        let description = $(`#descriptionToDo${params}`).val()
        let dueDate = $(`#dueDateToDo${params}`).val()
        $.ajax({
            url: HOST_SERVER + '/Project/ToDo',
            method: 'post',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                title,
                description,
                dueDate,
                _id: params
            }
        })
        .done (result => {
            generateProjectList()
        })
        .fail (err => {
        })
    })
}

function showAddMemberForm(result) {
    $(`#Project-content${result}`).empty()
    $.ajax({
        url: HOST_SERVER,
        method: 'get'
    })
    .done (data => {
        for (let i = 0; i < data.result.length; i++ ){
            $(`#Project-content${result}`).append(`
                <p>${data.result[i].email}</p>
                <button class="btn btn-primary" onclick="addMemberProject('${data.result[i]._id}', '${result}')">Add Member</button>
            `)
        }
    })
    .fail (err => {
    })
    .always (() => {

    })
}

function addMemberProject(member, _id) {
    $.ajax({
        url: HOST_SERVER + `/Project/addMember/${_id}`,
        method: 'post',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            member
        }
    })
    .done (result => {
        $(`#Project-content${_id}`).empty()
        generateProjectList()
    })
    .fail (err => {
        swal.fire({
            type: 'error',
            title: "You're unauthorize to addMember in this Project",
            showConfirmButton: false,
            timer: 2000
        })
    })
}

$('#FormProject').submit(e => {
    e.preventDefault()
    let name = $('#nameProject').val()
    swal.fire({
        imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text:'Loading for Update...',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
    })
    $.ajax({
        url: HOST_SERVER + '/project',
        method: 'post',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name
        }
    })
    .done (result => {
        $('#FormProject').hide()
        $('#nameProject').val('')
        generateProjectList()
    })
    .fail (err => {
    })
    .always (() => {
        swal.close()
    })
})
