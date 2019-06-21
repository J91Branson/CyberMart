const mongoose = require("mongoose");
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    trim: true,
    required: 'Name is required'
  },
  streetAddress: { 
    type: String,
    trim: true,
    required: false
  },
  streetAddressSecond: { 
    type: String,
    trim: true,
    required: false
  },
  city: { 
    type: String,
    trim: true,
    required: false
  },
  state: { 
    type: String,
    trim: true,
    required: false
  },
  zipCode: { 
    type: String,
    trim: true,
    required: false
  },
  phoneNumber: { 
    type: String,
    trim: true,
    required: false
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

module.exports = mongoose.model("User", UserSchema);
