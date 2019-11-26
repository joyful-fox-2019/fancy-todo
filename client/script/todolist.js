function toDoList(){
  $.ajax({
    method: 'get',
    url: `${baseURL}/todo`,
    headers: {
      accesstoken: localStorage.getItem('token')
    }
  })
  .done((response) => {
    findAllToDo(response)  
    // Swal.close()
  })
  .fail(err=>{
    console.log(err);
  })
}

function findAllToDo(toDoData){
  let list = toDoData
  console.log(list, 'function')
  if (!list.length){
    $('#todolist').append(`<h4>TO DO LIST IS EMPTY</h4>`)
  } else {
    list.forEach(element => {
      let date = convertDate(element.dueDate)
      let { title, description, status } = getStatus(element.status, element.title, element.description)
      $('#todolist').append(
        `<div class="ui card" style="width: 100%;">
          <div class="content">
          <button class="ui icon button right floated" onclick="deleteTodo('${element._id}')" data-tooltip="Delete To Do List">
            <i class="window close icon"></i>
          </button>
          <button class="ui icon button right floated"  onclick="updatedStatus('${element._id}')" data-tooltip="Change Status To Do List">
            <i class="thumbs up icon"></i>
          </button>
          <button class="ui icon button right floated"  onclick="editTodo('${element._id}')" data-tooltip="Edit To Do List" id="showmodalupdate">
          
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


function createToDo(){
  let title = $('#titletodo').val()
  let description = $('#descriptiontodo').val()
  let dueDate = $('#duedatetodo').val()

  Swal.showLoading();

  $.ajax({
    url: `${baseURL}/todo`,
    method: `post`,
    headers:{
      accesstoken: localStorage.getItem('token')
    },
    data: {
      title, description, dueDate
    }
  })
    .done(({ data }) => {
      $(".test").modal({
        closable: true
      });
      Swal.close()
      Swal.fire('Success!', "Your Todo is Created!", 'success')
      toDoList()
    })
    .fail(err => {
      let error = err.responseJSON
      Swal.fire("Error!", `${error.message}`, "error");
    })
    .always(() => {
      $('#titletodo').val('')
      $('#descriptiontodo').val('')
      $('#duedatetodo').val('')
    })
}

function editTodo(id){
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
        url: `${baseURL}/todo/${id}`,
        data: value,
        headers: {
          accesstoken: localStorage.getItem('token')
        }
      })
    })
    .then(_ => {
      swal.fire({
        type: 'success',
        title: 'Success Todo Updated'
      })
      $('#todolist').empty()
      toDoList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.responseJSON}`,
        showCloseButton: true
      })
    })
}

function deleteTodo(id){
  console.log(id)
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
          url: `${baseURL}/todo/${id}`,
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
        'Your Todo Deleted',
        'success'
      )
      $('#todolist').empty()
      toDoList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

function updatedStatus(id){
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
          url: `${baseURL}/todo/${id}`,
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
        'Your Todo Status Updated',
        'success'
      )
      $('#todolist').empty()
      toDoList()
    })
    .catch(err => {
      swal.fire({
        title: `${err.message}`,
      })
    })
}

$(function(){
  $("#showmodal").click(function(){
    $(".test").modal('show');
  });
  
  $(".test").modal({
    closable: true
  });
  
  
  $('#duedate').calendar({
    type: 'date',
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return '';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + month + '-' + day;
      }
    }
  });
})


function convertDate(date) {
  return moment(date).format('D MMM Y')
}

function getStatus(status, title, description) {
  if (status) return { title: `<strike>${title}</strike>`, description: `<strike>${description}</strike>`, status: `<div class="ui button primary" data-tooltip="Your To Do List Completed" data-position="top center">Completed</div>` }
  else return { title, description, status: `<div class="ui button" data-tooltip="Your To Do List Uncompleted" data-position="top center">Uncompleted</div>` }
}
