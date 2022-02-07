const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    id: {type: String,  required: true},
  rate: {type: String, required: true},
  artId: { type: Types.ObjectId, ref: 'Art',required: true },
  userId: { type: Types.ObjectId, ref: 'User',required: true }
})

module.exports = model('Rating', schema)  