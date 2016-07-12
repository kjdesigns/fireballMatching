var fireballMatching = fireballMatching || {};
fireballMatching.mainMenu = {
    
    create:function(){
        
        this.counter = 0;
		this.buttons =[];
		this.buttonGrp =  this.game.add.group();
        
        if(this.game.device.localStorage)
		{
			var bestLevel = localStorage.getItem('bestLevel');
			if(bestLevel == null)
			{
				localStorage.setItem('bestLevel', 1);
				this.level = 1;
			}else
			{
					this.level = localStorage.getItem('bestLevel');
			}
		
		}
		
		
		for(var i=0; i<5;i++)
			{
				
				for(var t=0; t<5;t++)
				{
					var but = this.game.add.sprite(150+t*100,260+i*70, 'square');
					
					this.counter ++;
					//text =''+counter;
					but.name = 'but_'+this.counter;
					but.lev = this.counter;
					this.txt = this.game.add.text(150+t*100 + 18, 260+i*70+18, this.counter, {font:"18px Arial",fill:"#fff"});
					this.buttons.push(but);
					
				
					if(this.counter<= localStorage.getItem('bestLevel'))
					{ 
					but.inputEnabled = true;
					but.events.onInputDown.add(this.listener,this);
					}else
					{
						but.inputEnabled = false;
						but.alpha =0.5;
						
					}
					
				
				
    				this.buttonGrp.add(but);
    				this.buttonGrp.add(this.txt);
				}
				
			}
		
    },
    
    listener:function(target){
    	this.currentLevel=target.lev-1;
    	console.log(this.currentLevel);
    	this.game.state.start("game",true,false,this.currentLevel);
    }
}