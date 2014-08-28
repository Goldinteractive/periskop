define([
  'helpers/helpers',
  'models/Image',
  'backbone'
], function(helpers, ImageModel) {

  return Backbone.Collection.extend({
    model: ImageModel,
    socketChannel: 'stream',
    connection: null,
    socketOpened: false,
    /**
     * Get the content of any websocket message
     * @param  { Object } data
     * @param  { String } channelId
     */
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
    /**
     * Send a message to the socket server
     * @param  { String } action: key to trigger some server socket events
     * @param  { Object } data: other message properties
     */
    sendAction: function(action, data) {
      if (this.socketOpened) {
        var message = [2, 'We come in peace! ☮', this.socketChannel, _.extend({
          action: action
        }, data)];

        // debug stuff
        console.log(message);

        this.connection.send(JSON.stringify(message));
      }
    },
    /**
     * Subscribe this client to a channel of the current websocket connection
     * @param  { String } channel: channel id
     */
    subscribe: function(channel) {
      if (this.socketOpened) {
        this.connection.send(JSON.stringify([5, channel]));
      }
    },
    /**
     * Override the normal backbone sync method to let it work with websockets
     */
    sync: function(method, model, options) {
      // the other sync methods will be skipped if the connection has been already opened
      if (!this.socketOpened) {
        this.connection = new WebSocket('ws://178.62.185.145:55555');
        // listen the websocket events
        this.connection.onopen = this.onSocketOpened;
        this.connection.onmessage = this.onSocketMessage;
        this.connection.onerror = this.onSocketError;
        this.connection.onclose = this.onSocketError;
      }
    },
    /**
     * One websocket connection opened callback
     * @param  { Object } e
     */
    onSocketOpened: function(e) {
      setTimeout(_.bind(function() {
        this.socketOpened = true;
        if (window.app.CLIENT_ID) {
          console.log('Client id= ' + window.app.CLIENT_ID);

          this.sendAction('join', {
            'number': window.app.CLIENT_ID
          });
          this.subscribe(this.socketChannel);
          this.trigger('sync');

        } else {
          console.warn('No client id');
        }
      }, this));
    },
    /**
     * One websocket message callback
     * @param  { Object } e
     */
    onSocketMessage: function(e) {
      setTimeout(_.bind(function() {
        // detect the content of the message received
        var data = this.parseMessage(JSON.parse(e.data), this.socketChannel);
        // if the content is relevant
        if (data) {
          // we trigger some actions on the client
          switch (data.action) {
            case 'add':
              this.add(data.image);
              break;
            case 'kill':
              // Kill a connection without reconnecting it again
              this.connection.onclose = this.connection.onerror = null;
              helpers.alert('Jemand hat deinen Spot übernommen!');
              this.connection.close();
              break;
            default:
              this.trigger(data.action);
          }
        }
      }, this));

    },
    /**
     * One websocket error or disconnection callback
     * @param  { Object } e
     */
    onSocketError: function(e) {
      // helpers.alert('Oups an error occurred!');
      this.socketOpened = false;
      setTimeout(this.fetch, 10000);
      console.log(e);
    }
  });
});