// js dari codepen
    var $wrap = $('#main');
    var $signUpBtn = $wrap.find('#signUpBtn');
    var $loginBtn = $wrap.find("#loginBtn");

    $signUpBtn.on('click', function() {
        $wrap.addClass('singUpActive');
        $wrap.removeClass('loginActive');
    });

    $loginBtn.on('click', function() {
        $wrap.addClass('loginActive');
        $wrap.removeClass('singUpActive');
    });
//

function register (){
    $('#form-signup').on('submit', (e) => {
      e.preventDefault()
      $.ajax({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          username: $("#sing_name").val(),
          email: $("#sing_email").val(),
          password: $("#sing_pass").val()
        },
        beforeSend: function () {
          swal.showLoading()
        }
      })
        .done(({token, username}) => {
          localStorage.setItem('token', token)
          localStorage.setItem('name', username)
          islogin()
          swal.close()
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Successfully Register',
            showConfirmButton: false,
            timer: 1500
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
          $("#sing_name").val('')
          $("#sing_email").val('')
          $("#sing_password").val('')
          logout()
        })
    })
}

function login (){
    $('#form-login').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
            email: $("#mail").val(),
            password: $("#pass").val()
        },
        beforeSend: function () {
          swal.showLoading()
        }
        })
        .done(({token, username}) => {
            localStorage.setItem('token', token)
            localStorage.setItem('name', username)
            islogin()
            swal.close()
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
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
            $("#mail").val('')
            $("#pass").val('')
            logout()
        })
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/signGoogle',
        method: 'post',
        data:{
            id_token
        },
        beforeSend: function () {
          swal.showLoading()
        }
    })
        .done(({token, username}) => {
            localStorage.setItem('token', token)
            localStorage.setItem('name', username)
            islogin()
            swal.close()
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
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
            logout()
        })
}

function logout (){
    $('#logoutt').on('click', (e) => {
        e.preventDefault()
        // swal.showLoading()
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('Google Signed Out.');
        });
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        islogin()
        // swal.close()
        Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Successfully Logout',
            showConfirmButton: false,
            timer: 1500
        })
    })
}