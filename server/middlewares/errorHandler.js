module.exports = (err, req, res, next) => {
  console.log(err.name, "=================", err);
  

  if (err.status) {
    res.status(err.status).json({ message : err.message})
  } else {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message : `email is already used`})
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ message : `your session is expired`})
    }
    
    
    else {
      res.status(500).json({ message : `internal server error`})
    }

  }
}

