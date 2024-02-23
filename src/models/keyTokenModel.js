'use-strict'

const mongoose = require('mongoose') // Erase if already required
const COLLECTION_NAME = 'Keys'
const DOCCUMENT_NAME = 'Key'
// Declare the Schema of the Mongo model
const keyTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  publicKey: {
    type: String, require: true
  },
  refreshToken: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

//Export the model
module.exports = mongoose.model(DOCCUMENT_NAME, keyTokenSchema)