'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Patient = mongoose.model('Patient'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an patient
 */
exports.create = function (req, res) {
  var patient = new Patient(req.body);
  patient.user = req.user;

  patient.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};

/**
 * Show the current patient
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var patient = req.patient ? req.patient.toJSON() : {};

  // Add a custom field to the Patient, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Patient model.
  patient.isCurrentUserOwner = !!(req.user && patient.user && patient.user._id.toString() === req.user._id.toString());

  res.json(patient);
};

/**
 * Update an patient
 */
exports.update = function (req, res) {
  var patient = req.patient;

  patient.name = req.body.name;
  patient.phone = req.body.phone;
  patient.address = req.body.address;

  patient.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};

/**
 * Delete an patient
 */
exports.delete = function (req, res) {
  var patient = req.patient;

  patient.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};

/**
 * List of Patients
 */
exports.list = function (req, res) {
  Patient.find().sort('-created').populate('user', 'displayName').exec(function (err, patients) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patients);
    }
  });
};

/**
 * Patient middleware
 */
exports.patientByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Patient is invalid'
    });
  }

  Patient.findById(id).populate('user', 'displayName').exec(function (err, patient) {
    if (err) {
      return next(err);
    } else if (!patient) {
      return res.status(404).send({
        message: 'No patient with that identifier has been found'
      });
    }
    req.patient = patient;
    next();
  });
};
