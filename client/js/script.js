const baseUrl = 'http://35.240.249.106'

$(document).ready(()=>{

    if(!localStorage.getItem('token')){
        resetPage()
        $('#landing-page').show()
    } else {
        resetPage()
        $('#todo-page').show()
    }

    $('.toRegister').click(function (e){
        e.preventDefault()
        resetPage()
        $('#register-page').show()
    })

    $('.toLogin').click(function (e){
        e.preventDefault()
        resetPage()
        $('#login-page').show()
    })

    $('.toHome').click(function (e){
        e.preventDefault()
        resetPage()
        $('#landing-page').show()
    })

    $('.toProject').click(function (e){
        e.preventDefault()
        resetPage()
        $('#project-page').show()
    })

    $('.toTodo').click(function (e){
        e.preventDefault()
        resetPage()
        $('#todo-page').show()
    })

    $('.toSocial').click(function (e){
        e.preventDefault()
        resetPage()
        $('#social-page').show()
    })


    $('#id-register-btn').click(function (e){
        e.preventDefault()
        register()
    })

    $('#id-login-btn').click(function (e){
        e.preventDefault()
        login()
    })

    $('.logout').click(function (e){
        e.preventDefault()
        logout()
    })

})

function resetPage(){
    $('#landing-page').hide()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#todo-page').hide()
    $('#todo-detail').hide()
    $('#project-page').hide()
    $('#project-detail').hide()
    $('#social-page').hide()
}