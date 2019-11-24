var HOST_SERVER = 'http://localhost:3000'
$(document).ready(function() {
    $('#NavBarStart').show()
    $('#NavBarHome').hide()
    $('#FormRegister').hide()
    $('#FormLogin').show()
    $('#content').hide()
    $('#FormToDo').hide()
    $('#FormProject').hide()
    generateToDoList()

    document.getElementById('dueDateToDo').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]

    if (localStorage.getItem('token')) {
        $('#NavBarStart').hide()
        $('#NavBarHome').show()
        $('#FormRegister').hide()
        $('#FormLogin').hide()
        $('#content').show()
        $('#FormToDo').hide()
        $('#FormProject').hide()
    }

    $('#FormRegister').submit(e => {
        swal.fire({
            title: 'registering user',
            allowOutsideClick: () => swal.isLoading(),
            showConfirmButton: false
        })
        let name = $('#nameRegister').val()
        let email = $('#emailRegister').val()
        let password = $('#passwordRegister').val()
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: HOST_SERVER + '/register',
            data: {
                name,
                email,
                password
            }
        })
        .done (result => {
            swal.close()
            swal.fire({
                type: 'success',
                title: 'success to register',
                showConfirmButton: false,
                timer: 2000
            })
            $('#content').hide()
            $('#FormRegister').hide()
            $('#FormLogin').show()
        })
        .fail (err => {
            swal.close()
            swal.fire({
                type: 'error',
                title: 'REGISTER Failed ',
                text: err.responseJSON,
                showConfirmButton: false,
                timer: 2000
            })
        })
    })

    $('#FormLogin').submit(e => {
        e.preventDefault()
        swal.fire({
            title: 'logging user',
            allowOutsideClick: () => swal.isLoading(),
            showConfirmButton: false
        })
        let email = $('#emailLogin').val()
        let password = $('#passwordLogin').val()
        $.ajax({
            url: HOST_SERVER + '/login',
            method: 'post',
            data: {
                email,
                password
            }
        })
        .done (result => {
            swal.close()
            swal.fire({
                type: 'success',
                title: 'success to login',
                showConfirmButton: false,
                timer: 2000
              })
            $('#content').show()
            $('#FormRegister').hide()
            $('#FormLogin').hide()
            $('#NavBarStart').hide()
            $('#NavBarHome').show()
            localStorage.setItem('token', result.token)
            generateToDoList()
        })
        .fail (err => {
            swal.close()
            swal.fire({
                type: 'error',
                title: 'Login Failed ',
                text: err.responseJSON,
                showConfirmButton: false,
                timer: 2000
            })
        })
    })

    $('#FormToDo').submit(e => {
        swal.fire({
            title: 'Creating ToDo',
            allowOutsideClick: () => swal.isLoading(),
            showConfirmButton: false
        })
        let title = $('#titleToDo').val()
        let description = $('#descriptionToDo').val()
        let dueDate = $('#dueDateToDo').val()
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: HOST_SERVER + '/ToDo',
            data: {
                title,
                description,
                dueDate
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done (result => {
            swal.close()
            swal.fire({
                type: 'success',
                title: 'success adding a ToDo',
                showConfirmButton: false,
                timer: 2000
            })
            $('#FormToDo').hide()
            generateToDoList()
        })
        .fail (err => {
            swal.close()
            swal.fire({
                type: 'error',
                title: 'Failed adding a ToDo',
                text: err.responseJSON,
                showConfirmButton: false,
                timer: 2000
            })
        })
    })

    $('#showToDoForm').click(e => {
        e.preventDefault()
        $('#FormToDo').show()
        $('#FormProject').hide()
        $('#all-content').empty()
    })

    $('#showProjectForm').click(e => {
        e.preventDefault()
        $('#FormToDo').hide()
        $('#FormProject').show()
        $('#all-content').empty()
    })

    $('#searchToDo').submit(e => {
        e.preventDefault()
        let search = $('#searchTitle').val()
        $.ajax({
            url: HOST_SERVER + `/ToDo/search/${search}`,
            method: 'get',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done (result => {
            $('#all-content').empty()
            cardToDoList(result)
            $('#searchTitle').val('')
            $('#FormProject').hide()
            $('#FormToDo').hide()
        })
        .fail (err => {
        })
    })
})

$('#FormWeather').submit(e => {
    e.preventDefault()
    let city = $('#location').val()
    $.ajax({
        url: HOST_SERVER + `/weather/${city}`,
        method: 'get'
    })
    .done (result => {
        $('#weatherCondition').empty()
        $('#weatherCondition').append( `
        <div class="card mt-4">
            <h3 class="card-header">Weather in: ${result.name}</h3>
            <div class="card-body">
                <h5>Today Prediction :</h5>
                <br>
                <h5> ${result.weather[0].main}</h5>
                <br>
                <p> Detail : </p>
                <br>
                <p>${result.weather[0].description}</p>
                <br>
                <p> Temperature : </p>
                <br>
                <p>${result.main.temp}K</p>
                <br>
                <p> Pressure : </p>
                <br>
                <p>${result.main.pressure}mBar</p>
                <br>
                <p> Humidity : </p>
                <br>
                <p>${result.main.humidity}%</p>
                <br>
                <p> Wind Speed : </p>
                <br>
                <p>${result.wind.speed}m/s</p>
                <br>
            </div>
        </card>
        `)
    })
    .fail (err => {
    })
})

function generateToDoList() {
    $('#FormToDo').hide()
    $('#FormProject').hide()
    $('#all-content').empty()
    swal.fire({
        imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text:'Loading Your ToDo List ...',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
    }) 
    $.ajax({
        url: HOST_SERVER + '/ToDo',
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done (result => {
        for (let i = 0; i < result.length; i++){
            cardToDoList(result[i])
        }
    })
    .fail (err => {
    })
    .always (() => {
        swal.close()
    })
}

function cardToDoList (result) {
    $('#all-content').prepend(`
    <div class="card mt-4" id="${result._id}">
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
            <button class="btn btn-danger" onclick="deleteToDo('${result._id}')">Delete</button>
            <button class="btn btn-primary" onclick="doneToDo('${result._id}')">Done</button>
            <button class="btn btn-secondary" onclick="showUpdateToDo('${result._id}')">Update</button>
            <button class="btn btn-warning" onclick="undoneToDo('${result._id}')">Undone</button>
        </div>
    </div>
    `)
    if (result.status == false) {
        $(`#${result._id}`).css('background-color', '#ff0000')
    } else {
        $(`#${result._id}`).css('background-color', 'rgb(55, 231, 31)')
    }
}

function showUpdateToDo (id) {
    $.ajax({
        url: HOST_SERVER + `/ToDo/${id}`,
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done (result => {
        $(`#${id}`).append(`
        <form id="update${id}" style="width: 100%;">
            <div class="form-title">
                <h1>Update Your ToDo</h1>
            </div>
            <div class="form-group">
                <label for="titleToDo">Title</label>
                <input type="text" class="form-control" id="title${id}" value="${result.title}">
            </div>
            <div class="form-group">
                <label for="descriptionToDo">Description</label>
                <input type="text" class="form-control" id="description${id}" value="${result.description}">
            </div>
            <div class="form-group">
                <label for="dueDateToDo">Due Date</label>
                <input type="date" class="form-control" id="dueDate${id}"  value="${result.dueDate.slice(0, 10)}">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button class="btn btn-danger" onclick="cancel('${id}')">Cancel</button>
        </form>
        `)
        document.getElementById(`dueDate${id}`).min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
        $(`#update${id}`).submit(e => {
            e.preventDefault()
            swal.fire({
                imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
                text:'Loading for Update...',
                imageWidth: 200,
                imageHeight: 200,
                showConfirmButton: false
            })

            $.ajax({
                url: HOST_SERVER + `/ToDo/${id}`,
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: $(`#title${id}`).val(),
                    description: $(`#description${id}`).val(),
                    dueDate: $(`#dueDate${id}`).val()
                }
            })
            .done (result => {
                generateToDoList()
                $(`#update${id}`).empty()
            })
            .fail (err => {
            })
        })
    })
}

function cancel(id) {
    $(`#update${id}`).empty()
}

function deleteToDo (_id) {
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
            url: HOST_SERVER + `/ToDo/${_id}`,
            method: 'DELETE',
            headers: {
            token: localStorage.getItem('token')
            }
        })
            .then(result => {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your ToDo has been deleted.',
                'success',
                2000
            )
            generateToDoList()
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
        /* Read more about handling dismissals below */
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

function doneToDo (params) {
    $.ajax({
        url: HOST_SERVER + `/ToDo/status/${params}`,
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
    })
    .fail (err => {
    })
}

function undoneToDo (params) {
    $.ajax({
        url: HOST_SERVER + `/ToDo/status/${params}`,
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
    })
    .fail (err => {
    })
}

function showRegisterForm () {
    $('#FormRegister').show()
    $('#FormLogin').hide()
}

function showLoginForm () {
    $('#FormRegister').hide()
    $('#FormLogin').show()
}

function onSignIn(googleUser) {
    swal.fire({
        title: 'Logging in user',
        allowOutsideClick: () => swal.isLoading(),
        showConfirmButton: false
    })
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        url: HOST_SERVER + '/loginGoogle',
        method: 'post',
        data: {
            token: id_token
        }
    })
    .done (result => {
        swal.close()
        swal.fire({
            type: 'success',
            title: 'User Logged In',
            showConfirmButton: false,
            timer: 2000
          })
        $('#NavBarStart').hide()
        $('#NavBarHome').show()
        $('#FormRegister').hide()
        $('#FormLogin').hide()
        $('#content').show()
        localStorage.setItem('token', result.token)
        generateToDoList()
    })
    .fail (err => {
        swal.close()
        swal.fire({
            type: 'error',
            title: 'REGISTER Failed ',
            text: err.responseJSON,
            showConfirmButton: false,
            timer: 2000
        })
    })
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    localStorage.clear()
    auth2.signOut().then(function () {
    })
    $('#NavBarStart').show()
    $('#NavBarHome').hide()
    $('#FormRegister').hide()
    $('#FormLogin').show()
    $('#content').hide()
    $('#all-content').empty()
    swal.fire({
        type: 'success',
        title: 'success to Logout',
        showConfirmButton: false,
        timer: 2000
      })
}