requirejs.config({
  urlArgs: new Date().getTime(),
  deps: ['main'],
  paths: {
    jquery: '../vendor/bower/jquery/dist/jquery',
    backbone: '../vendor/bower/backbone/backbone',
    underscore: '../vendor/bower/lodash/dist/lodash.underscore',
    layoutmanager: '../vendor/bower/layoutmanager/backbone.layoutmanager',
    slick: '../vendor/bower/slick-carousel/slick/slick',
    handlebars: '../vendor/bower/handlebars/handlebars.runtime',
    'jquery.fitToParent': '../vendor/bower/jquery-fitToParent/jquery.fittoparent',
    'compiled-templates': 'compiled-templates/templates',
    vex: '../vendor/bower/vex/js/vex',
    'vex.dialog': '../vendor/bower/vex/js/vex.dialog'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'compiled-templates': ['handlebars'],
    slick: ['jquery'],
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