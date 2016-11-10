(function () {
  'use strict';

  angular
    .module('records.admin')
    .controller('RecordsAdminController', RecordsAdminController);

  RecordsAdminController.$inject = ['$scope', '$state', '$window', 'recordResolve', 'Authentication', 'Notification', 'PatientsService'];

  function RecordsAdminController($scope, $state, $window, record, Authentication, Notification, PatientsService) {
    var vm = this;
    vm.selectPatients = PatientsService.query();
    vm.record = record;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Record
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.record.$remove(function() {
          $state.go('admin.records.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Record deleted successfully!' });
        });
      }
    }

    // Save Record
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.recordForm');
        return false;
      }

      // Create a new record, or update the current instance
      vm.record.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.records.list'); // should we send the User to the list or the updated Record's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Record saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Record save error!' });
      }
    }
  }
}());
