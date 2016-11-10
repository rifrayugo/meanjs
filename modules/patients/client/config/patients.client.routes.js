(function () {
  'use strict';

  angular
    .module('patients.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('patients', {
        abstract: true,
        url: '/patients',
        template: '<ui-view/>'
      })
      .state('patients.list', {
        url: '',
        templateUrl: '/modules/patients/client/views/list-patients.client.view.html',
        controller: 'PatientsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'patients List'
        }
      })
      .state('patients.view', {
        url: '/:patientId',
        templateUrl: '/modules/patients/client/views/view-patient.client.view.html',
        controller: 'PatientsController',
        controllerAs: 'vm',
        resolve: {
          patientResolve: getPatient
        },
        data: {
          pageTitle: 'Patient {{ patientResolve.title }}'
        }
      });
  }

  getPatient.$inject = ['$stateParams', 'PatientsService'];

  function getPatient($stateParams, PatientsService) {
    return PatientsService.get({
      patientId: $stateParams.patientId
    }).$promise;
  }
}());
