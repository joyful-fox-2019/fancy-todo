const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    $('#login').submit(function(event) {
        event.preventDefault()
        manualLogin()
    })

    $('#register').submit(function(event) {
        event.preventDefault()
        register()
    })

    $('#showAll').append(function(event){
        fetchTodos()
    })
})