function sendChat(event) {
    event.preventDefault()
    let chat_txt = $('#msg').val()
    $('.chat-history').append(`
        <div class="chat-message clearfix">
            <img src="https://api.adorable.io/avatars/300/${localStorage.getItem('name')}" width="32" height="32">

            <div class="chat-message-content clearfix">
            

            <h5>${localStorage.getItem('name')}</h5>

            <p>${$('#msg').val()}</p>

            </div> <!-- end chat-message-content -->

        </div> <!-- end chat-message -->

        <hr>
    `)
    $('#msg').val('')
    $(".chat-history").animate({ scrollTop: $(".chat-history")[0].scrollHeight})

    $.ajax({
        url: baseUrl + '/chat',
        method: 'POST',
        data: {
          text: chat_txt
        }
      })
      .done(data => {      
        $('.chat-history').append(`
        <div class="chat-message clearfix">
            <img src="https://rebot.me/assets/images/mini-avatars/159.png?r=1485965356" width="32" height="32">

            <div class="chat-message-content clearfix">

            <h5>Simi-Simi</h5>

            <p>${data.atext}</p>

            </div> <!-- end chat-message-content -->

        </div> <!-- end chat-message -->

        <hr>
    `)
    $('#msg').val('')
    $(".chat-history").animate({ scrollTop: $(".chat-history")[0].scrollHeight})
  
      })
      .fail(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.responseJSON.message,
        })
      })
}