module.exports = (err, req, res, next)=>{

  if(err.name == 'ValidationError'){
    const errors = []
    for(error in err.errors){
      errors.push(err.errors[error].message)
    }
    res.status(400).json({errors})
  }
  else if(err.msg){
    res.status(400).json({error: err.msg})
  }
  else{
    res.status(500).json(err)
  }
}