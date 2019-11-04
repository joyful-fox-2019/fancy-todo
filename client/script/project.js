// Get All Project
function getProject() {
  $.ajax({
    method: 'get',
    url: `${host}/project`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      $('.project').empty()
      $('.noDataProject').empty()
      if (data.length) {
        data.forEach(res => {
          $('.project').append(listProject(res))
        })
      } else {
        $('.noDataProject').append(`
          <div class="alert alert-danger text-center" style="margin-top:25px;">
            NO PROJECT
          </div>
        `)
      }
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// DELETE PROJECT
function deleteProject(id) {
  swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'delete',
          url: `${host}/project/${id}/delete`,
          headers: {
            token: localStorage.token
          }
        })
      } else {
        throw { message: 'canceled..' }
      }
    })
    .then(() => {
      Swal.fire(
        'Deleted!',
        'Your project has been deleted.',
        'success'
      )
      getProject()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

// Create Project
function createProject() {
  const { value: formValues } = Swal.fire({
    title: 'Create new Project',
    html:
      '<input id="name" class="swal2-input" placeholder="Your Project Name">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        name: $('#name').val()
      }
    }
  })
    .then(({ value }) => {
      return $.ajax({
        method: 'post',
        url: `${host}/project/create`,
        data: value,
        headers: {
          token: localStorage.token
        }
      })
    })
    .then(_ => {
      $('#name').val('')
      swal.fire({
        type: 'success',
        title: 'success creating project..',
        showCloseButton: true
      })
      getProject()
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// ADD Member
function addMember(projectId) {
  Swal.fire({
    title: 'Create new Project',
    html:
      '<input id="findUser" class="swal2-input" placeholder="Your Project Name" onkeyup="getUser()">' +'<input type="hidden" class="id">' + '<div id="p"></div>',
    focusConfirm: false,
    preConfirm: () => {
      return {
        id: $('.id').val()
      }
    }
  })
    .then(({ value }) => {
      return $.ajax({
        method: 'post',
        url: `${host}/project/${projectId}/addMember`,
        data: {
          userId: value.id
        },
        headers: {
          token: localStorage.token
        }
      })
    })
    .then(_ => {
      $('#findUser').val('')
      $('.id').val('')
      getProject()
      getDetail(projectId)
      swal.fire({
        type: 'success',
        title: 'Add member to your project is successfully..',
        showCloseButton: true
      })
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// DELETE Member
function deleteMember(idUser) {
  let projectId = $('.idProject').val()
  swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'delete',
          url: `${host}/project/${projectId}/${idUser}/delete`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled..' }
      }
    })
    .then(_ => {
      getProject()
      getDetail(projectId)
      Swal.fire(
        'Deleted!',
        'Selected member has been deleted.',
        'success'
      )
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
      })
    })
}

// Leave Group project
function leaveGroup() {
  let projectId = $('.idProject').val()
  swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'delete',
          url: `${host}/project/${projectId}/leaveProject`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled..' }
      }
    })
    .then(() => {
      getProject()
      getDetail(projectId)
      Swal.fire(
        'Deleted!',
        'Leave Group success!',
        'success'
      )
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`
      })
    })
}

// GET User
function getUser() {
  $('#p').empty()
  let data = $('#findUser').val()
  if (data) {
    $.ajax({
      method: 'get',
      url: `${host}/users/${data}`
    })
      .done(data => {
        $('#p').empty()
        data.map(res => {
          $('#p').append(`<div class="p" onclick="selectUser('${res._id}', '${res.username}')"><span>${res.username}</span> <span class="text-muted" style="font-size: 14px">${res.email}</span></div>`)
        })
      })
  }
}

// Select User
function selectUser(id, username) {
  $('#p').empty()
  $('#findUser').val(username)
  $('.id').val(id)
}

$('.detail').on('click', (e) => {
  e.preventDefault()
})

// GET Detail Project
function getDetail(projectId) {
  swal.fire({
    title: 'Fetching your Project',
    onOpen: () => {
      swal.showLoading()
    }
  })

  $('.todoUser').hide()
  $('.projectDetail').show()
  getTodoProject(projectId)
  $.ajax({
    method: 'get',
    url: `${host}/project/${projectId}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('.projectName').empty()
      $('.listMember').empty()
      $('.projectName').append(`<h4 style="font-family: 'Special Elite', cursive;text-align: center">${data.name}</h4><input class="idProject" type="hidden" value=${projectId}>`)
      data.members.forEach((el, i) => {
        if (i == 0) {
          $('.listMember').append(`
          <tr>
            <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
            <td>${el.username}</td>
            <td>Owner</td>
            <td>${el.email}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger disabled"><i class="fas fa-trash-alt"></i></button> 
            </td>
          </tr>
          `)
        } else if (el.username == localStorage.getItem('username')) {
          $('.listMember').append(`
          <tr>
            <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
            <td>${el.username}</td>
            <td>members</td>
            <td>${el.email}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="leaveGroup('${el._id}')"><i class="fas fa-trash-alt"></i>Leave</button> 
            </td>
          </tr>
          `)
        } else if (data.members[0].username !== localStorage.getItem('username')) {
          $('.listMember').append(`
          <tr>
            <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
            <td>${el.username}</td>
            <td>members</td>
            <td>${el.email}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger disabled"><i class="fas fa-trash-alt"></i></button> 
            </td>
          </tr>
          `)
        } else {
          $('.listMember').append(`
          <tr>
            <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
            <td>${el.username}</td>
            <td>members</td>
            <td>${el.email}</td>
            <td>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteMember('${el._id}')"><i class="fas fa-trash-alt"></i></button> 
            </td>
          </tr>
          `)
        }
      })
      swal.close()
    })
    .fail(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// Get TODO Project
function getTodoProject(projectId) {
  $.ajax({
    method: 'get',
    url: `${host}/project/${projectId}/todos`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('.todoProject').empty()
      if (!data.length) {
        $('.noData').empty()
        $('.noData').append(`
            <div class="alert alert-danger text-center" style="margin-top:25px;">
                NO DATA
            </div>
        `)
      } else {
        $('.noData').empty()
        data.map(el => {
          $('.todoProject').append(listTodoProject(el))
        })
      }
    })
    .fail(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// Add Todo Project
function addTodo() {
  let projectId = $('.idProject').val()
  const { value: formValues } = Swal.fire({
    title: 'Create new TODO',
    html:
      '<input id="title" class="swal2-input" placeholder="title">' +
      '<input id="description" class="swal2-input" placeholder="description">' +
      '<input type="date" id="dueDate" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value,
      }
    }
  })
    .then(({ value }) => {
      return $.ajax({
        method: 'post',
        url: `${host}/project/${projectId}/addTodo`,
        data: value,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    })
    .then(() => {
      $('.todoProject').empty()
      getTodoProject(projectId)
      swal.fire({
        type: 'success',
        title: 'success..',
      })
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// Edit TODO
function editTodoProject(idTodo) {
  let projectId = $('.idProject').val()
  $.ajax({
    method: 'get',
    url: `${host}/todos/${idTodo}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(data => {
      return { value: formValues } = Swal.fire({
        title: 'Edit your TODO',
        html:
          `<input id="title" class="swal2-input" value="${data.title}">` +
          `<input id="description" class="swal2-input" value="${data.description}">`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            title: $('#title').val(),
            description: $('#description').val(),
          }
        }
      })
    })
    .then(({ value }) => {
      return $.ajax({
        method: 'patch',
        url: `${host}/project/${projectId}/${idTodo}/update`,
        data: value,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    })
    .then(_ => {
      swal.fire({
        type: 'success',
        title: 'success updating todo..'
      })
      $('.todoProject').empty()
      getTodoProject(projectId)
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// Update Status => DONE
function doneTodoProject(idTodo) {
  let projectId = $('.idProject').val()
  swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'patch',
          url: `${host}/project/${projectId}/${idTodo}/update`,
          data: {
            status: true
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled..' }
      }
    })
    .then(() => {
      $('.todoProject').empty()
      getTodoProject(projectId)
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
        showCloseButton: true
      })
    })
}

// Search Todo by Title
function searchTodo() {
  let projectId = $('.idProject').val()
  if (!$('#searchTodoProject').val()) {
    swal.fire({
      title: `Please input keyword for search!`,
      showCloseButton: true
    })
  } else {
    swal.fire({
      title: 'Searching Todo',
      onOpen: () => {
        swal.showLoading()
      }
    })
    $.ajax({
      method: 'get',
      url: `${host}/project/${projectId}/${$('#searchTodoProject').val()}/search`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(data => {
        if (!data.length) {
          $('.todoProject').empty()
          $('.noData').empty()
          $('.noData').append(`
                    <div class="alert alert-danger text-center">
                        NO DATA
                    </div>
                `)
          swal.close()
        } else {
          $('#searchTodoProject').val('')
          $('.noData').empty()
          $('.todoProject').empty()
          data.map(res => {
            $('.todoProject').append(listTodoProject(res))
          })
          swal.close()
        }
      })
      .catch(err => {
        swal.fire({
          title: `${err.responseJSON}`,
          showCloseButton: true
        })
      })
  }
}

// DELETE Todo
function deleteTodoProject(idTodo) {
  let projectId = $('.idProject').val()
  swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then(result => {
      if (result.value) {
        return $.ajax({
          method: 'delete',
          url: `${host}/project/${projectId}/${idTodo}/deleteTodo`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled..' }
      }
    })
    .then(_ => {
      Swal.fire(
        'Deleted!',
        'Your todo has been deleted.',
        'success'
      )
      $('.todoProject').empty()
      getTodoProject(projectId)
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`
      })
    })
}


function listProject(res) {
  if (res.members[0].username == localStorage.getItem('username')) {
    return `
      <div class="card border-success mb-3  text-center">
        <div class="card-header bg-transparent border-success" style="font-weight: bold">${res.name}</div>
        <div class="card-body text-success">
          <h5 class="card-title"><i class="fas fa-users" style="margin-right: 10px"></i>${res.members.length} members</h5>
          <a href='#' class="detail" onclick="getDetail('${res._id}')"> Detail </a>
        </div>
        <div class="card-footer bg-transparent border-success">
          <button class="btn btn-sm btn-outline-primary" onclick="addMember('${res._id}')"><i
              class="fas fa-user-plus"></i>Add member</button> |
          <button class="btn btn-sm btn-outline-danger" onclick="deleteProject('${res._id}')"><i
              class="fas fa-trash-alt"></i>Delete Project</button>
        </div>
      </div>`
  } else {
    return `
      <div class="card border-success mb-3  text-center">
        <div class="card-header bg-transparent border-success" style="font-weight: bold">${res.name}</div>
        <div class="card-body text-success">
          <h5 class="card-title"><i class="fas fa-users" style="margin-right: 10px"></i>${res.members.length} members</h5>
          <a href='#' class="detail" onclick="getDetail('${res._id}')"> Detail </a>
        </div>
        <div class="card-footer bg-transparent border-success">
          <button class="btn btn-sm btn-outline-primary" onclick="addMember('${res._id}')"><i
              class="fas fa-user-plus"></i>Add member</button> |
          <button class="btn btn-sm btn-outline-danger disabled"><i
              class="fas fa-trash-alt"></i>Delete Project</button>
        </div>
      </div>`
  }
}


function listTodoProject(res) {
  let date = convertDate(res.dueDate)
  let { title, description, status } = getTitle(res.status, res.title, res.description)
  if (res.status) {
    return `
      <tr>
          <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
          <th scope="row">${title}</th>
          <td>${description}</td>
          <td>${status}</td>
          <td>${date}</td>
          <td>
              <button class="btn btn-sm btn-outline-primary" onclick="editTodoProject('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
              <button class="btn btn-sm btn-outline-danger" onclick="deleteTodoProject('${res._id}')"><i class="fas fa-trash-alt"></i></button> 
          </td>
      </tr>
      `
  } else {
    return `
      <tr>
          <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
          <th scope="row">${title}</th>
          <td>${description}</td>
          <td>${status}</td>
          <td>${date}</td>
          <td>
              <button class="btn btn-sm btn-outline-primary" onclick="editTodoProject('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
              <button class="btn btn-sm btn-outline-danger" onclick="deleteTodoProject('${res._id}')"><i class="fas fa-trash-alt"></i></button> |
              <button class="btn btn-sm btn-outline-primary" onclick="doneTodoProject('${res._id}')"><i class="fas fa-check fa-xs"></i></button>
          </td>
      </tr>
      `
  }
}
