define([
  'components/slide/View',
  'jquery.fitToParent',
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'slider',
    beforeRender: function() {
      // start the websocket connection
      this.collection.fetch();
    },
    afterRender: function() {
      _.bindAll(this);

      this.listenTo(this.collection, 'add', this.addSlide);
      // listen the custom websockets events
      this.listenTo(this.collection, 'effect', this.showNextSlide);
    },
    /**
     * Triggered anytime new slides get added to the carousel
     * @param  { Object } imageModel
     */
    addSlide: function(imageModel) {
      // add a new slide
      this.insertView(new SlideComponent({
        attributes: {
          'data-model-cid': imageModel.cid
        },
        modelCid: imageModel.cid,
        model: imageModel
      })).render();
    },
    /**
     * Move the new slide in and the old one out
     */
    showNextSlide: function() {
      console.log('show next');

      var $activeSlide = this.$('.slide.in'),
        $nextSlide;

      if (!$activeSlide.length) {
        $activeSlide = this.$('.slide:first').addClass('in');
        return;
      }

      $nextSlide = $activeSlide.next('li');
      $activeSlide.removeClass('in').addClass('out');

      if ($nextSlide.length) {
        $nextSlide.addClass('in');
        this.removeOldSlide($activeSlide);
      }

    },
    /**
     * Remove the old slide from the dom and from the collection
     * @param  { Array } $oldSlide: jquery element object
     */
    removeOldSlide: function($oldSlide) {
      var _this = this,
        subview = _this.getView({
          modelCid: $oldSlide.data().modelCid
        });
      // remove the old image after the out animation is completed
      setTimeout(function() {
        subview.remove();
        _this.collection.remove(subview.model);
      }, 1000);
    }
  });
});