define([
  'layoutmanager',
  'jquery.fitToParent',
  'helpers/Backbone.ResponsiveView'
], function() {
  return Backbone.ResponsiveView.extend({
    tagName: 'li',
    className: 'slide',
    template: 'components/slide',
    afterRender: function() {
      this.onResize();
    },
    onResize: function() {
      this.$('img').fitToParent();
    }
  });
});