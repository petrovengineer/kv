const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrancheSchema = new Schema({
  amount: Number,
  date: {type: Date, default: Date.now},
  // payer: {type: Schema.Types.ObjectId, ref: 'Payer'},
  payer: {
    _id: {type: Schema.Types.ObjectId, ref: 'Payer'},
    name: {type: String}
  },
  resource: {
    _id: {type: Schema.Types.ObjectId, ref: 'Resource'},
    name: {type: String}
  }
});



mongoose.model('Tranche', TrancheSchema);