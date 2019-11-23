module.exports = errorHandler = (err,req,res,next) => {
    console.log('error create todo', err)
    if(err.name === 'ValidationError'){
        let errArray = Object.keys(err.errors);
        if(errArray.length > 1){
            let message = ''
            for(let i = 0 ; i < errArray.length; i++){
                if(i === errArray.length-1){
                    message += err.errors[errArray[i]].message
                }else{
                    message += err.errors[errArray[i]].message + ', '
                }
            }
            res.status(400).json({
                msg: message
            })
        }else{
            res.json({
                msg: err.errors[errArray[0]].message
            })
        }
    } else if(err.name === 'MongoError'){
        res.status(400).json({
            msg: 'Email already registered'
        })
    }
}