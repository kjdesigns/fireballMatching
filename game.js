var fireballMatching = fireballMatching || {};
fireballMatching.Game = {
    
    init:function(currentLevel){
        this.currentLevel = currentLevel || 0;
        
        this.map =[
                {
                    buttons:[{x:100,y:300,key:"pig"},{x:300,y:300,key:"parrot"}],
                    questionText:{x:100,y:400,text:"Babui"},
                    rightAnswer:"pig",
                    enemySpeed:400
                },
                {
                    buttons:[{x:200,y:400,key:"parrot"},{x:300,y:300,key:"pig"}],
                    questionText:{x:100,y:500,text:"Parrot"},
                    rightAnswer:"parrot",
                    enemySpeed:100
                },
                
                {
                    buttons:[{x:200,y:400,key:"parrot"},{x:300,y:300,key:"pig"},{x:400,y:300,key:"panda"}],
                    questionText:{x:100,y:500,text:"PANDA"},
                    rightAnswer:"panda",
                    enemySpeed:200
                },
                {
                    buttons:[{x:200,y:400,key:"panda"},{x:300,y:300,key:"parrot"},{x:400,y:300,key:"pig"}],
                    questionText:{x:100,y:500,text:"PANDA"},
                    rightAnswer:"panda",
                    enemySpeed:200
                }
            
            ];
            
        
        this.maxLevel=25;
    },
  
  create:function(){
      //variables
      this.canGoNextLevel = false;
      this.levelData = this.map[this.currentLevel];
      this.lives=3;
      this.failedLevel = false;
     
      
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
      

      
      
      this.createEnemy();
      this.buildMap();
     
  }, 
  
  update:function(){
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);  
    this.game.physics.arcade.overlap(this.player, this.bullets, this.killBulletAgainstPlayer, null, this); 
    this.game.physics.arcade.overlap(this.player, this.enemies, this.playerAndEnemyCollide, null, this); 
    
    this.checkIfEnemyIsDead();
    
     
       
    
    
   
    
  },
  
  createEnemy:function(){
      this.enemy = this.enemies.getFirstDead();
      
      if(!this.enemy){
          return;
      }else{
          
          this.enemy.reset(this.game.world.width,50);
          
      }
      
         this.enemy.body.velocity.x = -this.levelData.enemySpeed;

        // Kill the enemy when out of the screen
        this.enemy.checkWorldBounds = true;
        this.enemy.outOfBoundsKill = true;
        this.enemy.scale.setTo(0.5);
      
      
      
  },
  
  
  
  collisionHandler:function(bullet,enemy){
    bullet.kill();
    enemy.kill();
    
  },
  
  killBulletAgainstPlayer:function(player,bullet){
    if(this.lives>0){
        bullet.kill();
      
    }
    else{
        bullet.kill();
        player.kill();
        this.disableAnimalButtons();
        //SHOW A GAME OVER STATE
        ///////////////////////////////+++++++++++++++++++++++++++++++++++++++++++++++++/////////////////////////
       // this.checkIfEnemyIsDead();
        //this.game.state.start("game",true,false,this.currentLevel);
    }
    
     this.lives--;
     console.log(this.lives);
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
      
      this.showCorrect = this.game.add.text(this.game.world.centerX,this.game.world.centerY,"CORRECT",{font:"30px Arial",fill:"#fff",align:"center"});
      this.showCorrect.scale.setTo(0);
      
      this.showFail = this.game.add.text(this.game.world.centerX,this.game.world.centerY,"YOU DIED",{font:"30px Arial",fill:"#fff",align:"center"});
      this.showFail.scale.setTo(0);
      
      this.playAnimalSound(this.levelData.questionText);
      
     
     
      
  },
  
  checkAnswer:function(sprite){
      if(sprite.key==this.levelData.rightAnswer){
          console.log("Match");
          this.createBullet(this.player.x+50,this.player.y,this.levelData.enemySpeed+300);
          //this.disableAnimalButtons();
         
      }else{
          console.log("no match");
          this.createBullet(this.enemy.x-30,this.enemy.y+50,-(this.levelData.enemySpeed+300));
          
      }
      
 
 
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
      console.log(this.currentLevel + "is the currentLevel from the goToNextLevel function");
      this.game.state.start("game",true,false,this.currentLevel);
  },
  
  checkIfEnemyIsDead:function(){
      
       
       if(this.enemy.alive==false && !this.canGoNextLevel && this.player.alive){
           this.canGoNextLevel=true;
           //this.currentLevel++;
           if(this.canGoNextLevel){
               var tween = this.game.add.tween(this.showCorrect.scale).to({x:2,y:2},500,Phaser.Easing.Bounce.Out,true);
                this.disableAnimalButtons();
              tween.onComplete.add(function(){
                  this.showCorrect.inputEnabled=true;
                  this.showCorrect.events.onInputDown.add(function(){
                      this.enableAnimalButtons();
                     //this.game.state.start("game",true,false,this.currentLevel);  
                     this.goToNextLevel();
                  },this);
              },this);
               
           }
          
      }
      else if(this.player.alive==false && !this.failedLevel){
          //disable buttons because the player is dead and tween an animation
          this.failedLevel = true;
          this.disableAnimalButtons();
              var failTween = this.game.add.tween(this.showFail.scale).to({x:3,y:3},500,Phaser.Easing.Bounce.Out,true);
             
              failTween.onComplete.add(function(){
                  this.showFail.inputEnabled=true;
                  this.showFail.events.onInputDown.add(function(){
                      this.enableAnimalButtons();
                      this.failedLevel=false;
                      this.game.state.start("game",true,false,this.currentLevel);
                  },this);
              },this);
               
           
      }
      
  },
  
  disableAnimalButtons:function(){
      this.animalButton.forEach(function(element){
          element.inputEnabled = false;
      },this);
  },
  
  enableAnimalButtons:function(){
      this.animalButton.forEach(function(element){
          element.inputEnabled = true;
      },this);
  },
  
  playAnimalSound:function(sprite){
      console.log(sprite.text);
  },
  
  playerAndEnemyCollide:function(player,enemy){
      player.kill();
      enemy.kill();
      //probably play a cool enemy animation for the game over state
      /////////++++++++++++++++++++++++++++++++++++++++////////////
      this.checkIfEnemyIsDead();
      //this.game.state.start("game",true,false,this.currentLevel);
      
  }
  
  
    
    
};










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