define([
  'components/slide/View',
  'jquery.fitToParent',
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'slider',
    pollingDelay: 3, // seconds
    afterRender: function() {
      _.bindAll(this);
      this.listenTo(this.collection, 'add', this.addSlide);
      this.onCollectionSync();
      this.startTimer();
    },
    startTimer: function() {
      this.stopTimer();
      this.timer = window.setInterval(this.showNextSlide, 1000);
    },
    stopTimer: function() {
      window.clearInterval(this.timer);
    },
    /**
     * Triggered anytime new slides get added to the carousel
     * @param  { Object } imageModel
     */
    addSlide: function(imageModel) {
      this.insertView(new SlideComponent({
        attributes: {
          'data-model-cid': imageModel.cid
        },
        modelCid: imageModel.cid,
        model: imageModel
      })).render();
    },
    showNextSlide: function() {

      if (new Date().getSeconds() % this.pollingDelay === 0) return;
      var $activeSlide = this.$('.slide.active'),
        $nextSlide;

      if (!$activeSlide.length) {
        $activeSlide = this.$('.slide:first').addClass('active');
        return;
      }

      $nextSlide = $activeSlide.next('li');

      if ($nextSlide.length) {
        $activeSlide.removeClass('active');
        $nextSlide.addClass('active');
        this.collection.needsToBeSync = false;
        this.removeOldSlide($activeSlide);
      } else {
        this.collection.needsToBeSync = true;
      }


    },
    onCollectionSync: function() {
      this.collection.each(this.addSlide, this);

    },
    removeOldSlide: function($oldSlide) {
      var _this = this;
      // setTimeout(function() {
      //   _this.getView({
      //     modelCid: $oldSlide.data().modelCid
      //   }).remove();
      // }, 1000);
    }
  });
});