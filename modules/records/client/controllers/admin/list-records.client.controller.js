(function () {
  'use strict';

  angular
    .module('records.admin')
    .controller('RecordsAdminListController', RecordsAdminListController);

  RecordsAdminListController.$inject = ['RecordsService'];

  function RecordsAdminListController(RecordsService) {
    var vm = this;

    vm.records = RecordsService.query();
  }
}());
