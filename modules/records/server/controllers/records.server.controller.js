'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Record = mongoose.model('Record'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an record
 */
exports.create = function (req, res) {
  var record = new Record(req.body);
  record.user = req.user;

  record.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(record);
    }
  });
};

/**
 * Show the current record
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var record = req.record ? req.record.toJSON() : {};

  // Add a custom field to the Record, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Record model.
  record.isCurrentUserOwner = !!(req.user && record.user && record.user._id.toString() === req.user._id.toString());

  res.json(record);
};

/**
 * Update an record
 */
exports.update = function (req, res) {
  var record = req.record;

  // record.title = req.body.title;
  record.content = req.body.content;

  record.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(record);
    }
  });
};

/**
 * Delete an record
 */
exports.delete = function (req, res) {
  var record = req.record;

  record.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(record);
    }
  });
};

/**
 * List of Records
 */
exports.list = function (req, res) {
  Record.find().sort('-created').populate('user', 'displayName').exec(function (err, records) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(records);
    }
  });
};

/**
 * Record middleware
 */
exports.recordByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Record is invalid'
    });
  }

  Record.findById(id).populate('user', 'displayName').exec(function (err, record) {
    if (err) {
      return next(err);
    } else if (!record) {
      return res.status(404).send({
        message: 'No record with that identifier has been found'
      });
    }
    req.record = record;
    next();
  });
};
