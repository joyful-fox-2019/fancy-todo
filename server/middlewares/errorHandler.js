module.exports = (err, req, res, next) => {
	let status, message;
	console.log(err);
	switch (err) {
		case 'invalidSignin':
			(status = 403), (message = 'Username/Password wrong.');
			break;
		case 'tokenFailed':
			(status = 403), (message = 'Invalid Token');
			break;
	}
	res.status(status).json({ message });
};
