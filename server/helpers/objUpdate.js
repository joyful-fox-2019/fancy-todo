function getObjUpdate(body) {
  let allowedField = ["title", "description", "dueDate", "status"]
  let obj = {}
  allowedField.forEach(el => {
    for (let field in body) {
      if (el == field) {
        obj[field] = body[field]
      }
    }
  })
  return obj
}

module.exports = getObjUpdate