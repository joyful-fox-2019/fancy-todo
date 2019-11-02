const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log("Failed to connect database.");
    } else {
        console.log("Success to connect database.");
    }
});

module.exports = mongoose;