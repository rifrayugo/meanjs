(function () {
  'use strict';

  angular
    .module('patients')
    .controller('PatientsController', PatientsController);

  PatientsController.$inject = ['$scope', 'patientResolve', 'Authentication'];

  function PatientsController($scope, patient, Authentication) {
    var vm = this;

    vm.patient = patient;
    vm.authentication = Authentication;

  }
}());
