(function () {
  'use strict';

  angular
    .module('patients')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Patient',
      state: 'patients',
      type: 'dropdown',
      roles: ['admin', 'doctor']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'patients', {
      title: 'List Patient',
      state: 'patients.list',
      roles: ['admin', 'doctor']
    });
  }
}());
