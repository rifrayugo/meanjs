(function () {
  'use strict';

  // Configuring the Patients Admin module
  angular
    .module('patients.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Patient',
      state: 'admin.patients.list'
    });
  }
}());
