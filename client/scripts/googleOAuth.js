function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/google-signin',
        data:{
            googleToken: id_token
        }
    })
    .done(response=>{
        console.log(response);
        localStorage.setItem('ft_token', response.token);
        localStorage.setItem('ft_username', response.username);
        localStorage.setItem('ft_picture', response.picture);
        $('#ft_username').html(localStorage.getItem('ft_username'))
        if(localStorage.getItem('ft_picture') !== 'undefined'){
            $('#ft_picture').attr('src', `data:image/png;base64,${localStorage.getItem('ft_picture')}`)
        }
        else{
            $('#ft_picture').attr('src', `./images/img_avatar5.png`)
        }
        Swal.fire({
            title: `Welcome, ${localStorage.getItem('ft_username')}!`,
            type: 'success',
            confirmButtonText: `Hi`
        })
        $('.form-wrap').hide();
        $('.main_content').show();

        $.ajax({
            method: 'get',
            url: `http://localhost:3000/todos/`,
            headers: {
                ft_token: localStorage.getItem('ft_token')
            }
        })
            .done(todos => {
                printTodos(todos);
            })
    })
    .fail(err=>{
        console.log(err);
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('ft_picture');
        localStorage.removeItem('ft_username');
        localStorage.removeItem('ft_token');
        $('.form-wrap').show();
        $('.main_content').hide();
    });
}
