function projectList(){
  $.ajax({
    method: 'get',
    url: `${baseURL}/project`,
    headers: {
      accesstoken: localStorage.getItem('token')
    }
  })
  .done((response) => {
    findAllProject(response) 
  })
  .fail(err=>{
    console.log(err);
  })
}

function findAllProject(projectData){
  let list = projectData
  if (!list.length){
    $('#projectlist').append(`<h4>Project IS EMPTY</h4>`)
  } else {
    list.forEach(element => {
      let date = convertDate(element.createdAt)
      $('#projectlist').append(`
        <div class="ui card" onclick="todoproject('${element._id}')" style="width: 100%;">
          <div class="image">
            <img src="./src/0-90_people-24-icons-animals-png-icon.png">
          </div>
          <div class="content">
            <button class="ui icon button right floated" onclick="deleteproject('${element._id}')" data-tooltip="Delete Project">
              <i class="window close icon"></i>
            </button>
            <button class="ui icon button right floated" onclick="addmemberproject('${element._id}')" data-tooltip="Add Member Project">
              <i class="add icon"></i>
            </button>
            <a class="center aligned header">${element.title}</a>
          </div>
          <div class="extra content">
            <a>
              <i class="user icon"></i>
              member: ${element.members.length}
            </a>
            <span class="right floated">
              Created At ${date}
            </span>
          </div>
        </div>`
      )
    });
  }
}

function createproject(){
  $.ajax({
    url: `${baseURL}/project/user`,
    method: `get`,
    headers:{
      accesstoken: localStorage.getItem('token')
    }
  })
    .then(data => {
      var options = {};
      data.map(el => {
        options[el._id] = el.name;
      })

      return { value } = Swal.fire({
        title: 'Create Project',
        input: 'select',
        inputOptions: options,
        inputPlaceholder: 'required',
        html:`
          <label>Title</label>
          <input id="title" class="swal2-input" placeholder="Project ..."
          <label>Members</label>
          `,
        focusConfirm: false,
        preConfirm: function (members) {
          return new Promise(function (resolve) {
              resolve({members: members, title: document.getElementById('title').value})
          });
        }
      })
    })
    .then(({ value }) => {
      return $.ajax({
        method: 'post',
        url: `${baseURL}/project`,
        data: value,
        headers: {
          accesstoken: localStorage.getItem('token')
        }
      })
    })
    .then(_ => {
      swal.fire({
        type: 'success',
        title: 'Success Created Project'
      })
      $('#projectlist').empty()
      projectList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

function addmemberproject(id){
  $.ajax({
    url: `${baseURL}/project/user`,
    method: `get`,
    headers:{
      accesstoken: localStorage.getItem('token')
    }
  })
    .then(data => {
      var options = {};
      data.map(el => {
        options[el._id] = el.name;
      })

      return { value } = Swal.fire({
        title: 'Add Member Project',
        input: 'select',
        inputOptions: options,
        inputPlaceholder: 'required',
        focusConfirm: false,
        preConfirm: function (userId) {
          return new Promise(function (resolve) {
              resolve({ userId: userId })
          });
        }
      })
    })
    .then(({ value }) => {
      return $.ajax({
        method: 'patch',
        url: `${baseURL}/project/member/${id}`,
        data: value,
        headers: {
          accesstoken: localStorage.getItem('token')
        }
      })
    })
    .then(_ => {
      swal.fire({
        type: 'success',
        title: 'Success Add Member To Project'
      })
      $('#projectlist').empty()
      projectList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

function deleteproject(id){
  swal.fire({
    title: 'Are you sure to Delete?',
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
          url: `${baseURL}/project/${id}`,
          headers: {
            accesstoken: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled' }
      }
    })
    .then(() => {
      Swal.fire(
        'Deleted!',
        'Your project Deleted',
        'success'
      )
      $('#projectlist').empty()
      projectList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

function todoproject(id){
  localStorage.setItem('project', id)
  $.ajax({
    method: 'get',
    url: `${baseURL}/project/todo/${id}`,
    headers: {
      accesstoken: localStorage.getItem('token')
    }
  })
  .done((response) => {
    $('#todolistproject').empty()
    $('#btn-add-todo-project').empty()
    findAllTodoProject(response) 
  })
  .fail(err=>{
    console.log(err);
  })
}

function findAllTodoProject(listTodoProject){
  let list = listTodoProject
  if (!list.length){
    $('#todolistproject').append(`<h4>TO DO LIST IS EMPTY</h4>`)
    $('#btn-add-todo-project').append(`
      <button class="addtodo ui primary basic button" onclick="createtodoproject()">
        <i class="icon mail"></i>
        Create Todo Project
      </button>
    `
    )
  } else {
    $('#btn-add-todo-project').append(`
      <button class="addtodo ui primary basic button" onclick="createtodoproject()">
        <i class="icon mail"></i>
        Create Todo Project
      </button>
    `
    )
    list.forEach(element => {
      let date = convertDate(element.dueDate)
      let { title, description, status } = getStatus(element.status, element.title, element.description)
      $('#todolistproject').append(`
        <div class="ui card" style="width: 100%;">
          <div class="content">
          <button class="ui icon button right floated" onclick="deleteTodoProject('${element._id}')" data-tooltip="Delete To Do List">
            <i class="window close icon"></i>
          </button>
          <button class="ui icon button right floated"  onclick="updatedStatusProject('${element._id}')" data-tooltip="Change Status To Do List">
            <i class="thumbs up icon"></i>
          </button>
          <button class="ui icon button right floated"  onclick="editTodoProject('${element._id}')" data-tooltip="Edit To Do List" id="showmodalupdate">
          
            <i class="pencil alternate icon"></i>
          </button>

            <div class="header">${title}</div>
            <div class="meta">Due Date : ${date}</div>
            <div class="description">
              <p> ${description} </p>
            </div>
          </div>
          <div class="extra content">
            <div class="center aligned author">
              ${status}
            </div>
          </div>
        </div>`
      )
    });
  }
}

function createtodoproject(){
  const id = localStorage.getItem('project')
  console.log(id)
  const  { value: formValues } = Swal.fire({
    title: 'Created Project TODO',
    html:`
      <label>Title</label>
      <input id="titletodoproject" class="swal2-input" >
      <label>Description</label>
      <input id="descriptiontodoproject" class="swal2-input" >,
      <label>Due Date</label>
      <input id="duedatetodoproject" type="date" class="swal2-input" >`,
    focusConfirm: false,
    preConfirm: () => {
      return {
        title: $('#titletodoproject').val(),
        description: $('#descriptiontodoproject').val(),
        dueDate: $('#duedatetodoproject').val()
      }
    }
  })
    .then(({ value }) => {
      $.ajax({
        method: 'post',
        url: `${baseURL}/project/todo/${id}`,
        data: value,
        headers: {
          accesstoken: localStorage.getItem('token')
        }
      })
    })
    .then(_ => {
      swal.fire({
        type: 'success',
        title: 'Success Created Todo Project'
      })
      $('#todolistproject').empty()
      todoproject(id)
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

function editTodoProject(id){
  const idproject = localStorage.getItem('project')
  $.ajax({
    url: `${baseURL}/todo/one/${id}`,
    method: `get`,
    headers:{
      accesstoken: localStorage.getItem('token')
    }
  })
    .then(data => {
      return { value: formValues } = Swal.fire({
        title: 'Edit your TODO',
        html:`
          <label>Title</label>
          <input id="title" class="swal2-input" value="${data.title}">
          <label>Description</label>
          <input id="description" class="swal2-input" value="${data.description}">`,
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
        method: 'put',
        url: `${baseURL}/project/todo/${idproject}/${id}`,
        data: value,
        headers: {
          accesstoken: localStorage.getItem('token')
        }
      })
    })
    .then(_ => {
      swal.fire({
        type: 'success',
        title: 'Success Todo Project Updated'
      })
      $('#todolistproject').empty()
      todoproject(idproject)
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

function deleteTodoProject(id){
  const idproject = localStorage.getItem('project')

  swal.fire({
    title: 'Are you sure to Delete?',
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
          url: `${baseURL}/project/todo/${idproject}/${id}`,
          headers: {
            accesstoken: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled' }
      }
    })
    .then(() => {
      Swal.fire(
        'Deleted!',
        'Your Project Todo Deleted',
        'success'
      )
      $('#todolistproject').empty()
      todoproject(idproject)
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

function updatedStatusProject(id){
  const idproject = localStorage.getItem('project')
  swal.fire({
    title: 'Are you sure to Change Status?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Change it!'
  })
    .then( result => {
      if(result.value){
        return $.ajax({
          method: 'put',
          url: `${baseURL}/project/todo/${idproject}/${id}`,
          data: { status: true },
          headers: {
            accesstoken: localStorage.getItem('token')
          }
        })
      } else {
        throw { message: 'canceled' }
      }
    })
    .then(() => {
      Swal.fire(
        'Updated!',
        'Your Todo Project Status Updated',
        'success'
      )
      $('#todolistproject').empty()
      todoproject(idproject)
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}