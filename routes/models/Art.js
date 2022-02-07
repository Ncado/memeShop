const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  way: {type: String, required: true, unique: true},
  prise: {type: Number , required: true},
  size: {type: String, required: true},
  firstMention: {type: String, required: true},
  title: {type: String, required: true, unique: true},
  describe: {type: String, required: true, unique: true},
  aviable: {type: Boolean, required: true},
  rating: [{type: Number}],
  type: {type: String, required: true}
})

module.exports = model('Art', schema)