const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    data: { type: Date, default: Date.now },
    art: [{ type: Types.ObjectId, ref: 'Art'}],
    user: { type: Types.ObjectId, ref: 'User' ,unique: true}
})

module.exports = model('Favourite', schema);