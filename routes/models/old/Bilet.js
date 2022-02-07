const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  bookedEconom: {type: Number,default:null},
  bookedBuisness:{type: Number,default:null},
  bookedFirst:{type: Number,default:null},
  place:[{type: Number}],
  departureDate:{type: Date, required: true},
  arrivalDate:{type: Date,required: true},
 

})

module.exports = model('Bilet', schema)