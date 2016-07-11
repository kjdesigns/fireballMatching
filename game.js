var fireballMatching = fireballMatching || {};
fireballMatching.Game = {
    
    init:function(currentLevel){
        this.currentLevel = currentLevel || 0;
        
        this.map =[
                {
                    buttons:[{x:100,y:300,key:"pig"},{x:300,y:300,key:"parrot"}],
                    questionText:{x:100,y:400,text:"Babui"},
                    rightAnswer:"pig"
                },
                {
                    buttons:[{x:200,y:400,key:"parrot"},{x:300,y:300,key:"pig"}],
                    questionText:{x:100,y:500,text:"Parrot"},
                    rightAnswer:"parrot"
                }
            
            ];
            
        
        this.maxLevel=25;
    },
  
  create:function(){
      //variables
      this.canGoNextLevel = false;
      
      
      this.game.stage.backgroundColor="#8296d1";
      this.player = this.game.add.sprite(100,100,"player");
      this.player.animations.add("walk",[20,21,22,23,24],5,true);
      this.player.animations.play("walk");
      this.game.physics.arcade.enable(this.player);
      
      this.enemies = this.game.add.group();
      this.enemies.enableBody = true;
      this.enemies.createMultiple("3","charizard");
      
      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.createMultiple("3","square");
      
      
//       this.refresh = this.game.add.sprite(fullWidth-100, 10, "refresh");
// 	  this.refresh.inputEnabled = true;
// 	  this.refresh.events.onInputDown.add(this.listener,this);
      
      
      this.createEnemy();
      this.buildMap();
  }, 
  
  update:function(){
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);  
    this.game.physics.arcade.overlap(this.player, this.bullets, this.collisionHandler, null, this);  
    
     if(this.enemy.alive==false){
              console.log("enemy is dead")
                 //this.canGoNextLevel = true;
              //this.currentLevel++;
              
              //tween the correct display
              this.showCorrectTween = this.game.add.tween(this.showCorrect).to({y:this.game.world.centerY},1000,"Linear",true);
              this.showCorrectTween.onComplete.add(function(){
                  this.goToNextLevel();
              },this)
              //this.game.time.events.add(Phaser.Timer.SECOND*4,this.goToNextLevel,this);
          }
    
  },
  
  createEnemy:function(){
      this.enemy = this.enemies.getFirstDead();
      
      if(!this.enemy){
          return;
      }else{
          
          this.enemy.reset(this.game.world.width,50);
          
      }
      
         this.enemy.body.velocity.x = -100;

        // Kill the enemy when out of the screen
        this.enemy.checkWorldBounds = true;
        this.enemy.outOfBoundsKill = true;
        this.enemy.scale.setTo(0.5);
      
      
      
  },
  
  
  
  collisionHandler:function(bullet,enemy){
    bullet.kill();
    enemy.kill();
    
    
  },
  
  createBullet:function(x,y,direction){
      var bullet = this.bullets.getFirstDead();
      if(!bullet){
          return;
      }else{
          bullet.reset(x,y);
      }
      
      //bullet.body.velocity.x=300;
      bullet.body.velocity.x=direction;
      bullet.checkWorldBounds = true;
      bullet.outOfBoundsKill = true;
      
  },
  
  buildMap:function(){
      this.levelData = this.map[this.currentLevel];
      this.animalButton = this.game.add.group();
      var button;
      this.levelData.buttons.forEach(function(element){
          button = this.game.add.sprite(element.x,element.y,element.key);
          button.anchor.setTo(0.5);
          button.scale.setTo(0.3);
          button.inputEnabled = true;
          this.animalButton.add(button);
         
      },this);
      
      this.animalButton.forEach(function(element){
           element.events.onInputDown.add(this.checkAnswer,this);
      },this)
      
      this.text = this.game.add.text(this.levelData.questionText.x,this.levelData.questionText.y,this.levelData.questionText.text,{font:"21px Arial",fill:"#fff"});
      
      this.showCorrect = this.game.add.text(this.game.world.centerX,this.game.world.height,"CORRECT",{font:"30px Arial",fill:"#fff",align:"center"});
      
     
      
  },
  
  checkAnswer:function(sprite){
      if(sprite.key==this.levelData.rightAnswer){
          console.log("Match");
          this.createBullet(this.player.x+30,this.player.y,300);
         
      }else{
          console.log("no match");
          this.createBullet(this.enemy.x-30,this.enemy.y+50,-300);
      }
      
    //   //check if the enemy sprite is dead
    //       if(this.enemy.alive == false){
    //           this.canGoNextLevel = true;
    //           this.currentLevel++;
              
    //           //tween the correct display
    //           this.showCorrectTween = this.game.add.tween(this.showCorrect).to({y:this.game.world.centerY},1000,"Linear",true);
    //           this.showCorrectTween.onComplete.add(function(){
    //               this.goToNextLevel();
    //           },this)
    //       }
    
    
    this.checkIfEnemyIsDead();
  },
  
  goToNextLevel:function(){
      
      //the answer is right so add 1 to currentLevel
          this.currentLevel++;
          console.log(this.currentLevel);
          this.canGoNextLevel = false;
          
          if(this.currentLevel > this.maxLevel){
				console.log("Game Finished");
				//this.quitGame();
			}else{
				if(this.currentLevel > localStorage.getItem('bestLevel')){
				localStorage.setItem('bestLevel', this.currentLevel);
			    }
				//console.log("New Level");
				//this.goToNextLevel();
			}
      
      this.game.state.start("game",true,false,this.currentLevel);
  },
  
  checkIfEnemyIsDead:function(){
      if(this.enemy.alive==false){
          console.log("HEY MAN");
      }
  }
    
    
};