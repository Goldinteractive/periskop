/**
 *
 * Special View designed to be responsive
 *
 */
define([
  'layoutmanager'
], function() {
  'use strict';
  // Cache some private variables
  var $document = $(document),
    nwWindow = window.gui ? gui.Window.get() : null,
    $window = $(window),
    originalRender = Backbone.Layout.prototype._render;

  Backbone.ResponsiveView = Backbone.Layout.extend({
    // override the backbone.layout default render function
    _render: function() {
      var _this = this;
      $window.on('update.' + this.cid, function() {
        window.requestAnimationFrame(_.bind(_this.onResize, _this), _this.$el[0]);
      });
      return originalRender.apply(this, arguments);
    },
    // override the backbone.layout default cleanup function
    cleanup: function() {
      $window.off('.' + this.cid);
      $document.off('.' + this.cid);
    },
    onResize: $.noop
  });
});