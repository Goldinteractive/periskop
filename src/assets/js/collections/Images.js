define(['models/Image', 'backbone'], function(ImageModel) {
  return Backbone.Collection.extend({
    model: ImageModel,
    url: 'http://www.goldinteractive.ch/party/api/images/latest',
    // url: 'assets/json-data/images.json',
    pollingDelay: 10, // seconds
    needsToBeSync: false,
    /**
     * Fetch initially all the images
     */
    initialize: function() {
      _.bindAll(this);
      this.fetch();
      this.initPollingLoop();
    },
    sync: function(method, model, options) {
      options.timeout = 10000;
      options.dataType = 'jsonp';
      return Backbone.sync(method, model, options);
    },
    /**
     * Initialize the polling with the server
     */
    initPollingLoop: function() {
      this.stopTimer();
      this.timer = window.setInterval(this.poll, 1000);
      return this;
    },
    poll: function() {
      // Keep it in sync with the device clock
      if (new Date().getSeconds() % this.pollingDelay === 0 && this.needsToBeSync) {
        this.fetch({

        });
      }
    },
    /**
     * Stop the polling timer
     */
    stopTimer: function() {
      window.clearTimeout(this.timer);
      return this;
    }
  });
});