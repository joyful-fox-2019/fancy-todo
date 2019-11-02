const jws = require('jsonwebtoken');

module.exports = {
	encode: function(payload) {
		return jws.sign(payload, process.env.JWS_SECRET);
	},
	decode: function(encoded) {
		return jws.verify(encoded, process.env.JWS_SECRET);
	}
};
