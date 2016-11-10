(function () {
  'use strict';

  angular
    .module('records.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.records', {
        abstract: true,
        url: '/records',
        template: '<ui-view/>'
      })
      .state('admin.records.list', {
        url: '',
        templateUrl: '/modules/records/client/views/admin/list-records.client.view.html',
        controller: 'RecordsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'doctor', 'patient']
        }
      })
      .state('admin.records.create', {
        url: '/create',
        templateUrl: '/modules/records/client/views/admin/form-record.client.view.html',
        controller: 'RecordsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'doctor']
        },
        resolve: {
          recordResolve: newRecord
        }
      })
      .state('admin.records.edit', {
        url: '/:recordId/edit',
        templateUrl: '/modules/records/client/views/admin/form-record.client.view.html',
        controller: 'RecordsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'doctor']
        },
        resolve: {
          recordResolve: getRecord
        }
      });
  }

  getRecord.$inject = ['$stateParams', 'RecordsService'];

  function getRecord($stateParams, RecordsService) {
    return RecordsService.get({
      recordId: $stateParams.recordId
    }).$promise;
  }

  newRecord.$inject = ['RecordsService'];

  function newRecord(RecordsService) {
    return new RecordsService();
  }
}());
