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
let invaders = [];
let invaderDir = 1; //1 will go right, and -1 will go left
let showInstructions = true;

let shootSound

// Highscores
let highscore_SpaceInvaders = 0;
let score_SpaceInvaders = 0;


//Start of Code____________________________________________________________________________________________________________________

function preload() 
{
shootSound = loadSound("shoot.wav");
}


function setup() 
{
  createCanvas(1000, 1000);
}


function draw() 
{
  if (gameMode === "Cabinet") 
  {
    rectMode(CENTER);
    DrawArcadeCabinet();
  }

  if (gameMode === "SpaceInvaders") 
  {
    drawSpaceInvaders();
  }
}

function DrawArcadeCabinet() {
  background(0);

  let margin = 100;   // how much empty space on left & right
  let rectWidth = width - margin * 2;
  

  fill(255, 0, 0);   // red rectangle 
  rect(width/2, height/2, rectWidth, height);

  fill(0);
  stroke(15)
 //CABINET STUFF_____________________________________________________________________________________________________________________________________________
  //Cabinet Outline _________________________________________________
  stroke(15);
  strokeWeight(4);
  noFill;

  line(830,730,830,1000) //right bottom line
  line(150,730,150,1000) //left bottom line
  
  line(830,730,150,730);// Control bottom line 

  line(815,680,830,730) //right angled line up
  line(160,680,150,730) //left angled line up

  line(815,680,815,300)// right outward line up
  line(160,680,160,300) //left outward line up


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


 // UPPER PART ______________________________________________________

// angled lines going inward toward the marquee
line(185, 300, 150, 260);   // left inward angle
line(790, 300, 830, 260);   // right inward angle

// top marquee line (wide)
line(150, 260, 830, 260);

line(815,300,830,260) //right top angle
line(160,300,150,260) //left top angle

line (150,260,150,0) //left top
line (830,260,830,0)


//Game Select Screen_______________________________________________________
fill(0);
noStroke();
rectMode(CORNER);

let left = 185 + 10;
let top = 300 + 10;
let right = 790 - 10;
let bottom = 680 - 10;

rect(left, top, right - left, bottom - top);

rectMode(CENTER);

//Text for coin stuff and getting started ________________________________________________
if (!coinInserted) 
{
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(40);
  text("Insert a coin", width/2, 460);

  textSize(20);
  text("(press any key)", width/2, 500);
}

if (coinInserted) 
  {
  fill(50);
  stroke(255);
  strokeWeight(2);

  // positions inside the screen
 let w = 150, h = 250;

  let x2 = 412;      // middle box
  let x1 = x2 - 170; // left box
  let x3 = x2 + 170; // right box

  let y1 = 350, y2 = 350, y3 = 350;


  rectMode(CORNER);

  // Three boxes
  rect(x1, y1, w, h);
  rect(x2, y2, w, h);
  rect(x3, y3, w, h);

// Labels
fill(255);
noStroke();
textAlign(CENTER, CENTER);

textSize(20);
text("Space Invaders", x1 + w/2, y1 + h/2);
text("Game Two",       x2 + w/2, y2 + h/2);
text("Game Three",     x3 + w/2, y3 + h/2);

// High score under Space Invaders box
textSize(16);
text("High Score: " + highscore_SpaceInvaders, x1 + w/2, y1 + h + 20);
  }
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

  gameWon = false;
  score_SpaceInvaders = 0;   // reset score

//makes the enemy rows
for (let y=50; y <200; y+= 40) { //Outer loop is rows (y position) and inner loop is the columns (x position)
for (let x=100; x <700; x+= 60) { //each invder is an object with x,y, size, and an alive 
  invaders.push({x,y, size: 30, alive: true }); //(a boolean flag used to hide or kill the invader when it)
  }
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
  text("Click or press any key to start");
  return; //dosent run the game till text is gone
}


//if you win this happens
if (gameWon) 
{
fill(255);
text("You win! click to return", width / 2, height / 2);
return;
}


  // Move player with arrow keys
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
  // Move invaders
  fill(255, 0, 0);
  let edge = false;
  for (let inv of invaders) 
  {
    if (!inv.alive) continue;
    inv.x += invaderDir * 4; //moves each invader horizontally (1= right, -1 = left)
    if (inv.x > width - 20 || inv.x < 20) edge = true; //the edge detechs if the invader hits the right or left side
    rect(inv.x, inv.y, inv.size, inv.size);
  }

  // Drop invaders when hitting an edge
  if (edge) 
  {
    invaderDir *= -1; //flips the direction when hits edge
    for (let inv of invaders) inv.y += 10; //drops all invaders down (10 pixels down)
  }


 //got the bullet code from https://www.youtube.com/watch?v=biN3v3ef-Y0
  // Bullet collision check
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

  // Lose condition (if the invaders reach the player)
  for (let inv of invaders) 
  {
    if (inv.alive && inv.y > player.y - 30) 
    {
      gameMode = "Magic8ball";
      selectedSaying = "u r bad at da game";
      return;
    }
  }

  // Win condition (once every invader dead then win)
  if (invaders.every(inv => !inv.alive)) 
{
  gameWon = true;

  if (score_SpaceInvaders > highscore_SpaceInvaders) 
  {
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

// Return button______________________________________________
fill(50);
stroke(255);
rectMode(CENTER);
rect(width - 100, 50, 150, 40);

fill(255);
noStroke();
textSize(18);
text("Return", width - 100, 50);

}







  if (gameMode === "SpaceInvaders" && key === "z") 
    //creates the bullets basically adding a new object to the array 
    {
      bullets.push({ x: player.x, y: player.y -20}); //bullets created have the same horizontal position and vertical postion of the player when created
    }
    //basically storing every bullet active

    if (showInstructions) showInstructions =false;
//turns off the unstructions

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

    let w = 150, h = 250;

    let x2 = 412;
    let x1 = x2 - 170;
    let x3 = x2 + 170;
    let y1 = 350;

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
    return;
  }
}

}



function keyPressed() {
  if (!coinInserted) {
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
    }
  }
}
