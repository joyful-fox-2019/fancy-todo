const axios = require('axios')


const simi = axios.create({
    baseURL: `https://wsapi.simsimi.com/190410/talk`,
    headers: {
        "x-api-key": "nsZahssTALpQf4AgTsael0h5hli3xs/CoH6zaTER",
        "Content-Type": "application/json"
    }
})



module.exports = { simi }
