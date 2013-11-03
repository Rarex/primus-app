'use strict';


var argh = require('argh').argv
    , Primus
    , server
    , primus;


try { Primus = require('../../'); }
catch (e) { Primus = require('primus'); }

var http = require('http');
var multiplex = require('primus-multiplex');
server = http.createServer(function server(req, res) {
    res.setHeader('Content-Type', 'text/html');
    //fs.createReadStream(__dirname + '/index.html').pipe(res);
});
primus = new Primus(server, { transformer: argh.transformer, parser: argh.parser });
primus.use('multiplex', multiplex);
primus.on('connection', function connection(spark) {
    //console.log('new connection');
    /*spark.on('data', function data(packet) {
        console.log('incoming:', packet);

        //
        // Close the connection.
        //
        if (packet === 'end') spark.end();

        //
        // Echo the responses.
        //
        if (packet.echo) spark.write(packet.echo);

        //
        // Pipe in some data.
        //
        *//*if (packet.pipe) fs.createReadStream(__dirname + '/index.html').pipe(spark, {
            end: false
        });*//*

        var summ = 0;
        for(var i =0; i< 100; i++){
            summ += Math.sin(Math.random() *  Math.random()*i);
        }
        spark.write(summ);


        //
        // Major server kill;
        //
        if (packet !== 'kill') return;

        primus.write('Spark: '+spark.id +' asked for a full server kill. Server will be killed within 5 seconds');
        setTimeout(process.exit, 5000);

    });*/
});

var PrimusResponseManager = function(primus){
    var p = primus;
    primus.on('connection', function connection(spark) {
        console.log('new connection with id:' + spark.id);
        game.joinGame(spark);
        spark.on('data', function data(packet) {
            if( packet._id && packet._a ){
                this.emit(packet._a, packet.data);
                /*spark.write({
                    _id: packet._id,
                    success: true
                });*/
            }
        });
    });
};
var prm = new PrimusResponseManager(primus);



//
// Save the compiled file to the hard disk so it can also be distributed over
// cdn's or just be served by something else than the build-in path.
//
primus.save('primus.js');

//
// Everything is ready, listen to a port number to start the server.
//

var GameServer = require('./game/server.js');
var gameServer = new GameServer(primus);
var game = gameServer.createGame();

var PrimusSync = new (function(){
    var primusWrap = function(object, methodName, method, channel){
        return function(){
            channel.write({
                _m: methodName,
                _a: arguments
            });
            return method.call(object, arguments);
        }
    };
    var primusOnlyWrap = function(object, methodName, method, channel){
        return function(){
            channel.write({
                _m: methodName,
                _a: arguments
            });
        }
    };
    this.write = function(object, channel){
        for(var key in object){
            var method = object[key];
            if( typeof method === 'function'){
                object['$'+key] = primusWrap(object, key, object[key], channel);
                object['$$'+key] = primusOnlyWrap(object, key, object[key], channel);
            }
        }
    };
    this.read = function(object, channel){
        channel.on('connection', function (spark) {
            spark.on('data', function (data) {
                object[data._m].apply(object, data._a);
            });
        });
    }
})();

var ClientSide = function(name){
    this.name = name;
    this.say = function(){
        console.log('My id is '+this.name);
    };

    this.getName = function(){
        console.log('name returned');
        return this.name;
    };

    this.setName = function(name){
        this.name = name;
    };

    this.log = function(){
        console.log(this.name);
    };
    this.reinit = function(){
        this.$$setName(this.name);
    }
};
ClientSide.prototype.yell = function(){
    console.log('I NEED SOME HELP!!! '+this.name);
};
var c1 = new ClientSide('Tom');

PrimusSync.read(new ClientSide('Rarex'), primus.channel('client-controls'));

server.listen(+argh.port || 8080);