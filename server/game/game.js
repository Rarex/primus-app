var Player = require('./player.js');

var Game = function(){
    this.players = [];
    this.joinGame = function(spark){
        this.players.push(new Player(spark));
        this.sendToPlayers(this.players, 'Player with id='+spark.id +' has joined the game.');
        this.sendToPlayers(this.players, this.players.length);
        if( this.players.length > 1){
            var seconds = 5;
            var self = this;
            var interval = setInterval(function(){
                self.sendToPlayers(self.players, 'Game will start in '+(seconds--)+' seconds');

            }, 900);
            setTimeout(function(){
                clearInterval(interval);
                self.sendToPlayers(self.players, "Let's the hunt begin!");
            }, seconds * 1000);
        }
    };
    this.sendToPlayers = function(players, message){
        for(var i=0; i<players.length; i++){
            players[i].spark.write(message);
        }
    }
};
module.exports = Game;