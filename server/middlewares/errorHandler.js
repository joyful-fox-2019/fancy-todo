module.exports = (err, req, res, next) => {
	console.log(typeof err);
	let status;
	const message = [];
	if (typeof err != 'object') {
		err = [err];
	}
	console.log(err);
	for (const errMessage of err) {
		console.log(errMessage);
		switch (errMessage) {
			case 'invalidSignin':
				(status = 403), message.push('Username/Password wrong.');
				break;
			case 'tokenFailed':
				(status = 403), message.push('Invalid Token.');
				break;
			case 'userNotFound':
				(status = 404), message.push('User not found.');
				break;
			case 'todoNotFound':
				(status = 404), message.push('Todo not found.');
				break;
			case 'emailUniqueFailed':
				(status = 400), message.push('Email must be unique.');
				break;
			case 'usernameUniqueFailed':
				(stats = 400), message.push('Username must be unique.');
				break;
		}
	}
	res.status(status || 500).json({ message: message || 'Internal sever error.' });
};
