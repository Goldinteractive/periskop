define([
  'components/slide/View',
  'jquery.fitToParent',
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'slider',
    delay: 5,
    afterRender: function() {
      _.bindAll(this);
      this.listenTo(this.collection, 'add', this.addSlide);
      this.onCollectionSync();
      this.startTimer();
    },
    startTimer: function() {
      this.stopTimer();
      // let it sleep
      while (new Date().getSeconds() % this.delay !== 0) {
        console.log('sleep');
      }
      this.nextTick();
    },
    nextTick: function() {
      console.log(new Date().getSeconds(), new Date().getMilliseconds());
      this.timer = window.setTimeout(this.showNextSlide, this.delay * 1000 - new Date().getMilliseconds());
    },
    stopTimer: function() {
      window.clearTimeout(this.timer);
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
      console.log('show next');

      var $activeSlide = this.$('.slide.active'),
        $nextSlide;

      if (!$activeSlide.length) {
        $activeSlide = this.$('.slide:first').addClass('active');
        this.nextTick();
        return;
      }

      $nextSlide = $activeSlide.next('li');

      if ($nextSlide.length) {
        $activeSlide.removeClass('active');
        $nextSlide.addClass('active');
        this.removeOldSlide($activeSlide);
        this.nextTick();
      } else {}


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