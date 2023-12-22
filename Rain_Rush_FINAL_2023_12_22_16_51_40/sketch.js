let gameState = "start";
let character;
let character2
let raindrops = [];
let haildrops = []
let score1 = 0
let score2 = 0
let scoreBarWidth = 0
let timer = 25
let timer2 = 25
let gnomeImg;
let gnome2Img
let rainImg
let hailImg
let gardenImg
let gardenImg2
let gardenImg3
let cloudImg = [];
let clouds = [];
let lastCloudTime = 0;
let cloudInterval = 2000; 
let gif
let backgroundMusic
let rainSound


function preload() {
  gnomeImg = loadImage("gnome.png");
  gnome2Img = loadImage("gnome2.png");
  rainImg = loadImage("rain.png");
  hailImg = loadImage("hail.png");
  gardenImg = loadImage("garden.png");
  gardenImg2 = loadImage("garden2.png");
  gardenImg3 = loadImage("garden3.png");
  cloudImg[0] = loadImage("cloud1.png");
  cloudImg[1] = loadImage("cloud2.png");
  cloudImg[2] = loadImage("cloud3.png");
  cloudImg3 = loadImage("cloud4.png");
  cloudImg2 = loadImage("cloud2.png");
  backgroundMusic = loadSound("cutemusic.mp3");
  rainSound = loadSound("rain.mp3");

}

function setup() {
  createCanvas(500, 600);
  backgroundMusic.loop();
  
  rainSound.setVolume(0.5);
  rainSound.loop();
  
  character = new Character(width / 2, height - 100);
  character2 = new Character2(width / 2, height - 100);
  
 gif = createImg("splash.gif", "gif");
 gif.size(100, 50);
 gif.hide()

 fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  
}

function draw() {
  if (gameState === "start" || gameState === "game" || gameState === "end" || gameState === "win" ) {
    background(gardenImg);
  } else if (gameState === "level2" || gameState === "howToPlayLevel2") {
    background(gardenImg2);}
    else if (gameState === "win2") {
      background (gardenImg3)
  }
  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].body();
    clouds[i].move();
  }

  if (gameState === "win2") {
    clouds.splice(0, clouds.length);
  }

  if (millis() - lastCloudTime > cloudInterval) {
    clouds.push(new Cloud());
    lastCloudTime = millis();
  }


  if (gameState === "start") {
    startScreen();
  } else if (gameState === "game") {
    playGame();
  } else if (gameState === "end") {
    endScreen();
  } else if (gameState === "win") {
    endScreen2();
  } else if (gameState === "howToPlayLevel2") {
    howToPlayLevel2();
  } else if (gameState === "level2") {
    level2();
  } else if (gameState === "win2") {
    endScreen3();
    rainSound.stop();
  }
  else if (gameState === "end2") {
    endScreen4();
  }
}

function startScreen() {

gif.hide()
image (cloudImg3, 50, 10, 400, 220)
  
  text("Welcome to Rain Rush!", width / 2, 260);
  text("Help the gnome catch raindrops to fill the water meter.", width / 2, 290);
  text("Click to embark on your garden adventure!", width / 2, 320);

  character = new Character(width / 2, height - 50);
  character.body();
}

function playGame() {
  character.update(mouseX);
  character.body();
 // gif.show ()
  
push () 
  textAlign (LEFT)
  text('drops: ' + score1, 10, 30);
  text("time: " + timer, 10, 60);
  fill(225);
  rect(130, 10, 200, 20);
  fill(50, 121, 168);
  rect(130, 10, scoreBarWidth, 20);
  scoreBarWidth = score1 * 8
pop () 

if (frameCount % 60 === 0 && timer > 0) {
  timer--;

}
if (timer === 0){
  gameState = "end"
}
else if (scoreBarWidth === 200) {
  gameState = "win";        
}

  // create and move raindrops
  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].body();
    raindrops[i].move();

  // check for collision 
  if (character.collision(raindrops[i])) {
    score1++;
    const collisionX = character.collisionX;
    
    // Set the position of the GIF based on the collisionX value
    gif.position(collisionX, height - 150);
    gif.show();
  
    raindrops.splice(i, 1);
  } else if (raindrops[i].reachedBottom()) {
    raindrops.splice(i, 1);
  }
}

  // new raindrops
  if (frameCount % 20 === 0) {
    raindrops.push(new Raindrop());

}
}

function endScreen() {
gif.hide ()
  text("Rain Rush Adventure Over", width / 2, height / 2 - 20);
  text("Your gnome collected " + score1 + " raindrops.", width / 2, height / 2 + 20);
  text("Click to start a new Rain Rush!", width / 2, height / 2 + 70);
}

function endScreen2() {
gif.hide()
 character2.update(mouseX);
 character2.body();

  text("Congratulations!", width / 2, 200);
  text("You filled the water meter with " + score1 + " raindrops.", width / 2, 230);
  text("Get ready for Level 2 - the Rain Rush intensifies!", width / 2, 260);
  text("Click to proceed to Level 2.", width / 2, height / 2 + 70);
    
}

function endScreen3() {
  character2.update(mouseX);
  character2.body();
  gif.hide ()

  text("Congratulations! Rain Rush Master!", width / 2, height/ 2);
  text("Your gnome collected " + score1 + " raindrops.", width / 2, height / 2 + 20);
  text("Click to play again!", width / 2, height/2 + 70);
}

function endScreen4() {
  gif.hide ()
  text("Rain Rush Adventure Over", width / 2, height / 2 - 20);
  text("Your gnome collected " + score2 + " raindrops.", width / 2, height / 2 + 20);
  text("Click to start a new Rain Rush!", width / 2, height / 2 + 70);


}

function howToPlayLevel2() {

  image(cloudImg2, 0,  0 , 500, 300);

  text("Level 2 - Hailstorm Challenge", width / 2, 100);
  text("Catch raindrops, but beware of hail!", width / 2, 150);
  text("Hailstones will decrease your water meter score.", width / 2, 180);
  text("Keep an eye on the score bar and timer.", width / 2, 210);
  text("Click to start Level 2 and face the hailstorm!", width / 2, height/2 + 20)
}

function restartGame(){
  gameState = "start"
  score1 = 0;
  score2 = 0;
  timer = 25;
  timer2 = 25;
  scoreBarWidth = 0;
  rainSound.play();
  
}

function level2 (){
  character.update(mouseX);
  character.body();
  
push () 
textAlign (LEFT)
  text('drops: ' + score2, 10, 30);
  text("time: " + timer2, 10, 60);
  fill(225);
  rect(130, 10, 200, 20);
  fill(50, 121, 168);
  rect(130, 10, scoreBarWidth, 20);
  scoreBarWidth = score2 * 8
pop () 

if (frameCount % 60 === 0 && timer2 > 0) {
  timer2--;
}
if (timer2 === 0){
  gameState = "end2"
}
else if (scoreBarWidth === 200) {
  gameState = "win2";        
}

  // create and move raindrops
  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].body();
    raindrops[i].move();

  // check for collision 
    if (character.collision(raindrops[i])) {
    score2++;
    const collisionX = character.collisionX;
    
    // Set the position of the GIF based on the collisionX value
    gif.position(collisionX, height - 150);
    gif.show();


  
    raindrops.splice(i, 1);
  } else if (raindrops[i].reachedBottom()) {
    raindrops.splice(i, 1);
  }
}

  // new raindrops
  if (frameCount % 20 === 0) {
    raindrops.push(new Raindrop());
}
  
  
  // create and move haildrops
  for (let i = 0; i < haildrops.length; i++) {
    haildrops[i].body();
    haildrops[i].move();

  // check for collision 
    if (character.collision(haildrops[i])) {
      score2--;
      const collisionX = character.collisionX;
      gif.position(collisionX , 475);
      haildrops.splice(i, 1);
      
    } else if (haildrops[i].reachedBottom()) {
      haildrops.splice(i, 1);
    }
  }
   // new haildrops
   if (frameCount % 40 === 0) {
    haildrops.push(new Hail());
  
}
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "game";
    character = new Character(width / 2, height - 50);
  } else if (gameState === "end" ) {
    restartGame();  
  } else if (gameState === "end2" ) {
      restartGame();
  } else if (gameState === "win") {
    gameState = "howToPlayLevel2";
  } else if (gameState === "howToPlayLevel2") {
    gameState = "level2";
  } else if (gameState === "win2") {
     restartGame();
  } 
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 130;
    this.direction = 1; // 1 represents facing right, -1 represents facing left
    this.collisionX = 0;
    this.collisionY = 0;
  }

  body() {
    push();
    if (this.direction === 1) {
      image(gnomeImg, this.x, this.y - 100, this.width, this.height);
    } else {
      scale(-1, 1); // flip horizontally
      image(gnomeImg, -this.x - 100, this.y - 100, this.width, this.height);
      scale(1, 1); // reset scale
    }
    pop();
  }

  update(targetX) {
    const speed = 0.1;
    this.direction = targetX > this.x ? 1 : -1;
    this.x += (targetX - this.x) * speed;
  }

  collision(raindrop) {
    let d = dist(this.x, this.y - 40, raindrop.position.x, raindrop.position.y);
    if (d < this.width) {
      // Store collision coordinates in instance variables
      this.collisionX = this.x;
      this.collisionY = this.y ;
      console.log("Collision at:", this.collisionX, this.collisionY);
      return true;
    }
    return false;
  }
}

class Character2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 130;
    this.direction = 1; // 1 represents facing right, -1 represents facing left
    this.collisionX = 0;
    this.collisionY = 0;
  }


    body() {
      push();
      if (this.direction === 1) {
        image(gnome2Img, this.x, this.y - 50, this.width, this.height);
      } else {
        scale(-1, 1); // flip horizontally
        image(gnome2Img, -this.x - 100, this.y - 50, this.width, this.height);
        scale(1, 1); // reset scale
      }
      pop();
    }
  
  update(targetX) {
    const speed = 0.1;
    this.direction = targetX > this.x ? 1 : -1;
    this.x += (targetX - this.x) * speed;
  }
}

class Raindrop {
  constructor() {
    this.position = createVector(random(width), 0);
    this.radius = 20;
    this.speed = random(6, 9);
  }

  body() {
    
  push ()
    imageMode(CENTER)
    image(rainImg, this.position.x, this.position.y, 15, 75)  
  pop()
  }
  

  move() {
    this.position.y += this.speed;
  }

  reachedBottom() {
    return this.position.y > height;
  }
}

class Hail {
  constructor() {
    this.position = createVector(random(width), 0);
    this.radius = 20;
    this.speed = random(5, 7);
  }

  body() {
    
  push ()
    imageMode(CENTER)
    image(hailImg, this.position.x, this.position.y, 30, 30)  
  pop()
  }
  

  move() {
    this.position.y += this.speed;
  }

  reachedBottom() {
    return this.position.y > height;
  }
}

class Cloud {
  constructor() {
    this.x = -225;
    this.y = random(-75, 25);
    this.img = random(cloudImg);
    this.speed = 1;
  }

  body() {
    image(this.img, this.x, this.y, 250, 155);
  }

  move() {
    this.x += this.speed;}

}

