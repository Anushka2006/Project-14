var path,boy,cash,diamonds,jwellery,sword,eni;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameState= "play";
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,530,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  boy.debug=false;
  boy.setCollider("circle",10,10,190);

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    
  if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection= treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection= treasureCollection+50;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection+50;
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState="end";
        swordGroup.destroyEach();
    }
  }
    
  if(gameState==="end"){
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    cashG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    cashG.destroyEach();
    boy.destroy();
    path.velocityY=0;
    eni=createSprite(200,300,10,10);
    eni.addAnimation("ending",endImg);
    eni.scale = 0.8;
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 140 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 200 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}