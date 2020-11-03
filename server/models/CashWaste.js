const mongoose = require('mongoose');

const { Schema } = mongoose;

const CashWasteSchema = new Schema({
  date: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  goal: String,
  amount: Number
});

mongoose.model('CashWaste', CashWasteSchema);