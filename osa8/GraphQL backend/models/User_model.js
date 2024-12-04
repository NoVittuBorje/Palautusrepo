const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password_hash:{
    type: String,
    required: true,
  },
  favoriteGenre:{
    type: String,
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)
