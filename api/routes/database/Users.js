const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	login: String,
	password: String,
	email: String,
	salt: String,
	sessions: Object,
	friends: Object,
	first_name: String,
	last_name: String,
})

module.exports = User;