var fireballMatching = fireballMatching || {};
fireballMatching.Preload = {
    
    preload:function(){
        
        this.game.load.spritesheet("player","assets/player.png",32,48);
        this.game.load.image("square","assets/square.png");
        this.game.load.image("pig","assets/pig.png");
        this.game.load.image("parrot","assets/parrot.png");
        this.game.load.image("panda","assets/panda.png");
        this.game.load.image("charizard","assets/charizard.png");
        
    },
    create:function(){
        this.game.state.start("mainMenu");
    
    }
    
}