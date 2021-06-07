var backImage,backgr;
var monkey, monkeyRun;
var ground,ground_img;
var banana, bananaImg, bananaGrp;
var obstacle, obstacleImg, obstacleGrp;
var gameOver, gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkeyRun = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkeyRun);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGrp = createGroup();
  obstacleGrp = createGroup();

  score = 0;
  
}

function draw() { 


  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);

    if(bananaGrp.isTouching(monkey)){
      bananaGrp.destroyEach();
      score+=2;
      monkey.scale+=+0.03;
    }

    spawnBanana();
    spawnObstacles();

    if(obstacleGrp.isTouching(monkey)){
      gameState=END;
     }

  }

  
   if(gameState===END){
     ended();
 }


  drawSprites();

  stroke("white");
  strokeWeight(1);
  fill("white");
  textSize(20);
  text("Score : " + score, 650, 50);
}

function spawnBanana(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(800,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImg);
    banana.velocityX = -4;
    banana.scale=0.05;
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    bananaGrp.add(banana);
    }
}

function spawnObstacles(){
  if(frameCount %150 === 0){
    var obstacle = createSprite(800, 320, 40, 10);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX=-6;
    obstacle.scale=0.2;
    obstacle.lifetime = 300;
    obstacleGrp.add(obstacle);
  }
}

function ended(){

  backgr.velocityX=0;
  monkey.visible=false;
  bananaGrp.destroyEach();
  obstacleGrp.destroyEach();

  fill("white");
  textSize(30);
  text("GAME OVER", 400, 200);
}
