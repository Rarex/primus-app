// Generated by CoffeeScript 1.6.3
(function() {
  var Client, Server, ServerConfig, SuperClient, Timer;

  namespace({
    App: ServerConfig = (function() {
      function ServerConfig(settings) {
        if (settings == null) {
          settings = {};
        }
        this.stepInterval = 500;
        extend(this, settings);
      }

      return ServerConfig;

    })()
  });

  namespace({
    App: Timer = (function() {
      Timer.STATE_INIT = 'init';

      Timer.STATE_ACTIVE = 'active';

      Timer.STATE_PAUSE = 'pause';

      function Timer(stepInterval) {
        var state, tickNumber, timerIntervalLink;
        this.stepInterval = stepInterval;
        state = this.constructor.STATE_INIT;
        timerIntervalLink = null;
        tickNumber = 0;
      }

      Timer.prototype.tick = function() {
        tickNumber++;
        return this.onTick();
      };

      Timer.prototype.onTick = function() {};

      Timer.prototype.start = function() {
        var state, timerIntervalLink;
        if (state === this.constructor.STATE_INIT || state === this.constructor.STATE_PAUSE) {
          state = this.constructor.STATE_ACTIVE;
          return timerIntervalLink = setInterval(this.tick, this.stepInterval);
        }
      };

      Timer.prototype.pause = function() {
        var state;
        if (state === this.constructor.STATE_ACTIVE) {
          state = this.constructor.STATE_PAUSE;
          return clearInterval(timerIntervalLink);
        }
      };

      Timer.prototype.someMethod = function() {};

      return Timer;

    })()
  });

  namespace({
    App: Client = (function() {
      function Client(name) {
        this.name = name;
      }

      Client.prototype.getId = function() {
        return this.name;
      };

      return Client;

    })()
  });

  namespace({
    App: SuperClient = (function() {
      function SuperClient() {}

      return SuperClient;

    })()
  });

  namespace({
    App: Server = (function() {
      function Server(config) {
        this.config = config;
        this.timer = new App.Timer(this.config.stepInterval);
        this.superClient = new App.SuperClient('Server Super Client');
        this.clients = {};
        this.timer.onTick = function() {};
        this.timer.start();
      }

      Server.prototype.addClient = function(client) {
        return this.clients[client.getId()] = client;
      };

      return Server;

    })()
  });

}).call(this);

/*
//@ sourceMappingURL=App.map
*/