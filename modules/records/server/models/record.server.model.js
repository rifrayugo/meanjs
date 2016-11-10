'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Record Schema
 */
var RecordSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  patient: {
    type: String,
    default: '',
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  patientName: [{
    type: Schema.ObjectId,
    ref: 'Name'
  }]
});

mongoose.model('Record', RecordSchema);
