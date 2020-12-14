var gameState="play";
var space, spaceImage;
var ship, shipImage;
var shipGroup;
var climber, climberImage, climberGroup;
var red, redImage
var invBlock, invBlockGroup;

function preload(){
spaceImage=loadImage("Space.jpg");
shipImage=loadImage("ufo.png");
climberImage=loadImage("climber.png");
redImage=loadImage("Impostor.png");
}

function setup(){ 
createCanvas(windowWidth, windowHeight);
space=createSprite(width/300, 300, 10, 10);
space.addImage("spaceImage", spaceImage);
space.velocityY=1;
space.scale=3;
  
red=createSprite(200, height-200, 20, 50);
red.addImage("redImage", redImage);
red.scale=0.4;
 
invBlockGroup=createGroup();  
shipGroup=createGroup();
climberGroup=createGroup();
}

function draw(){
background(0);
  
if (gameState==="play"){
    
  
if(space.y>400){
space.y=300;   
}
// if(keyDown("space")){
// red.velocityY=-11;
//    }  
  if((touches.length > 0 || keyDown("SPACE")) && red.y >=height/120) {
      red.velocityY = -11;
       touches = [];
    }
  red.velocityY=red.velocityY+0.8;
  
   if(keyDown("left_arrow")){
     red.x=red.x-3
   }  
if(keyDown("right_arrow")){
red.x=red.x+3
}  
if (climberGroup.isTouching(red)){
red.velocityY=0;
}
if(invBlockGroup.isTouching(red)|| red.y>600){
   red.destroy();
  
  gameState="end";
   }
  
spawnShips();  

drawSprites();
}
  if(gameState==="end"){
     stroke("red");
     fill("red");
     textSize(40);
     text("Game Over", 40, 250);    
  }
}
  
function spawnShips(){
if(frameCount%240 === 0){
ship=createSprite(200, height/50, 20, 30);
ship.addImage("shipImage", shipImage);
ship.x=Math.round(random(120, 400))
ship.velocityY=1;
ship.lifetime=600;
ship.scale=0.3;

  shipGroup.add(ship);
  
climber=createSprite(width+200, height/10);
climber.addImage("climberImage", climberImage);
climber.velocityY=1;
climber.x=ship.x;
climber.lifetime=600;

  red.depth=ship.depth;
  red.depth=red.depth+1;
  
  climberGroup.add(climber);   
  
invBlock=createSprite(width/200,height/10);
invBlock.width=climber.width;
invBlock.height=2;
invBlock.x=ship.x;
invBlock.velocityY=1;
invBlock.debug=false;
invBlock.lifetime=600;
  
  invBlockGroup.add(invBlock);
}
}
// hjhgjgjgjhgjhgjhjhj