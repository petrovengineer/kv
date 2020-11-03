const mongoose = require('mongoose');

const { Schema } = mongoose;

const WasteSchema = new Schema({
  date: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cashback: Number,
  moneyback: Number,
  goal: String,
  amount: Number
});

mongoose.model('Waste', WasteSchema)