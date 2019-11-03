function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/signin-google",
        data: {
            idToken : id_token
        }
    })
    .done((response) => {
        if (response) {
            localStorage.setItem("jwt_token", response.jwt_token);
            $("#loginModal").modal("hide");
            $('.modal-backdrop').remove();
            $(document.body).removeClass("modal-open");
            window.location.href = "#home";
            // setTimeout(function(){ location.reload(true); }, 1300);
            swal({
                title: "Success!",
                text: "Sign in successfully!",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        }
    })
    .fail((err) => {
        console.log(err);
    });
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem("jwt_token");
        window.location.href = "#signin";
        swal({
            title: "Logout!",
            text: "You have logout successfully!",
            icon: "success",
            buttons: false,
            timer: 1500
        });
    });
}