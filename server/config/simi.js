const axios = require('axios')


const simi = axios.create({
    baseURL: `https://wsapi.simsimi.com/190410/talk`,
    headers: {
        "x-api-key": "QoZhtwbxP6Gsiy8irCecrP+I44cNF9q94Te5lvqz",
        "Content-Type": "application/json"
    }
})



module.exports = { simi }
