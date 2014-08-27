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
    /**
     * Set the global constant CLIENT_ID
     * @param  { Object } e
     */
    onKeyup: function(e) {
      // it must be a valid number
      window.app.CLIENT_ID = +$(e.currentTarget).val(); // the + typecasts it into a number
    },
    onSubmit: function(e) {
      // block the default form events
      e.preventDefault();
      // check if the CLIENT_ID is valid
      if (!window.app.CLIENT_ID || !_.isNumber(window.app.CLIENT_ID)) {
        window.alert('Please insert a valid client id');
      } else {
        // the remove event is listened by the BaseLayout.js to start the application
        this.trigger('remove');
        this.$el.fadeOut(this.remove);
      }
    }
  });
});