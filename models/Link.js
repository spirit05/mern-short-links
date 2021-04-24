const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    to: { type: String, required: true },
    from: { type: String, requires: true, unique: true },
    code: { type: String, requered: true, unique: true },
    date: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0},
    owner: { type: Types.ObjectId, ref: 'User' }
});

module.exports = model('Link', schema);