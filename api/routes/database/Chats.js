const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chats = new Schema({
	chat_id: String,
	messages: Array
})

module.exports = Chats;