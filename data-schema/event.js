const mongoose = require('mongoose');
const eventschema = mongoose.Schema({
	day:{type:String},
	section:{type:String},
	class:{type:String},
	date:{type:String},
	content:{type:String}
})
module.exports = mongoose.model('event', eventschema);