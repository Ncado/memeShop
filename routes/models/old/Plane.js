const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  freeEconom: [{type: Number,required: true}],
  freeBuisness:[{type: Number,required: true}],
  freeFirst:[{type: Number,required: true}],
  valueEconom:{type: Number,required: true},
  valueBuisness:{type: Number,required: true},
  valueFirst:{type: Number,required: true},
  departureDate:{type: Date, required: true},
  arrivalDate:{type: Date,required: true},
 

})

module.exports = model('Plane', schema)