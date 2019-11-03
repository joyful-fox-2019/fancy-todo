$(document).ready(()=>{

    if(localStorage.getItem('token')){
        fetchSocial()
    }

})

function fetchSocial(){
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/socials`,
        headers: {
            token : localStorage.getItem('token')
        }        
    })
    .done(socials=>{
        $('#id-social-todo-list').html('')
        socials.forEach(social => {
            printSocial(social)
        });
    })
    .fail(err =>{
        PNotify.error(err.responseJSON)
    })
}


// CLICK 

function upvote(socialId){

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/socials/${socialId}/upvote`,
        headers: {
            token : localStorage.getItem('token')
        }        
    })
    .done(()=>{
        fetchSocial()
    })
    .fail(err =>{
        PNotify.error(err.responseJSON)
    })

}

function downvote(socialId){

    $.ajax({
        method: 'patch',
        url: `${baseUrl}/socials/${socialId}/downvote`,
        headers: {
            token : localStorage.getItem('token')
        }        
    })
    .done(()=>{
        fetchSocial()
    })
    .fail(err =>{
        PNotify.error(err.responseJSON)
    })

}


// PRINT SOCIAL

function printSocial(social){
    $('#id-social-todo-list').append(`

    <div class="social-todo-list d-flex flex-column align-items-center">
        <div class="social-todo d-flex align-items-center">
            <div class="user-profil-pic d-flex justify-content-center align-items-center">
                <img src="https://api.adorable.io/avatars/92/${social.userId.email}" alt="">
            </div>
            <div class="social-content d-flex flex-column justify-content-center align-items-center">
                <p>${social.userId.email}</p>
                <h5>${social.todoId.name}</h5>
                <p>${social.todoId.description}</p>
            </div>
            <div class="social-vote d-flex flex-column align-items-center">
                <i onclick="upvote('${social._id}')" class="far fa-thumbs-up"></i>
                <span>${ social.upvotes.length - social.downvotes.length }</span>
                <i onclick="downvote('${social._id}')"  class="far fa-thumbs-down"></i>
            </div>
        </div>
    </div>

    `)
}