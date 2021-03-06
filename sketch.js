var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground, jungle, jungleImage;
var foodGroup, obstacleGroup, survivalTimeScore;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var x = 0;
var y;
function preload(){
  monkey_running = loadAnimation("Images/sprite_0.png"," Images/sprite_1.png"," Images/sprite_2.png"," Images/sprite_3.png"," Images/sprite_4.png"," Images/sprite_5.png"," Images/sprite_6.png"," Images/sprite_7.png"," Images/sprite_8.png");
  bananaImage = loadImage("Images/banana.png");
  obstacleImage = loadImage("Images/obstacle.png");
  jungleImage = loadImage("Images/jungle.jpg");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
   /*jungle = createSprite(displayWidth*4, displayHeight);
  jungle.addImage(jungleImage);
  jungle.scale = 3;*/
  monkey = createSprite(80, displayHeight-75, 20, 20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(displayWidth/2, displayHeight-50, displayWidth*7, 10);
  //console.log(ground.x);
  ground.visible = false;
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  monkey.setCollider("rectangle",0,0,10, monkey.height);
  survivalRate = 0;
}


function draw() {
background("purple");
if(gameState===PLAY){
  x = x+4;
  image(jungleImage, 0,0,displayWidth*5, displayHeight);
  camera.position.x = displayWidth+x;
  camera.position.y = displayHeight/2;
  monkey.x = camera.position.x - 250;
  //ground.x = camera.position.x;
  //jungleImage.x = camera.position.x;
  if(keyDown("space")|| touches.length>0) {
        monkey.velocityY = -12;
    touches=[];
  }
   monkey.velocityY = monkey.velocityY+1.2;
  spawnObstacles();
  spawnBananas();
  
  if(frameCount>900){
    gameState = END;
  }
  /*if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }*/
  if(obstaclesGroup.isTouching(monkey)&&survivalTime>0 ){
    survivalTime = survivalTime - 1;
  }
  monkey.collide(ground);
  ground.visible=false;
  drawSprites();
  survivalTimeScore();
}
if(gameState===END){
  stroke("white");
  textSize(20);
  strokeWeight(4);
  text("Game Over", displayWidth/2, displayHeight/2);
  camera.position.x = displayWidth/2;
  camera.position.y = displayHeight/2;
  text("Survival time:"+ survivalTime,displayWidth/2,displayHeight+100);
}  
}
function survivalTimeScore(){
  stroke("red");
  textSize(20);
  fill("red");
  if(monkey.isTouching(foodGroup)){
    survivalTime = survivalTime+1; 
    foodGroup.destroyEach();
  }
  text("Survival time:"+ survivalTime,displayWidth/2+x,displayHeight-800);
}

function spawnObstacles(){
   if(frameCount%200===0){
    obstacle = createSprite(500, height-70, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.x = camera.position.x+800;
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
   }
  }

function spawnBananas(){
    if(frameCount%120===0){
      banana = createSprite(width-40, height-85, 20, 20);
      banana.y = Math.round(random(displayHeight/2-50,displayHeight/2+50));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.x = camera.position.x+800;
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth + 1;
      foodGroup.add(banana);
    }
  }
