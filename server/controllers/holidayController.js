const holidayApi = require("../API/calendarific")

class HolidayController{
    static getHoliday(req,res,next){
        holidayApi.get(`holidays?api_key=${process.env.HOLIDAY_API}&country=ID&year=2019`)
        .then(function({data}){
            res.status(200).json(data)
        })
        .catch(next)
       
    }

    static searchHoliday(req,res,next){
        const {country, year} = req.body
        holidayApi.get(`holidays?api_key=${process.env.HOLIDAY_API}&country=${country}&year=${year}`)
        .then(function({data}){
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = HolidayController