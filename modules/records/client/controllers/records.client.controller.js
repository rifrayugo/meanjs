(function () {
  'use strict';

  angular
    .module('records')
    .controller('RecordsController', RecordsController);

  RecordsController.$inject = ['$scope', 'recordResolve', 'Authentication'];

  function RecordsController($scope, record, Authentication) {
    var vm = this;

    vm.record = record;
    vm.authentication = Authentication;

  }
}());
