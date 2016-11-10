(function () {
  'use strict';

  angular
    .module('patients.admin')
    .controller('PatientsAdminController', PatientsAdminController);

  PatientsAdminController.$inject = ['$scope', '$state', '$window', 'patientResolve', 'Authentication', 'Notification', 'UsersService'];

  function PatientsAdminController($scope, $state, $window, patient, Authentication, Notification, UsersService) {
    var vm = this;
    vm.selectUsers = UsersService.query();
    vm.patient = patient;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Patient
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.patient.$remove(function() {
          $state.go('admin.patients.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Patient deleted successfully!' });
        });
      }
    }

    // Save Patient
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.patientForm');
        return false;
      }

      // Create a new patient, or update the current instance
      vm.patient.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.patients.list'); // should we send the User to the list or the updated Patient's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Patient saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Patient save error!' });
      }
    }
  }
}());
