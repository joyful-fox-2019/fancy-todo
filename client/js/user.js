function register(){
    Swal.showLoading()
    const name = $('#register-name').val()
    const email = $('#register-email').val()
    const password = $('#register-password').val()

   $.ajax({
       method: 'post',
       url: `${baseUrl}/users/register`,
       data: {
            name, 
            email, 
            password
       }
   })
   .done(response =>{
       localStorage.setItem('token', response.token)
       resetPage()
       fetchProjects()
       fetchTodos()
       fetchSocial()
       fetchNews()
       $('#todo-page').show()
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
       Swal.close()
       $('#register-name').val('')
       $('#register-email').val('')
       $('#register-password').val('')
   })

}

function login(){
    Swal.showLoading()
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    $.ajax({
        method: 'post',
        url: `${baseUrl}/users/login`,
        data: {
            email,
            password
        }
    })
    .done(response =>{
        localStorage.setItem('token', response.token)
        resetPage()
        fetchProjects()
        fetchTodos()
        fetchSocial()
        fetchNews()
        $('#todo-page').show()
    })
    .fail(err =>{
        err.responseJSON.forEach(error => {
            PNotify.error(error)
        });
    })
    .always(()=>{
        Swal.close()
        $('#login-email').val('')
        $('#login-password').val('')
    })
}

function logout(){
    localStorage.removeItem('token')
    resetPage()
    $('#landing-page').show()
    $('#todos').html('')
    $('#projects').html('')
}

function googleLogin(){
    resetPage()
    $('#todo-page').show()
}