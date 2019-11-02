module.exports = (err, req, res, next) => {
	console.log(err);
	let status, message;
	switch (err) {
		case 'invalidSignin':
			(status = 403), (message = 'Username/Password wrong.');
			break;
		case 'tokenFailed':
			(status = 403), (message = 'Invalid Token.');
			break;
		case 'userNotFound':
			(status = 404), (message = 'User not found.');
			break;
		case 'todoNotFound':
			(status = 404), (message = 'Todo not found.');
			break;
	}
	res.status(status || 500).json({ message: message || 'Internal sever error.' });
};
