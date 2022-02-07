const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  text: {type: String, required: true},
  user: { type: Types.ObjectId, ref: 'User' },
  userName: {type: String, required: true},
  art: { type: Types.ObjectId, ref: 'Art' }
})

module.exports = model('Comment', schema)  