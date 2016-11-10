(function () {
  'use strict';

  angular
    .module('records.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('records', {
        abstract: true,
        url: '/records',
        template: '<ui-view/>'
      })
      .state('records.list', {
        url: '',
        templateUrl: '/modules/records/client/views/list-records.client.view.html',
        controller: 'RecordsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Records List'
        }
      })
      .state('records.view', {
        url: '/:recordId',
        templateUrl: '/modules/records/client/views/view-record.client.view.html',
        controller: 'RecordsController',
        controllerAs: 'vm',
        resolve: {
          recordResolve: getRecord
        },
        data: {
          pageTitle: 'Record {{ recordResolve.title }}'
        }
      });
  }

  getRecord.$inject = ['$stateParams', 'RecordsService'];

  function getRecord($stateParams, RecordsService) {
    return RecordsService.get({
      recordId: $stateParams.recordId
    }).$promise;
  }
}());
