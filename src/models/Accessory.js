const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
});

const Accessory = mongoose.model('Accessorry', accessorySchema);

module.exports = Accessory;