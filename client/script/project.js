function projectlist() {
  $('#projectlist').empty()
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/project',
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done(projects => {
      $('#listproject').empty()
      $('#listproject').append(`
        <div class="dropdown">
          <span onclick="projectModal(event)">
            <h1> +  CREATE PROJECT <h1>
          </span>
        </div>
      `)
      projects.forEach((project, i) => {
        $('#listproject').append(`
          <div class="dropdown">
            <span onclick="todoList('${project._id}')">
              ${project.name}
            </span>
            <ul class="col heightlist">
              <li class="center listmember" id="memberlist${i}">
            
              </li>
            </ul>
          </div>
        `)
        $(`#memberlist${i}`).empty()
        $(`#memberlist${i}`).append(`
          <div class="row mt-2 mr-2 center">
            <button class="form-control btn btn-danger" onclick="deleteProject(event, '${project._id}')">-DELETE PROJECT</button>
          </div>
          <div class="row mt-2 mr-2 center">
            <button class="form-control btn btn-primary" onclick="projectModal(event, '${project._id}')">+ADD MEMBER</button>
          </div>
        `)
        project.members.forEach(member => {
          $(`#memberlist${i}`).append(`
            <div class="row mt-2 mr-2">
              <h1>${member.username}</h1>
              <button class="btn btn-danger detailButton btn-xs" onclick="removeMember(event, '${project._id}', '${member._id}')">Remove</button>
            </div>
          `)
        })
      });
      swal.close()
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
}

function projectModal(event, projectId){
  event.preventDefault()
  if(projectId){
    $('#projectForm').empty()
    $('#projectForm').append(`
      <form id="addMember" style="text-align: center">
        <div class="mt-4">
          <input type="text" id="memberEmail" class="form-control" placeholder="Email">
        </div>
        <hr>
        <div class="mt-4">
          <input type="submit" class="btn btn-success" value="Add Member" onclick="addMember(event, '${projectId}')">
        </div>
      </form>
    `)
  }
  else{
    $('#projectForm').empty()
    $('#projectForm').append(`
      <form id="addProject" style="text-align: center">
        <div class="mt-4">
          <input type="text" id="projectname" class="form-control" placeholder="Project Name">
        </div>
        <hr>
        <div class="mt-4">
          <input type="submit" class="btn btn-success" value="Create Project" onclick="addProject(event)">
        </div>
      </form>
    `)
  }
  $(`#projectModal`).modal("show")
}

function addProject (event) {
  event.preventDefault()
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/project',
    data: {
      name: $('#projectname').val(),
    },
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done(result => {
      swal.close()
      $(`#projectModal`).modal("hide")
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Create Project',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          projectlist()
        })
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
    .always(() => {
      $('#projectname').val('')
    })
}

function deleteProject (event, id) {
  event.preventDefault()
  $.ajax({
    method: 'delete',
    url: `http://localhost:3000/project/${id}`,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done(result => {
      swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Delete Project',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          projectlist()
        })
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
    .always(() => {
      $('#projectname').val('')
    })
}

function addMember (event, id) {
  event.preventDefault()
  $.ajax({
    method: 'patch',
    url: `http://localhost:3000/project/${id}/add`,
    data: {
      email: $('#memberEmail').val(),
    },
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done(result => {
      swal.close()
      $(`#projectModal`).modal("hide")
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Add Member',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          projectlist()
        })
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
    .always(() => {
      $('#memberEmail').val('')
    })
}

function removeMember (event, projectId, memberId) {
  event.preventDefault()
  $.ajax({
    method: 'patch',
    url: `http://localhost:3000/project/${projectId}/remove/${memberId}`,
    headers: {
      token: localStorage.getItem('token')
    },
    beforeSend: function () {
      swal.showLoading()
    }
  })
    .done(result => {
      swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Successfully Remove Member',
        showConfirmButton: false,
        timer: 1500
      })
        .then(() => {
          projectlist()
        })
    })
    .fail(err => {
      swal.close()
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.errors,
          footer: '<a href>Why do I have this issue?</a>'
      })
    })
}