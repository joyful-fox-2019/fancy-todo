function errorHandler (err, req, res, next) {
    console.log(err);
    let status = err.status || 500;
    let messages = err.messages || `Internal Server Error.`;
    switch (err.name) {
        case "JsonWebTokenError":
            status = 400;
            break;
        case "ValidationError":
            status = 400;
            messages = [];
            for (let key in err.errors) {
                messages.push(err.errors[key].message);
            }
            break;
    }
    res.status(status).json({ messages: messages });
}

module.exports = errorHandler;