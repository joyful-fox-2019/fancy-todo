$(document).ready(()=>{

    if(localStorage.getItem('token')){
        fetchNews()
    }

})

function fetchNews(){
    $.ajax({
        method: 'get',
        url: `${baseUrl}/apis/news`
    })
    .done(news =>{
        $('#news-list').html('')
        news.articles.forEach(newsdata => {
            printNews(newsdata)
        });
        
    })
    .fail(err =>{
        PNotify.error(err.responseJSON)
    })
}


// PRINT

function printNews(newsdata){

    $('#news-list').append(`
    <div class="social-news-card">
        <a href="${newsdata.url}" target="_blank"><img src="${newsdata.urlToImage}" alt=""></a>
        <a href="${newsdata.url}" target="_blank">${newsdata.title}</a>
    </div>
    `)
}