(function () {
  'use strict';

  // Configuring the Records Admin module
  angular
    .module('records.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Records',
      state: 'admin.records.list'
    });
  }
}());
