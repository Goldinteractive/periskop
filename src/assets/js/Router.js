define([
  'components/boot-form/View',
  'backbone'
], function(BootFormComponent) {
  'use strict';
  return Backbone.Router.extend({
    routes: {
      '': 'index',
      ':whatever': 'loginWithAnHash'
    },
    initialize: function() {

    },
    index: function() {
      // Wait until the client has set its id
      var baseLayout = window.app.baseLayout,
        formComponent = baseLayout.insertView('#boot-form', new BootFormComponent());
      baseLayout.listenTo(formComponent, 'remove', baseLayout.render);
      formComponent.render();
    },
    loginWithAnHash: function(hash) {
      $('#boot-form').remove();
      window.app.CLIENT_ID = hash;
      window.app.baseLayout.render();
    }
  });
});