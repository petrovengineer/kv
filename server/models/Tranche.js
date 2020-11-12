const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrancheSchema = new Schema({
  amount: Number,
  date: {type: Date, default: Date.now},
  payer: {type: Schema.Types.ObjectId, ref: 'Payer'},
  resource: {type: Schema.Types.ObjectId, ref: 'Resource'}
});

mongoose.model('Tranche', TrancheSchema);