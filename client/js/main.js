const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    
    if (!localStorage.getItem('token')) {
        $('#login').submit(function(event) {
            event.preventDefault()
            manualLogin()
        })
    
        $('#register').submit(function(event) {
            event.preventDefault()
            register()
        })
        $('#navbar').hide()
        $('#add-todo').hide()
        $('#main-page').hide()
    } else {
        $('#login-page').hide()
        $('#navbar').show()
        $('#add-todo').hide()
        $('#main-page').show()
        $('#showAll').append(function(event){
            fetchTodos()
        })

    }

    randomQuotes()
})

function randomQuotes() {
    setInterval((() => {
      $.ajax({
        method: 'GET',
        url: 'https://api.quotable.io/random',
      })
        .done(quote => {
          console.log(quote);
          $('#random-quotes').empty()
          $('#random-quotes').append(
            `
            <p><b>${quote.content}</b>
            <br>
            <i>~ ${quote.author}</i></p>
            `
          )
        })
        .fail(err => {
          console.log(err.responseJSON.message)
        })
    })(), 60000)
}