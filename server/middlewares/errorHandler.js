module.exports = {
	errorHandler: function(err, req, res, next) {
		let status = err.status || 500;
		let message = [err.message] || ['Internal Server Error'];
		console.log(err,'ini handler');
		switch (err.name) {
			case 'validationError':
				res.status(status).json(['invalid email/password']);
			default:
				console.log(message)
				res.status(status).json(message);
				break;
		}
	}
};
