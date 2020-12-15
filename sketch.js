//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dogImg;

function preload() {
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happyDog.png");
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale=0.5;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  text("Note: Press UP_ARROW key to feed dog milk", 100, 100);
  textSize(24);
  fill("Red");
  stroke(4);
}

//function to read values from DB
function readStock(data) {
  foodS = data.val();
  console.log(foodS);
}

//function to write values in DB
function writeStock(x) {
  //console.log("x;" +x)
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}


