const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  date: {type: String, required: true},
  basketItem: [{ type: Types.ObjectId, ref: 'BasketItem' }]
})

module.exports = model('history', schema)