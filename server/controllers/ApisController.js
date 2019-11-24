const newsApi = require('../apis/news')
const API_NEWS_KEY = process.env.API_NEWS_KEY


class ApisController {

    static news(req, res, next){
        newsApi.get(`/top-headlines?country=us&apiKey=${API_NEWS_KEY}`)
        .then(({data})=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = ApisController
