requirejs.config({
  urlArgs: new Date().getTime(),
  deps: ['main'],
  paths: {
    jquery: '../vendor/bower/jquery/dist/jquery',
    backbone: '../vendor/bower/backbone/backbone',
    underscore: '../vendor/bower/lodash/dist/lodash.underscore',
    layoutmanager: '../vendor/bower/layoutmanager/backbone.layoutmanager',
    handlebars: '../vendor/bower/handlebars/handlebars.runtime',
    'jquery.fitToParent': '../vendor/bower/jquery-fitToParent/jquery.fittoparent',
    'compiled-templates': 'compiled-templates/templates',
    vex: '../vendor/bower/vex/js/vex',
    imagesLoaded: '../vendor/bower/imagesloaded/imagesloaded.pkgd',
    'vex.dialog': '../vendor/bower/vex/js/vex.dialog'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'compiled-templates': ['handlebars'],
    vex: {
      deps: ['jquery'],
      exports: 'vex'
    },
    'vex.dialog': {
      deps: ['vex'],
      exports: 'vex.dialog'
    },
    'jquery.fitToParent': ['jquery'],
    layoutmanager: ['backbone']
  }
});