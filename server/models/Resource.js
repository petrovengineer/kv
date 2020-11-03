const mongoose = require('mongoose');

const { Schema } = mongoose;

const ResourceSchema = new Schema({
  name: String,
  created: {type: Date, default: Date.now},
  tranches: {type: Schema.Types.ObjectId, ref: 'Tranche'},
  waste: {type: Schema.Types.ObjectId, ref: 'Waste'},
  cashWaste: {type: Schema.Types.ObjectId, ref: 'CashWaste'},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
});

mongoose.model('Resource', ResourceSchema);