namespace App:
  class ServerConfig
    constructor: (settings={}) ->
      @stepInterval = 500
      extend(@, settings);

namespace App:
  class Timer
    @STATE_INIT = 'init'
    @STATE_ACTIVE = 'active'
    @STATE_PAUSE = 'pause'
    constructor: (@stepInterval) ->
      state = @constructor.STATE_INIT
      timerIntervalLink = null
      tickNumber = 0
    tick: ->
      tickNumber++
      #log("Tick number: #{tickNumber}")
      @onTick()
    onTick: ->
    start: ->
      if state is @constructor.STATE_INIT or state is @constructor.STATE_PAUSE
        state = @constructor.STATE_ACTIVE
        timerIntervalLink = setInterval @tick,@stepInterval
    pause: ->
      if state is @constructor.STATE_ACTIVE
        state = @constructor.STATE_PAUSE
        clearInterval(timerIntervalLink)
    someMethod: ->

namespace App:
  class Client
    constructor: (@name) ->
    getId: ->
      @name

namespace App:
  class SuperClient

namespace App:
  class Server
    #clients = {}
    #superClient
    #timer
    constructor: (@config) ->
      @timer = new App.Timer(@config.stepInterval)
      @superClient = new App.SuperClient('Server Super Client');
      @clients = {}

      @timer.onTick = ->
      @timer.start()

    addClient: (client) ->
      @clients[client.getId()] = client