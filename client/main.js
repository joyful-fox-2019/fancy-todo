console.log('js')
$('document').ready(() => {
    mainPage()
    // register()
    if (localStorage.getItem('token')) {
        // login()
    }

    $('#login-button').click(login)
    $('#register-button').click(register)

    // $('#register-page').click(registerPage)
    $('#login-page').click(loginPage)


    // $('#logout-button').click(logout)
})

function loginPage() {
    $('#errTemplate').empty()
    $('#LOGIN').show()
}
function registerPage() {
    $('#errTemplate').empty()
    $('#REGISTER').show()
}
function mainPage() {
    $('#errTemplate').empty()
    $('#REGISTER').empty().hide()
    $('#LOGIN').empty().hide()
    $('#MAIN').show()
}

function login() {
    // event.preventDefault()
    $('#REGISTER').empty().hide()
    $('#MAIN').empty().hide()
    $('#errTemplate').empty()
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    console.log(email, password);
    $.ajax({
        url: 'http://localhost:3000/signin',
        method: 'POST',
        data: { email, password }
    })
        .done(response => {
            // $('#errTemplate').empty()
            console.log(response);
            // $('#LOGIN').slideToggle(500, () => {
            localStorage.setItem('token', response.token)
            // })
            $('#name-login').val('')
            $('#email-login').val('')
            $('#password-login').val('')
        })
        .fail(err => {
            error(err)
            // console.log(err)
        })
}

function register() {
    // event.preventDefault()
    $('#LOGIN').empty().hide()
    $('#MAIN').empty().hide()
    $('#errTemplate').empty()

    let name = $('#name-register').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    console.log(name, email, password);
    $.ajax({
        url: 'http://localhost:3000/signup',
        method: 'POST',
        data: { name, email, password }
    })
        .done(data => {
            // $('#errTemplate').empty()
            console.log(data);
            $('#username-register').val('')
            $('#email-register').val('')
            $('#password-register').val('')
            loginPage()
        })
        .fail(function (err) {
            error(err)
            console.log(err)
        })

}

function error(error) {
    let err = ''
    if (typeof error.responseJSON.message === 'string') {
        err = error.responseJSON.message
    } else {
        err = error.responseJSON.message.reduce((acc, val) => {
            return acc + `<li> ${val} </li> \n`
        }, '')
    }
    console.log(err);
    $('#errTemplate').append(`
    <div class="ui mini error message">
        <div class="header" style="text-align: start">We had some issues</div>
        <ul class="list"> 
            ${err}
        </ul>
    </div>
    `)
}