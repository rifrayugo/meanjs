(function () {
  'use strict';

  angular
    .module('patients.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.patients', {
        abstract: true,
        url: '/patients',
        template: '<ui-view/>'
      })
      .state('admin.patients.list', {
        url: '',
        templateUrl: '/modules/patients/client/views/admin/list-patients.client.view.html',
        controller: 'PatientsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'doctor']
        }
      })
      .state('admin.patients.create', {
        url: '/create',
        templateUrl: '/modules/patients/client/views/admin/form-patient.client.view.html',
        controller: 'PatientsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'doctor']
        },
        resolve: {
          patientResolve: newPatient
        }
      })
      .state('admin.patients.edit', {
        url: '/:patientId/edit',
        templateUrl: '/modules/patients/client/views/admin/form-patient.client.view.html',
        controller: 'PatientsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'doctor']
        },
        resolve: {
          patientResolve: getPatient
        }
      });
  }

  getPatient.$inject = ['$stateParams', 'PatientsService'];

  function getPatient($stateParams, PatientsService) {
    return PatientsService.get({
      patientId: $stateParams.patientId
    }).$promise;
  }

  newPatient.$inject = ['PatientsService'];

  function newPatient(PatientsService) {
    return new PatientsService();
  }
}());
