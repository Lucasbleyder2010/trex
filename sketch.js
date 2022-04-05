var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trexcollided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOver,gameOverimg
var restart,restartimg
var jumpsound, diesound,checkpointsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverimg= loadImage("gameOver.png")
  restartimg = loadImage ("restart.png")
  trexcollided = loadImage("trex_collided.png")
  jumpsound = loadSound("jump.mp3")
  diesound = loadSound("die.mp3")
  checkpointsound = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trexcollided)
  trex.scale = 0.5;
  gameOver = createSprite(width/2,height/2)
  restart  = createSprite(width/2,height/2+50)
  gameOver.addImage(gameOverimg)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart.addImage(restartimg)
  restart.scale = 0.5
  restart.visible = false
  ground = createSprite(width/2,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Olá" + 5);
  trex.setCollider("circle",0,0,50);
  trex.debug= false
  score = 0;
}

function draw() {
  background(180);
  text("Pontuação: "+ score, width-200,height/2);
  
  if(gameState === PLAY){
       
  
    ground.velocityX = -(4+3*score/100);
   
    score = score + Math.round(getFrameRate()/60);
    if (score%100===0 && score>0){
     checkpointsound.play()

    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& trex.y >= height-70) {
        trex.velocityY = -13;
        jumpsound.play()
      }
    
  
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      diesound.play()
      gameState = END;
      trex.velocityY = -10
    }
   
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
      trex.velocityY = 0
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     gameOver.visible = true;
     restart.visible = true;
    trex.changeAnimation("collided")
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
    reset()
    }
  }
  
 

  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}
function reset(){
console.log("resetGame")
gameState = PLAY
obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
gameOver.visible = false
restart.visible = false
trex.changeAnimation("running")
score = 0

}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width,height-30,10,40);
   obstacle.velocityX = -(6+score/100);
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(width,height-90,40,10);
    cloud.y = Math.round(random(height-90,height-200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 450;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}