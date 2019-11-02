

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    const token = localStorage.getItem('token')

    if(!token){

        $.ajax({
            url : `http://localhost:3000/users/google`,
            method : 'post',
            data : {
                id_token
            }
        })
        .done((token)=>{
            localStorage.setItem('token', token)
        })
        .fail(err=>{
            console.log(err)
        })
        
    }
}