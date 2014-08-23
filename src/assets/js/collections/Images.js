define(['models/Image', 'backbone'], function(ImageModel) {

  /**
   * Websocket private helpers
   */
  var connection = new WebSocket('ws://178.62.185.145:55555'),
    socketOpened = false,
    parseMessage = function(data, channelId) {
      if (data[1] === channelId) {
        return data[2];
      }
    };

  return Backbone.Collection.extend({
    model: ImageModel,
    socketChannel: 'stream',
    /**
     * Fetch initially all the images
     */
    initialize: function() {
      _.bindAll(this);
      this.fetch();
    },
    parse: function(data) {
      return data.existing_images;
    },
    sync: function(method, model, options) {
      var _this = this;
      if (!socketOpened) {
        connection.onopen = function() {
          connection.send(JSON.stringify([5, _this.socketChannel]));
        };
        connection.onmessage = function(e) {
          var data = parseMessage(JSON.parse(e.data), _this.socketChannel);
          if (data) {
            options.success(data);
          }
        };
        connection.onerror = function(e) {
          alert('Oups an error occurred!');
          console.log(e);
        };
      }

    }

  });
});