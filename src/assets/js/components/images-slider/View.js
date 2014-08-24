define([
  'components/slide/View',
  'jquery.fitToParent',
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'slider',
    delay: 5,
    initialized: false,
    afterRender: function() {
      _.bindAll(this);
      this.listenTo(this.collection, 'add', this.addSlide);
      this.collection.each(this.addSlide, this);
      this.startTimer();
    },
    startTimer: function() {
      this.stopTimer();
      this.initialized = true;
      // sync the timer
      this.nextTick(this.delay - new Date().getSeconds() % this.delay);
    },
    nextTick: function(delay) {
      console.log(new Date().getSeconds(), new Date().getMilliseconds());

      this.timer = window.setTimeout(this.showNextSlide, ((delay || this.delay) * 1000) - new Date().getMilliseconds());
    },
    stopTimer: function() {
      window.clearTimeout(this.timer);
      this.timer = false;
    },
    insert: function($root, $el) {
      var $activeSLide = this.$('.slide.active');
      if ($activeSLide.length) {
        $activeSLide.after($el);
      } else {
        $root.append($el);
      }
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

      if (this.initialized && !this.timer) {
        this.nextTick();
      }
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
      } else {
        this.collection.connection.send(JSON.stringify([2, 'periskop', this.collection.socketChannel, {
          'action': 'givememore'
        }]));
        this.stopTimer();
      }

    },
    removeOldSlide: function($oldSlide) {
      var _this = this,
        subview = _this.getView({
          modelCid: $oldSlide.data().modelCid
        });
      setTimeout(function() {
        subview.remove();
        _this.collection.remove(subview.model);
      }, 1000);
    }
  });
});