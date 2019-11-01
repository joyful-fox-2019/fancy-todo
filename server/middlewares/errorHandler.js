module.exports = (err, req, res, next) => {
  console.log(err)
  if(err.msg == 'authen') {
    res.status(403).json({msg: 'Authentication Error'});
  } else if(err.msg == 'author') {
    res.status(401).json({msg: 'Authorization Error!'});
  } else if(err.msg == 'zero'){
    res.status(404).json({msg: 'Not Found!'});
  } else if(err.msg == 'IToken') {
    res.status(403).json({msg: 'Invalid Token / Exp Token'});
  } else if(err.msg == 'wmail') {
    res.status(403).json({msg: 'Email/password Wrong'})
  } else if(err.name == 'ValidationError'){
    res.status(403).json({msg: err._message})
  } else if(err.msg == 'noProject') {
    res.status(403).json({msg: 'Invalid ProjectId'})
  } else if(err.code == 11000) {
    res.status(403).json({msg: 'Duplicate Detected'})
  } else if(err.msg === 'member') {
    res.status(403).json({msg: 'You are not a Member for this Project !'})
  } else if(err.name == 'JsonWebTokenError') {
    res.status(403).json({msg: err.message})
  } else if(err.msg == 'ready') {
    res.status(400).json({msg: 'This Todo allready Done!'})
  } else {
    res.status(500).json('Internal Server Error');
  }
}