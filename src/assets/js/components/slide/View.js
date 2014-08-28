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
    serialize: function() {
      return {
        slide: this.model.toJSON(),
        viewport: window.app.viewport
      };
    },
    afterRender: function() {
      this.onResize();
      // block the low internet connections
      this.timer = window.setTimeout(_.bind(function() {
        this.model.collection.forceClose('Bild konnte nicht geladen werden');
      }, this), 10000);

      // notify the image status to the server
      this.$('img')
        .imagesLoaded()
        .done(this.onImageLoaded)
        .fail(_.bind(this.model.collection.closeConnection, this.model.collection));
    },
    onResize: function() {
      this.$('img').fitToParent();
    },
    onImageLoaded: function() {
      // block the timer
      window.clearTimeout(this.timer);
      console.log('image loaded');
      this.model.collection.sendAction('loaded');
    }
  });
});