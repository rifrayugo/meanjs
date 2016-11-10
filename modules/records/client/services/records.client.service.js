(function () {
  'use strict';

  angular
    .module('records.services')
    .factory('RecordsService', RecordsService);

  RecordsService.$inject = ['$resource', '$log'];

  function RecordsService($resource, $log) {
    var Record = $resource('/api/records/:recordId', {
      recordId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Record.prototype, {
      createOrUpdate: function () {
        var record = this;
        return createOrUpdate(record);
      }
    });

    return Record;

    function createOrUpdate(record) {
      if (record._id) {
        return record.$update(onSuccess, onError);
      } else {
        return record.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(record) {
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

    return Patient;

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
