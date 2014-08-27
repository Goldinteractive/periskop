define([
  'collections/Images',
  'components/images-slider/View',
  'components/boot-form/View',
  'layoutmanager'
], function(Images, ImagesSliderComponent, BootFormComponent) {
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
      // Wait until the client has set its id
      var formComponent = this.insertView('#boot-form', new BootFormComponent());
      this.listenTo(formComponent, 'remove', this.render);
      formComponent.render();
    }
  });
});