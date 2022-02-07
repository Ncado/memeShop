const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{ type: Types.ObjectId, ref: 'Link' }],
  credits: {type: Number,required: true,default:0},
  bilets: [{ type: Types.ObjectId, ref: 'Bilet' }]
})

module.exports = model('User', schema)  