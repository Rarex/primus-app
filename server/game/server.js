/**
 * Created with JetBrains PhpStorm.
 * User: Rarex
 * Date: 29.10.13
 * Time: 14:03
 */
var Game = require('./game.js');
var GameServer = function(primus){
    this.primus = primus;
    this.games = [];
    this.createGame = function(){
        return new Game();
    }
};
module.exports = GameServer;