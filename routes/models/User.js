const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: String, required: true, unique: true},
  basket: [{ type: Types.ObjectId, ref: 'Basket' }],
  history: [{ type: Types.ObjectId, ref: 'History' }],
  myRating: [{ type: String, ref: 'Rating'}]
})

module.exports = model('User', schema)  