'use-strict'

const mongoose = require('mongoose') // Erase if already required
const COLLECTION_NAME = 'Shops'
const DOCCUMENT_NAME = 'Shop'
// Declare the Schema of the Mongo model
const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 150
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    trim: true
  },
  rolse: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

//Export the model
module.exports = mongoose.model(DOCCUMENT_NAME, shopSchema)