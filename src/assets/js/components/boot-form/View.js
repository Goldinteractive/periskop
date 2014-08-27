define([
  'layoutmanager'
], function(SlideComponent) {
  return Backbone.View.extend({
    el: '#boot-form',
    events: {
      'submit': 'onSubmit',
      'keyup input': 'onKeyup'
    },
    initialize: function() {
      _.bindAll(this);
    },
    onKeyup: function(e) {
      window.app.CLIENT_ID = +$(e.currentTarget).val();
    },
    onSubmit: function(e) {
      e.preventDefault();
      if (!window.app.CLIENT_ID || !_.isNumber(window.app.CLIENT_ID)) {
        window.alert('Please insert a valid client id');
      } else {
        this.trigger('remove');
        this.$el.fadeOut(this.remove);
      }
    }
  });
});