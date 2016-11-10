(function () {
  'use strict';

  angular
    .module('records')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Records',
      state: 'records',
      type: 'dropdown',
      roles: ['admin', 'doctor', 'patient']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'records', {
      title: 'List Records',
      state: 'records.list',
      roles: ['admin', 'doctor', 'patient']
    });
  }
}());
