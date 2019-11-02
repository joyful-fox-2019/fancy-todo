let baseUrl = 'http://localhost:3000'


function auth() {

}


// Before Login
function login() {
    let email = $("#logusername").val();
    let password = $("#logpassword").val();
    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: {
            email,
            password
        }
    }).done((result) => {
        localStorage.setItem("username", result.username);
        localStorage.setItem("token", result.token);
        auth();
    }).fail((err) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.message,
        })
    })
}

function register() {
    let name = $("#name").val();
    let email = $("#username").val();
    let password = $("#password").val();

    $.ajax({
        method: "post",
        url: "http://localhost:3000/user/register",
        data: {
            name,
            email,
            password
        }
    }).done((result) => {
        Swal.fire({
            type: 'success',
            title: 'Success',
            text: 'Register Successfully',
        })
        auth();
    }).fail((err) => {

        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.responseJSON.message,
        })
    })
}

// function onSignIn(googleUser) {
//     let id_token = googleUser.getAuthResponse().id_token;
//     $.ajax({
//         method: "post",
//         url: "http://localhost:3000/user/logingoogle",
//         data: {
//             token: id_token
//         }
//     }).done((result) => {
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("username", result.username);
//         auth();
//     }).fail((err) => {
//         Swal.fire({
//             type: 'error',
//             title: 'Oops...',
//             text: err.responseJSON.message,
//         })
//     })

// }

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


function signOut() {
    Swal.fire({
        title: 'Are you sure to signout ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                localStorage.removeItem("token");
                localStorage.removeItem("username")
                auth();
            });
            $('.messages-content').empty()
            $('#logusername').val('')
            $('#logpassword').val('')
        }
    })

}