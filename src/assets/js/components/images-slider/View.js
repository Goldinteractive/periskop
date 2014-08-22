define([
  'components/slide/View',
  'jquery.fitToParent',
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'slider',
    afterRender: function() {
      _.bindAll(this);
      this.listenTo(this.collection, 'add', this.addSlide);
      this.onCollectionSync();
      this.startTimer();
    },
    startTimer: function() {
      this.stopTimer();
      this.timer = window.setInterval(this.showNextSlide, 2000);
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
        model: imageModel
      })).render();
    },
    showNextSlide: function() {
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
      } else {
        this.collection.needsToBeSync = true;
      }


    },
    onCollectionSync: function() {
      this.collection.each(this.addSlide, this);

    },
    removeOldSlide: function() {}
  });
});