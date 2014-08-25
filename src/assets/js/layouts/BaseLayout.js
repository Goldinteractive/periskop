define([
  'collections/Images',
  'components/images-slider/View',
  'layoutmanager'
], function(Images, ImagesSliderComponent) {
  var imagesCollection = new Images();
  return Backbone.Layout.extend({
    el: 'body',
    collection: imagesCollection,
    views: {
      '.slider-container': new ImagesSliderComponent({
        collection: imagesCollection
      })
    },
    initialize: function() {
      this.listenTo(this.collection, 'sync', this.render);
    },
    onImagesSync: function() {}
  });
});