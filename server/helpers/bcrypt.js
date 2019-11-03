const bcrypt = require('bcrypt');

module.exports = {
	encryptPassword: function(password) {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(password, salt);
		return hash;
	},

	comparePassword: function(password, passwordDB) {
		return bcrypt.compareSync(password, passwordDB);
	}
}

