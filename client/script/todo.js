// Get All Todos
function getAllTodos() {
  swal.fire({
    title: 'Fetching your Todo',
    onOpen: () => {
      swal.showLoading()
    }
  })

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todos',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('.title').empty()
      $('.title').append(`<h4 style="font-family: 'Special Elite', cursive;">List All TODOs</h4>`)
      $('.tbody').empty()
      if (!data.length) {
        $('.noData').empty()
        $('.noData').append(`
                    <div class="alert alert-danger text-center" style="margin-top:25px;">
                        NO DATA
                    </div>
                `)
      } else {
        $('.title').empty()
        $('.noData').empty()
        $('.title').append(`<h4 style="font-family: 'Special Elite', cursive;">List All TODOs</h4>`)
        $('.listTodo').empty()
        data.map(res => {
          $('.listTodo').append(listAll(res))
        })
      }
      swal.close()
    })
    .catch(err => {
      expairedToken(err)
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// ADD Todo
function addTodo() {
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
        url: 'http://localhost:3000/todos',
        data: value,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    })
    .then(() => {
      $('.tbody').empty()
      $('.listToday').empty()
      showToday()
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

// LIST TODAY
function showToday() {
  $('.todoUser').show()
  $('.projectDetail').hide()
  $.ajax({
    method: 'get',
    url: `${host}/todos/today`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('.listToday').empty()
      if (!data.length) {
        $('.noData').empty()
        $('.title').empty()
        $('.listTodo').empty()
        $('.title').append(`<h4 style="font-family: 'Special Elite', cursive;">List TODO Today</h4>`)
        $('.noData').append(`
                    <div class="alert alert-danger text-center">
                        NO DATA
                    </div>
                `)
      } else {
        $('.title').empty()
        $('.noData').empty()
        $('.title').append(`<h4 style="font-family: 'Special Elite', cursive;">List TODO Today</h4>`)
        $('.listTodo').empty()
        data.map(res => {
          $('.listTodo').append(listTodo(res))
        })
        swal.close()
      }
    })
    .fail(err => {
      expairedToken(err)
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// Edit TODO
function editTodo(id) {
  $.ajax({
    method: 'get',
    url: `${host}/todos/${id}`,
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
    .then(({value}) => {
      return $.ajax({
        method: 'patch',
        url: `${host}/todos/${id}/update`,
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
      $('.listTodo').empty()
      showToday()
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

// DELETE Todo
function deleteTodo(id) {
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
          url: `${host}/todos/${id}/delete`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled..' }
      }
    })
    .then(() => {
      Swal.fire(
        'Deleted!',
        'Your todo has been deleted.',
        'success'
      )
      showToday()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

// Update Status => DONE
function done(id) {
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
          url: `${host}/todos/${id}/update`,
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
      showToday()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
        showCloseButton: true
      })
    })
}

// Search Todo by Title
function searchTodoUser() {
  if (!$('#search').val()) {
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
      url: `${host}/todos/search/${$('#search').val()}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(data => {
        if (!data.length) {
          $('.listTodo').empty()
          $('.noData').empty()
          $('.noData').append(`
                    <div class="alert alert-danger text-center">
                        NO DATA
                    </div>
                `)
          swal.close()
        } else {
          $('#search').val('')
          $('.noData').empty()
          $('.listTodo').empty()
          data.map(res => {
            $('.listTodo').append(listTodo(res))
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

function listAll(res) {
  let date = convertDate(res.dueDate)
  let { title, description, status } = getTitle(res.status, res.title, res.description)
  return `
      <tr>
          <th scope="row"><i class="fas fa-angle-right fa-xs"></i></th>
          <th scope="row">${title}</th>
          <td>${description}</td>
          <td>${status}</td>
          <td>${date}</td>
          <td>
              <button class="btn btn-sm btn-outline-primary" onclick="editTodo('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
              <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${res._id}')"><i class="fas fa-trash-alt"></i></button> 
          </td>
      </tr>
      `
}

function listTodo(res) {
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
              <button class="btn btn-sm btn-outline-primary" onclick="editTodo('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
              <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${res._id}')"><i class="fas fa-trash-alt"></i></button> 
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
              <button class="btn btn-sm btn-outline-primary" onclick="editTodo('${res._id}')"><i class="fas fa-pencil-alt"></i></button> |
              <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${res._id}')"><i class="fas fa-trash-alt"></i></button> |
              <button class="btn btn-sm btn-outline-primary" onclick="done('${res._id}')"><i class="fas fa-check fa-xs"></i></button>
          </td>
      </tr>
      `
  }
}

function convertDate(date) {
  return moment(date).format('D MMM Y')
}

function getTitle(status, title, description) {
  if (status) return { title: `<strike>${title}</strike>`, description: `<strike>${description}</strike>`, status: '<div class="btn btn-success"></div>' }
  else return { title, description, status: `<div class="btn btn-warning"></div>` }
}