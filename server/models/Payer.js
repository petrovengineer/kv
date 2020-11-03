const mongoose = require('mongoose');

const { Schema } = mongoose;

const PayerSchema = new Schema({
	name: String
});

mongoose.model('Payer', PayerSchema);