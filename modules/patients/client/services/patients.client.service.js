(function () {
  'use strict';

  angular
    .module('patients.services')
    .factory('PatientsService', PatientsService);

  PatientsService.$inject = ['$resource', '$log'];

  function PatientsService($resource, $log) {
    var Patient = $resource('/api/patients/:patientId', {
      patientId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Patient.prototype, {
      createOrUpdate: function () {
        var patient = this;
        return createOrUpdate(patient);
      }
    });

    return Patient;

    function createOrUpdate(patient) {
      if (patient._id) {
        return patient.$update(onSuccess, onError);
      } else {
        return patient.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(patient) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('UsersService', UsersService);

  UsersService.$inject = ['$resource', '$log'];

  function UsersService($resource, $log) {
    var Users = $resource('/api/users/', {
      patientId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return Users;

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
