var Player = function(spark){
    this.spark = spark;
    this.coordinates = [0,0];
    this.spark.on('player/move',function(data){
        debugger;
    });
};
module.exports = Player;