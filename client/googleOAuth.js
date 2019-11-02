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
        localStorage.setItem('ft_token', response.token)
    })
    .fail(err=>{
        console.log(err);
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('ft_token')
    });
}