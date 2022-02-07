const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  basketItem: [{ type: Types.ObjectId, ref: 'BasketItem' }]
})

module.exports = model('Basket', schema)  