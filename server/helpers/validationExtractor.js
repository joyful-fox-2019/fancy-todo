module.exports = (err) => {
    let errArray = []
    for(let el in err.errors){
        if(err.errors[el].kind === 'unique'){
            errArray.push(`This ${el} is already exist`)
        }else{
            errArray.push(err.errors[el].message)
        }
    }
    return errArray.join(', ')
}