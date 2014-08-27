define([
  'layoutmanager',
  'jquery.fitToParent',
  'helpers/Backbone.ResponsiveView'
], function() {
  return Backbone.ResponsiveView.extend({
    tagName: 'li',
    className: 'slide',
    template: 'components/slide',
    initialize: function() {
      _.bindAll(this);
    },
    afterRender: function() {
      this.onResize();
      this.$('img')
        .on('load', this.imageLoaded)
        .on('error', this.model.collection.connection.close);
    },
    onResize: function() {
      this.$('img').fitToParent();
    },
    imageLoaded: function() {
      console.log('image loaded');
      this.model.collection.sendAction('loaded');
    }
  });
});