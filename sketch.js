/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1,obstacle;
var kangaroo;
var shrub;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo=createSprite(150,250);
  kangaroo.addAnimation("running",kangaroo_running);
  kangaroo.addAnimation("collided",kangaroo_collided);
  kangaroo.changeAnimation("running");
  kangaroo.scale=0.2;
  kangaroo.setCollider("circle",0,0,300);
  //kangaroo.debug=true;
  
  invisiblejungle=createSprite(width/2,350,width,15);
  invisiblejungle.visible=false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  kangaroo.x=camera.position.x-270;

  if(gameState===PLAY){
    jungle.velocityX=-3;
    if(jungle.x<100){
      jungle.x=500;
    }
    if(keyDown('space') && kangaroo.y>150){
      jumpSound.play();
      kangaroo.velocityY=-16;

    }
    kangaroo.velocityY+=1;
    RN=Math.round(random(1,2));
    switch(RN){
      case 1:spawnShrubs();
                break
      case 2:spawnObstacles();
                break
      default:break
    }
    if(shrubsGroup.isTouching(kangaroo)){
      score+=1;
      shrubsGroup.destroyEach();
    }
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState=END;
    }

  }

  else if(gameState===END){
    kangaroo.velocityY=0;
    jungle.velocityX=0;
    shrubsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    kangaroo.changeAnimation("collided");


  }
  
  kangaroo.collide(invisiblejungle);
  drawSprites();

}

function spawnShrubs(){
  if(frameCount%150===0){
    var shrub=createSprite(camera.position.x+500,330,40,10);
    shrub.velocityX=-3;
    Rn=Math.round(random(1,3));
    switch(Rn){
      case 1:shrub.addImage(shrub1);
                break
      case 2:shrub.addImage(shrub2);
                break
      case 3:shrub.addImage(shrub3);
                break
      default:break
    }
    shrub.scale=0.05
    shrub.lifetime=300
    shrubsGroup.add(shrub);

  }
}

function spawnObstacles(){
  if(frameCount%150===0){
    var obstacle=createSprite(camera.position.x+500,330,40,10);
    obstacle.velocityX=-3;
    obstacle.addImage(obstacle1)
    obstacle.scale=0.2
    obstacle.lifetime=300
    obstaclesGroup.add(obstacle);

  }
}
