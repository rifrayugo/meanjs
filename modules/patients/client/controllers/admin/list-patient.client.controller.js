(function () {
  'use strict';

  angular
    .module('patients.admin')
    .controller('PatientsAdminListController', PatientsAdminListController);

  PatientsAdminListController.$inject = ['PatientsService'];

  function PatientsAdminListController(PatientsService) {
    var vm = this;

    vm.patients = PatientsService.query();
  }
}());
