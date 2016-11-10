(function (app) {
  'use strict';

  app.registerModule('records', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('records.admin', ['core.admin']);
  app.registerModule('records.admin.routes', ['core.admin.routes']);
  app.registerModule('records.services');
  app.registerModule('records.routes', ['ui.router', 'core.routes', 'records.services']);
}(ApplicationConfiguration));
