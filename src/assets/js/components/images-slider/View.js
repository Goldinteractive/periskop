define([
  'components/slide/View',
  'jquery.fitToParent',
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'slider',
    beforeRender: function() {
      this.collection.fetch();
    },
    afterRender: function() {
      _.bindAll(this);
      this.listenTo(this.collection, 'add', this.addSlide);
      this.listenTo(this.collection, 'effect', this.showNextSlide);
      this.collection.each(this.addSlide, this);
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
    },
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
      } else {

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