var fireballMatching = fireballMatching || {};
fireballMatching.Boot = {
    
    init:function(){
      
        
        
    },
    
    preload:function(){
        this.game.load.image("ibb","assets/ibbturtle2.png");
        this.game.load.image("ibb2","assets/ibbturtle.png");
    },
    
    create:function(){
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.game.state.start("preload");
        console.log("going to preload state");
    }
    
}