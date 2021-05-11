const PLAY = 1;
const END = 0;
var state = PLAY;



var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;


function preload(){
  
 monkey_running = loadAnimation 
("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,400)
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
 monkey = createSprite(200,350,40,40);
 monkey.addAnimation("moving",monkey_running); 
 monkey.addImage("stationary", monkey_stop); 
 monkey.scale = 0.1;
  
 ground = createSprite(200,390,1200,50); 
 ground.velocityX = -6;
 ground.x = ground.width/2;
 console.log(ground.x);
  
  restart = createSprite(300,200,30,30);
  restart.shapeColor="red";
  
  
  
}

 
function draw() {
background("white"); 
  
  if(state === PLAY){
    ground.velocityX = -6;
    
  if(ground.x < 0){
    ground.x = ground.width/2
  }
    
  if(keyDown("space") && monkey.y >=330){
   monkey.velocityY = -12;}
    restart.visible = false;
    
   
  monkey.velocityY = monkey.velocityY+0.4;
  monkey.collide(ground);  
    
   spawnObstacles();
   spawnBananas();  
    
    stroke("black");
    fill("black");
  if(FoodGroup.isTouching(monkey)){
    survivalTime = survivalTime + 1
    FoodGroup[0].destroy();
  }
    text("Survival Time: "+ survivalTime,200,20); 
     
   if(obstacleGroup.isTouching(monkey)){
   state = END;
     } 
  }
 else if(state === END){
    monkey.changeImage("stationary",monkey_stop);
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1); 
   ground.velocityX = 0;
   monkey.collide(ground)
  restart.visible = true;
  stroke("black");
  fill("black");
  text("GAME OVER",300,270);
 
   if(mousePressedOver(restart)){
     reset();
   }
 }  
 
  
 
 drawSprites();
}


function spawnBananas(){
 if(frameCount % 60 === 0){
banana = createSprite(640,200,40,40);
 banana.addImage(bananaImage);
 banana.y = Math.round(random(100,300));
 banana.velocityX = -6;
 banana.scale = 0.1;
 banana.lifetime = 100;
 FoodGroup.add(banana);}
}
function spawnObstacles(){
  if(frameCount %  60 === 0){
 obstacle = createSprite(640,350,50,50);
 
    var pos = Math.round(random(1,2));
      
    switch(pos){
      case 1 :
        obstacle.addImage(obstacleImage)
        break;
       
     case 2 :  
        obstacle.addImage(obstacleImage);
        break;
        default: break; 
    }
 obstacle.velocityX = -6;
 obstacle.scale = 0.1;
 obstacle.setCollider("rectangle",0,0,100,30,-45)   
 obstacle.debug = true;   
 obstacle.lifetime = 100; 
 obstacleGroup.add(obstacle); }
}

function reset(){
  state = PLAY; 
  score = 0;
  monkey.changeAnimation("moving",monkey_running);
  
  restart.visible = false;
  obstacleGroup.setLifetimeEach(0);
  FoodGroup.setLifetimeEach(0); 
}
