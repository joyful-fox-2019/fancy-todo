module.exports = (err, req, res, next) => {
  let errStatus
  let messages = []

  if (err.name === 'ValidationError') {
    errStatus = 400
    for (let key in err.errors) {
      messages.push(err.errors[key].message)
    }
  }
  else if (err.name === 'Unauthorized') {
    errStatus = err.status
    messages.push(err.message)
  }
  else if (err.name === 'BadRequest') {
    errStatus = err.status
    messages.push(err.message)
  }
  else if (err.name === 'TypeError') {
    errStatus = 400
    messages.push(err.message)
  }

  console.log("ini error", err)
  res.status(errStatus || 500).json({ messages })
}