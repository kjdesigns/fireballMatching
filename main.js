var fireballMatching = fireballMatching || {};
fireballMatching.game = new Phaser.Game(960,640,Phaser.AUTO);
fireballMatching.game.state.add("boot",fireballMatching.Boot);
fireballMatching.game.state.add("preload",fireballMatching.Preload);
fireballMatching.game.state.add("mainMenu",fireballMatching.mainMenu);
fireballMatching.game.state.add("game",fireballMatching.Game);

fireballMatching.game.state.start("boot");