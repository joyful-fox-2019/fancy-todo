const bcryptjs = require('bcryptjs');

module.exports = {
	hash: function(password) {
		return bcryptjs.hashSync(password, 10);
	},
	verify: function(password, hashPassword) {
		return bcryptjs.compareSync(password, hashPassword);
	}
};
