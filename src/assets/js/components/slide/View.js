define([
  'imagesLoaded',
  'layoutmanager',
  'jquery.fitToParent',
  'helpers/Backbone.ResponsiveView'
], function(imagesLoaded) {
  return Backbone.ResponsiveView.extend({
    tagName: 'li',
    className: 'slide',
    template: 'components/slide',
    initialize: function() {
      _.bindAll(this);
    },
    afterRender: function() {
      this.onResize();

      // notify the image status to the server
      this.$('img')
        .imagesLoaded()
        .done(this.onImageLoaded)
        .fail(this.model.collection.connection.close);
    },
    onResize: function() {
      this.$('img').fitToParent();
    },
    onImageLoaded: function() {
      console.log('image loaded');
      this.model.collection.sendAction('loaded');
    }
  });
});