//Aidan Ryan
//Arcade cabinet Final
//_________________________________________________________________________
//Variables:

//Cabinet Variables_____________
let coinInserted = false;
let gameMode = "Cabinet";

//Space invaders variables_____________________
let player;
let bullets = [];
let showInstructions = true;
let level = 1;
let shields = [];

let invaderSpeed = 1;   // base speed of invaders
let enemyBullets = [];
let invaders = [];
let invaderDir = 1; //1 will go right, and -1 will go left

//music
let shootSound
let bgMusicSP

// Highscores
let highscore_SpaceInvaders = 0;
let score_SpaceInvaders = 0;

//live system
let lives = 3
let InvincibleTimer = 0

// images
let spaceInvadersTitleImg;
let spaceInvadersPressImg;



//Start of Code____________________________________________________________________________________________________________________

function preload() 
{
  shootSound = loadSound("shoot.wav");
  bgMusicSP = loadSound("Space Invaders Background Music.mp3");

  spaceInvadersTitleImg = loadImage("Space Invaders Logo.png");
  spaceInvadersPressImg = loadImage("Space invaders start logo.png");
}



function setup() 
{
  createCanvas(1000, 1000);
}


function draw() 
{
  if (gameMode === "Cabinet") 
  {
    background(5,5,5);

    rectMode(CENTER);
    drawBackWall();
    drawBarCounter();

   
    DrawArcadeCabinet();
    
    drawDingyLights();
  }

  if (gameMode === "SpaceInvaders") 
  {
    drawSpaceInvaders();
  }

  if (gameMode === "LoseScreen") 
  {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("GAME OVER", width / 2, height / 2 - 40);

  textSize(20);
  text("Score: " + score_SpaceInvaders, width / 2, height / 2);
  text("Click to return to cabinet", width / 2, height / 2 + 40);
}
}





















function DrawArcadeCabinet() 
{

  let margin = 100;   // how much empty space on left & right
  let rectWidth = width - margin * 2;
  



  fill(0);
  stroke(15)
 //CABINET STUFF_____________________________________________________________________________________________________________________________________________
  //Cabinet Outline _________________________________________________
  stroke(15);
  strokeWeight(4);
  noFill();

  fill(40, 40, 60); 
 beginShape(); //Bottom Box
vertex(150, 730);
vertex(150, 1000);
vertex(830, 1000);
vertex(830, 730);
endShape(CLOSE);
  
  line(830,730,150,730);// Control bottom line 

  line(815,680,830,730) //right angled line up


  line(815,680,815,300)// right outward line up
  line(160,680,160,300) //left outward line up

fill(40, 40, 60); 
beginShape(); //right side angle
vertex(830, 730);  
vertex(790, 680);  
vertex(790, 300);  
vertex(815, 300);  
vertex(815,680)
endShape(CLOSE);



beginShape(); //left side angle
vertex(150, 730);  
vertex(185, 680);  
vertex(185, 300);  
vertex(160, 300); 
vertex(160,680);
vertex(150,730);

endShape(CLOSE);


// Inner section_____________________________________________________

 //bottom angled lines
  line(830,730,790,680); //right 
  line(150,730,185,680); //left

  //bottom inner line
  line(185,680,790,680) 

  // left vertical up from 185,680
  line(185, 680, 185, 300);

  // right vertical up from 790,680
  line(790, 680, 790, 300);

 // top inner line
 line(790,300,185,300)

fill(180, 40, 40);
beginShape(); // Top inner angled panel
vertex(185, 300); 
vertex(150, 260);  
vertex(830, 260); 
vertex(790, 300);  
endShape(CLOSE);

//Buttons___________________________________________________________________________________________________________
noStroke();
fill(200,40,40);
ellipse(600,705,20,10);

fill(40,40,200);
ellipse(640,705,20,10);

noStroke();
fill(200,40,40);
ellipse(400,705,20,10);

fill(40,40,200);
ellipse(360,705,20,10);



 // UPPER PART ______________________________________________________

// angled lines going inward toward the marquee
fill(30, 30, 45);
beginShape(); //Top Marguee Rectangle
vertex(150, 260);
vertex(830, 260);
vertex(830, 130);
vertex(150, 130);
endShape(CLOSE);

// SPACE INVADERS MARQUEE LOGO
if (spaceInvadersTitleImg) 
{
  imageMode(CENTER);
  image(
    spaceInvadersTitleImg,
    width / 2,
    195,          // vertical center of marquee
    520,          // width
    110           // height
  );
}


beginShape(); //Top left angled Connector
vertex(185, 300);
vertex(150, 260);
vertex(160, 300);
endShape(CLOSE);


beginShape(); //Top right angled Connector
vertex(790, 300);
vertex(830, 260);
vertex(815, 300);
endShape(CLOSE);







//Game Select Screen_______________________________________________________
fill(0);
noStroke();
rectMode(CORNER);

let left = 185 + 10;
let top = 300 + 10;
let right = 790 - 10;
let bottom = 680 - 10;

rect(left, top, right - left, bottom - top);

// Screen outline (dark red)
noFill();
stroke(120, 0, 0);   // dark red
strokeWeight(16);
rect(left, top, right - left, bottom - top);


rectMode(CENTER);

//Text for coin stuff and getting started ________________________________________________
if (!coinInserted) 
{
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(40);
  strokeWeight(5);
  text("Insert a coin", width/2, 460);

  textSize(20);
  text("(press any key)", width/2, 500);
}

if (coinInserted) 
  {
  fill(50);
  stroke(255);
  strokeWeight(2);

// SINGLE GAME SELECT BOX (Space Invaders)
let w = 200, h = 260;
let x1 = width / 2 - w / 2;
let y1 = 340;

rectMode(CORNER);
fill(30);
stroke(255);
strokeWeight(2);
rect(x1, y1, w, h);

// PRESS START IMAGE
if (spaceInvadersPressImg) 
{
  imageMode(CENTER);
  image
  (
    spaceInvadersPressImg,
    width / 2,
    y1 + h / 2,
    170,
    170
  );
}

if (frameCount % 60 < 30) 
{
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text("CLICK TO PLAY", width / 2, y1 + h - 25);
}


// High score under Space Invaders box
textSize(16);
text("High Score: " + highscore_SpaceInvaders, x1 + w/2, y1 + h + 20);

}
}



















//Background Functions______________________________________________________________________________________________________________
  function drawBackWall() 
  {
    fill(84,84,84);
   beginShape(); //first background
   vertex(850,0);
   vertex(850,1000);
   vertex(0,1000);
   vertex(0,0);
   endShape(CLOSE);

  fill(20,20,20);
   beginShape(); //bottom pattern
   vertex(850,750);
   vertex(850,1000);
   vertex(0,1000);
   vertex(0,750);
   endShape(CLOSE);


     // Checkerboard floor pattern (i didnt know how to do this, this youtube saved me)https://www.youtube.com/watch?v=fngnZch9l5M
  let tileSize = 50;  //chooses how big the tile is
  for (let y = 750; y < 1000; y += tileSize) 
  { //the loop for the vertical parts of the tiles
    for (let x = 0; x < 850; x += tileSize) 
    { //the loop for the horizontal parts of the tiles

      // alternating color
      if ((floor(x/tileSize) + floor(y/tileSize)) % 2 === 0)  //floorx and floory/tilesize tells the code which column/ row there in)
      //creates two numbers, adds them together. even numbers= one color, Odd numbers =the other color)  
      {
        fill(0);         // black
      } else 
        {
        fill(200);       // white
      }

      rectMode(CORNER);
      rect(x, y, tileSize, tileSize); //this draws the tyle once color is picked
    }
  }

}

//____________________________________________________________________________________________________________________________________
function drawBarCounter() 
{
  fill(102, 66, 40);  // floor
  beginShape();
vertex(850,530);
vertex(1000,530);
vertex(1000,1000);
vertex(850,1000)
endShape(CLOSE);

noStroke();
  fill(0, 0, 0, 180); // black with alpha; increase alpha to make it darker
  beginShape();
  vertex(850,530);
  vertex(1000,530);
  vertex(1000,1000);
  vertex(850,1000);
  endShape(CLOSE);


  noStroke();
  fill(255, 255, 255, 20); //shading lighter
  beginShape();
  vertex(850,1000);
  vertex(1000,915);
  vertex(1000,1000);
  vertex(850,1000);
  endShape(CLOSE);


fill(25,25,25); //back wall
beginShape();
vertex(875,530);
vertex(975,530);
vertex(975,140);
vertex(850,140);
vertex(850,300);
vertex(875,300);
endShape(CLOSE); 

fill(35,35,35) //side wall
beginShape();
vertex(1000,50);
vertex(1000,545);
vertex(975,530);
vertex(975,140);
endShape(CLOSE);

fill(15,15,15)
beginShape(); //ceiling
vertex(850,140);
vertex(850,0);
vertex(1000,0);
vertex(1000,50);
vertex(975,140);
endShape(CLOSE);

}

//_________________________________________________________________________________________________________________________________
function drawDingyLights() 
{
noStroke();
fill(255,220,150,60);
beginShape();
vertex(460,0);
vertex(780,1000);
vertex(0,1000);
vertex(0,0)
endShape(CLOSE);
}




































//Space Invaders Code______________________________________________________________________________________________________________________________
//{=======================================================================================================================================}
//start of Space invaders__________________________________________
function startSpaceInvaders() 
{
  player = { x: width /2, y: height -50, size: 40 };
  bullets = [];
  invaders = [];
  invaderDir = 1;

 lives = 3;
 InvincibleTimer = 0;
 enemyBullets = [];


  gameWon = false;
  score_SpaceInvaders = 0;   // reset score







//makes the enemy rows_____________________________________________________________________________________________
for (let y=50; y <200; y+= 40) { //Outer loop is rows (y position) and inner loop is the columns (x position)
for (let x=100; x <700; x+= 60) { //each invder is an object with x,y, size, and an alive 
  invaders.push({x,y, size: 30, alive: true }); //(a boolean flag used to hide or kill the invader when it)
  }
 }


//Background Music________________________________________________________________
if (bgMusicSP && !bgMusicSP.isPlaying()) {
  bgMusicSP.setLoop(true);   // keeps playing forever
  bgMusicSP.setVolume(0.3);  
  bgMusicSP.play();
}





//Creates the sheilds__________________________________________________________________________________________________________
shields = [];

let shieldY = height - 200;
let tileSize = 12;

// shield positions
let bases = [200, 400, 600, 800]; //create 4 sheilds sheilds at these points

for (let base of bases) {
  let shield = [];
  for (let y = 0; y < 4; y++) //each sheild has 4 rows
    {   
  for (let x = 0; x < 6; x++) //each sheild has 6 columns
    {  
      shield.push(
      {
        x: base + x * tileSize,
        y: shieldY + y * tileSize,
        alive: true //When it gets hit, it flips tile.alive = false, which makes it stop drawing.
      });
    }
  }
  shields.push(shield); //pushes sheild into array
}
}













//tracking the game state
let gameWon =false; //if o dont do this game dosent work cus it thinks you won already, 



//Draw Space Invaders____________________________________________________________________
function drawSpaceInvaders() 
{
  background(0);
 
if (showInstructions)
{
  fill (255);
  textSize(28);
  text("Use LEFT/RIGHT arrows to move, Z to shoot", width/2, height/2 -20);
  text("Click or press any key to start", width/2, height/2 + 20);
  return; //dosent run the game till text is gone
}












//if you win this happens
if (gameWon) 
{
fill(255);
text("You win! click to return", width / 2, height / 2);
return;







}


  // Move player with arrow keys_______________________________________________________________
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  player.x = constrain(player.x, 0, width);








  // Draw player
  fill(0, 255, 0);
  rect(player.x, player.y, player.size, 10);







  // Move and draw bullets
  fill(255);
  for (let b of bullets) 
  {
    rect(b.x, b.y, 5, 10); //Draws the little white rechtangle of the bullet
    b.y -= 7; //this moves it upward by 7 pixels each frame
  }
  
  bullets = bullets.filter(b => b.y > 0); // keep only on-screen bullets 
  //also it removes any bullet whose y position has gone above the top screen
















 //got the edge stuff and inv (learned it meant any) from https://www.youtube.com/watch?v=s6LrpUTQQn0
  // Move invaders_____________________________________________________________________________________________________
  fill(255, 0, 0);
  let edge = false;
  for (let inv of invaders) 
  {
    if (!inv.alive) continue;
    inv.x += invaderDir * (2 + invaderSpeed); //had to add variable speed to this
    if (inv.x > width - 20 || inv.x < 20) edge = true; //the edge detechs if the invader hits the right or left side
    rect(inv.x, inv.y, inv.size, inv.size);
  }

  // Drop invaders when hitting an edge
  if (edge) 
  {
    invaderDir *= -1; //flips the direction when hits edge
    for (let inv of invaders) inv.y += 10; //drops all invaders down (10 pixels down)
  }











//invader Bullets_________________________________________________________________________________________________

if (frameCount % 30 === 0) 
  {   // every 30 frames one might shoot
  let shooters = invaders.filter(i => i.alive);
  if (shooters.length > 0) {
    let shooter = random(shooters);
    enemyBullets.push({ x: shooter.x, y: shooter.y + 20 });
  }
}
//every half secondish it choses an alive invader, and pushes a bullet from the shooter location 


// Move & draw enemy bullets
fill(255, 50, 50);
for (let eb of enemyBullets) 
{
  rect(eb.x, eb.y, 5, 10);
  eb.y += 5; //bullet moves downward
}

// Remove off-screen bullets
enemyBullets = enemyBullets.filter(b => b.y < height); //removes the bullet

fill(0, 200, 255);
for (let shield of shields)  //drawn here
  {
  for (let tile of shield) 
    {
    if (tile.alive) rect(tile.x, tile.y, 12, 12); //if its alive it draws
  }
}


// Player bullets hit shields (punishment)
for (let b of bullets) {
  for (let shield of shields) {
    for (let tile of shield) {
      if 
      (
      tile.alive &&
     b.x < tile.x + 12 &&
     b.x + 5 > tile.x &&
     b.y < tile.y + 12 &&
    b.y + 10 > tile.y
     )
     {
        tile.alive = false;   // destroy shield tile
        b.y = -10;            // remove bullet
      }
    }
  }
}





// Player hit by enemy bullet____________________________________________________________
for (let eb of enemyBullets) {
  if (
    InvincibleTimer <= 0 &&
    eb.x > player.x - player.size / 2 &&
    eb.x < player.x + player.size / 2 &&
    eb.y > player.y - 5 &&
    eb.y < player.y + 5
  ) 
  {
    lives--;
    InvincibleTimer = 60; // 1 second of invincibility
    eb.y = height + 10;   // removes the bullet bullet
  }
}


if (InvincibleTimer > 0) InvincibleTimer--;








 //got the bullet code from https://www.youtube.com/watch?v=biN3v3ef-Y0
  // Bullet collision check____________________________________
  for (let b of bullets) 
  {
    for (let inv of invaders) 
    {
      if //basically this checks "is the bullet inside the box" 
      (
        inv.alive &&
        b.x > inv.x - inv.size / 2 &&
        b.x < inv.x + inv.size / 2 &&
        b.y > inv.y - inv.size / 2 &&
        b.y < inv.y + inv.size / 2
      ) 
      {
        inv.alive = false; //destorys the invader if the test comes back true and stops drawing them
        b.y = -10; // mark bullet for removal, then marks the bullet that killd the invader for deletion next frame

       //adds points whenever spave invader dies
        score_SpaceInvaders += 20;

      }
    }
  }


//Lives check and sending to the end/ lose screen
if (lives <= 0) 
{
  // update high score__
  if (score_SpaceInvaders > highscore_SpaceInvaders) 
  {
    highscore_SpaceInvaders = score_SpaceInvaders;
  }

  gameMode = "LoseScreen";
  if (bgMusicSP) bgMusicSP.stop();
  return;
}









for (let eb of enemyBullets) {
  for (let shield of shields) { 
    for (let tile of shield) {
      if 
      (
      tile.alive &&
      eb.x < tile.x + 12 &&
      eb.x + 5 > tile.x &&
      eb.y < tile.y + 12 &&
      eb.y + 10 > tile.y
      ) 
      {
        tile.alive = false;
        eb.y = height + 10; // remove bullet
      }
    }
  }
}











let allGone = shields.every(shield =>
  shield.every(tile => !tile.alive)
);

if (allGone) {
  // update highscore
if (score_SpaceInvaders > highscore_SpaceInvaders) {
  highscore_SpaceInvaders = score_SpaceInvaders;
}

gameMode = "Cabinet";
coinInserted = true;  // keep selection visible
if (bgMusicSP) bgMusicSP.stop();

return;












}









  // Lose condition (if the invaders reach the player)_____________________________________________________________________
  for (let inv of invaders) 
  {
    if (inv.alive && inv.y > player.y - 30) 
    {
      gameMode = "Cabinet"
      if (bgMusicSP) bgMusicSP.stop();

      return;
    }
  }

  // Win condition (once every invader dead then next level)
 if (invaders.every(inv => !inv.alive)) 
  {
  nextWave(); 
  
    // update highscore
  if (score_SpaceInvaders > highscore_SpaceInvaders) {
    highscore_SpaceInvaders = score_SpaceInvaders;
  }
}










fill(255);
textSize(16);
textAlign(LEFT);
text("Press ESC or B to return", 20, height - 30);

//Highscore in teh game of space invaders (visible)______________________________________
fill(255);
textSize(20);
textAlign(LEFT);
text("Score: " + score_SpaceInvaders, 20, 30);
text("High Score: " + highscore_SpaceInvaders, 20, 55);

// Lives display_______________________________________________
for (let i = 0; i < lives; i++) 
{
  fill(255, 0, 0);
  rect(20 + i * 25, 110, 20, 15); // simple life boxes
}



// Return button______________________________________________
fill(50);
stroke(255);
rectMode(CENTER);
rect(width - 100, 50, 150, 40);

fill(255);
noStroke();
textSize(18);
text("Return", width - 100, 50);




//level display_____________________________
text("Level: " + level, 20, 80);
}












//Level spawns new wave with increased speed
function nextWave() 
{
  level++;
  invaderSpeed += 0.5;   // each wave gets faster

  invaders = [];

  let startX = 100;
  let endX = 700;
  let spacing = 60;

  for (let y = 50; y < 200; y += 40) { //whenever it starts the nextwave function it spawns a new grid of invaders  and resets the alive flag
    for (let x = startX; x < endX; x += spacing) {
      invaders.push({ x, y, size: 30, alive: true });
    }
  }
}









//{========================================================================================================================================}
//Space invaders code end


function mousePressed() 
{
  // Return from win screen
  if (gameMode === "SpaceInvaders" && gameWon) 
  {
  gameMode = "Cabinet";
  gameWon = false;
  coinInserted = true; // keeps the game select visible
  return;
  }
//cabinet mod slection
  if (gameMode === "Cabinet" && coinInserted) 
  {

  

let w = 200, h = 260;
let x1 = width / 2 - w / 2;
let y1 = 340;


    // Space Invaders box is the LEFT one
    if (mouseX > x1 && mouseX < x1 + w && mouseY > y1 && mouseY < y1 + h) 
    {
      startSpaceInvaders();
      gameMode = "SpaceInvaders";
      showInstructions = true;
    }
  }

// Return button in Space Invaders
if (gameMode === "SpaceInvaders") 
{
  if (mouseX > width - 175 && mouseX < width - 25 && mouseY > 30 && mouseY < 70) 
    {
    gameMode = "Cabinet";
    if (bgMusicSP) bgMusicSP.stop();
    return;
  }
}


if (gameMode === "LoseScreen") 
{
  gameMode = "Cabinet";
  coinInserted = true;
  return;
}

if (gameMode === "SpaceInvaders" && showInstructions) {
  showInstructions = false;
  return;
}




}



function keyPressed() 
{
  if (!coinInserted) 
  {
    coinInserted = true;
    return;
  }

  if (gameMode === "SpaceInvaders") {

    if (showInstructions) {
      showInstructions = false;
      return;
    }

    if (key === "z") 
    {
  bullets.push({ x: player.x, y: player.y - 20 });

  if (shootSound) shootSound.play();
    }


    if (key === "Escape" || key === "b") {
      gameMode = "Cabinet";
      if (bgMusicSP) bgMusicSP.stop();
    }
  }
}
