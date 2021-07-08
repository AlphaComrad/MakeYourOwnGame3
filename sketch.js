//variables
var bg,bg1,bgimg,bg1img;
var player,playerimg;
var meteor,meteorleftimg,meteorrightimg;
var gameState="start";
var play,playimg;
var blastimg;
var meteorgrp;
var gameover,gameoverimg;
var blastsound;
var clicksound;

function preload(){
  bgimg=loadImage("Space.jpg");
  playerimg=loadImage("rocket.png");
  meteorleftimg=loadImage("meteorleft.png");
  meteorrightimg=loadImage("meteorright.png");
  bg1img=loadImage("Bg.png");
  playimg=loadImage("play.png");
  blastimg=loadImage("blast.png");
  gameoverimg=loadImage("gameover.png");
  blastsound=loadSound("crash.wav");
  clicksound=loadSound("click.mp3");
}

function setup() {
  createCanvas(1200,600);

  bg1 = createSprite(600,300,1200,600);
  bg1.addImage(bg1img);

  play = createSprite(600,300,50,50);
  play.addImage(playimg);

  bg = createSprite(600,300,1200,600);
  bg.addImage(bgimg);
  bg.velocityY=5;

  player=createSprite(600,500,50,50)
  player.addImage(playerimg);
  player.scale=0.7;

  gameover = createSprite(600,300,50,50);
  gameover.addImage(gameoverimg);

  meteorgrp=new Group();
}

function draw() {
  background(0);  

  if(gameState==="start"){
    bg1.visible=true;
    play.visible=true;
    bg.visible=false;
    player.visible=false;
    gameover.visible=false;

    if(mousePressedOver(play)){
      clicksound.play();
      gameState = "play";
    }

    if(frameCount%2===0){
      play.scale=0.8;
    }
    else{
      play.scale=0.6;
    }
  }

  if(gameState==="play"){
    bg1.visible=false;
    play.visible=false;
    bg.visible=true;
    player.visible=true;
    gameover.visible=false;

    if(bg.y > 600){
      bg.y =300;
   }
   if(keyDown("left")){
     player.x = player.x-5;
   }
   if(keyDown("right")){
     player.x = player.x+5;
   }
   spawnMeteors();
   if(player.isTouching(meteorgrp)){
     blastsound.play();
    gameState="end";
   }
  }
  if(gameState==="end"){
    player.addImage(blastimg);
    player.changeImage(blastimg);
    player.scale=1.2;
    gameover.visible=true;

    meteorgrp.destroyEach();
    bg.velocityY=0;
  }

  drawSprites();
}
function spawnMeteors(){
  if(frameCount%100===0){
    var num=Math.round(random(1,2));
    if(num===1){
      meteor=createSprite(random(600,1200),0,30,30);
      meteor.addImage(meteorleftimg);
      meteor.velocityY=6;
      meteor.velocityX=-3;
    }
    if(num===2){
      meteor=createSprite(random(0,600),0,30,30);
      meteor.addImage(meteorrightimg);
      meteor.velocityY=6;
      meteor.velocityX=3;
    }
    meteorgrp.add(meteor);
  }
}