module.exports = (err, req, res, next)=>{
  console.log(err);
  
  if(err.name == 'ValidationError'){
    const errors = []
    for(error in err.errors){
      errors.push(err.errors[error].message)
    }
    res.status(400).json({errors})
  }
  else if(err.errors.msg){
    res.status(err.errors.status).json({error: err.errors.msg})
  }
  else{
    res.status(500).json(err)
  }
}