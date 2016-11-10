'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var PatientSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  username: {
    type: String,
    default: '',
    trim: true,
    required: 'Username cannot be blank'
  },
  address: {
    type: String,
    default: '',
    trim: true,
    required: 'Address cannot be blank'
  },
  phone: {
    type: String,
    default: '',
    trim: true,
    required: 'Phone Number cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Patient', PatientSchema);
