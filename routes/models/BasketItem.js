const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  quantity: {type: int, required: true},
  art: [{ type: Types.ObjectId, ref: 'Art' }]
})

module.exports = model('BasketItem', schema)  