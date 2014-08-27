define([
  'models/Image',
  'backbone'
], function(ImageModel) {

  return Backbone.Collection.extend({
    model: ImageModel,
    socketChannel: 'stream',
    connection: null,
    socketOpened: false,
    parseMessage: function(data, channelId) {
      if (data[1] === channelId) {
        return data[2];
      }
    },
    /**
     * Fetch initially all the images
     */
    initialize: function() {
      _.bindAll(this);
    },
    sendAction: function(action, data) {
      if (this.socketOpened) {
        console.log(_.extend({
          action: action
        }, data || {}));
        this.connection.send(JSON.stringify([2, 'whatever', this.socketChannel, _.extend({
          action: action
        }, data || {})]));
      }
    },
    subscribe: function(channel) {
      if (this.socketOpened) {
        this.connection.send(JSON.stringify([5, channel]));
      }
    },
    sync: function(method, model, options) {
      if (!this.socketOpened) {
        this.connection = new WebSocket('ws://178.62.185.145:55555');
        this.connection.onopen = this.onSocketOpened;
        this.connection.onmessage = this.onSocketMessage;
        this.connection.onerror = this.onSocketError;
        this.connection.onclose = this.onSocketError;
      }
    },
    onSocketOpened: function(e) {
      this.socketOpened = true;
      if (window.app.CLIENT_ID) {
        console.log(window.app.CLIENT_ID);

        this.sendAction('join', {
          'number': window.app.CLIENT_ID
        });

        this.subscribe(this.socketChannel);

        this.trigger('sync');

      } else {
        console.warn('No client id');
      }
    },
    onSocketMessage: function(e) {
      var data = this.parseMessage(JSON.parse(e.data), this.socketChannel);
      console.log(data);
      if (data) {
        switch (data.action) {
          case 'add':
            this.add(data.image);
            break;
          default:
            this.trigger(data.action);
        }
      }
    },
    onSocketError: function(e) {
      alert('Oups an error occurred!');
      console.log(e);
    }
  });
});