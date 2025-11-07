// Aidan Ryan
// Click and ask a question in order to get an answer back

let snowflakes = [];
let flames;
let showFire = false;
let showSnow = false;

//gamemodes
let gameMode = "Magic8ball";

//space invader variables
let player;
let bullets = [];
let invaders = [];
let invaderDir = 1; //1 will go right, and -1 will go left
let showInstructions = true;

//PacMan variables
let pacman;
let dots = [];
let walls = [];
let pacmanSpeed = 3;


function preload() 
{
  flames = loadImage("Flames.png");
}





function setup() 
{
  createCanvas(800, 800);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(24);
}





const sayings = 
[
  "You can certainly try",
  "I dont know bout that",
  "When hell freezes over",
  "Christmas is coming",
  "Halloween is coming",
  "It's gonna be hot out today",
  "Sorry, i don't feel like answering",
  "Pay $1.99 for 5 more answers",
  "New Ball. Who dis",
  "You ARE the father!",
  "Reply hazy, Look it up on Google",
  "u r bad at da game",
  "SPACE INVADERS",
  "WAKA WAKA",
  "RAVE!!!!!!!!!"
];

let selectedSaying = "";
let lastBackgroundTime = 0;





function draw() 
{
  //setting the game modes and making it so they work
  if (gameMode === "Magic8ball") 
    {
    drawMagic8ball();
    } 
  else if (gameMode === "SpaceInvaders") 
    {
    drawSpaceInvaders();
    }
  else if (gameMode === "WAKA WAKA")
  {
    drawPacMan();
  }
}
   





//put Magic 8 ball into function so i can seperate game modes and what to draw
function drawMagic8ball() 
{
  // Background changes for RAVE
  if (selectedSaying === "RAVE!!!!!!!!!") 
  {
    if (millis() - lastBackgroundTime > 1000) 
    {
      background(random(255), random(255), random(255));
      lastBackgroundTime = millis();
    }
  } 
  else 
  {
    background(170, 170, 170);
  }

  let centerX = width / 2;
  let centerY = height / 2;

  fill(0);
  ellipse(centerX, centerY, 400);

  fill(0, 0, 255);
  triangle(centerX - 120, centerY + 100, centerX, centerY - 130, centerX + 120, centerY + 100);

  fill(150, 111, 51);
  stroke(0);
  rect(centerX, centerY + 200, 800, 100);
  rect(centerX - 350, centerY + 300, 80, 200);
  rect(centerX + 350, centerY + 300, 80, 200);

  if (showSnow) drawSnow();
  if (showFire && flames) {
    image(flames, 0, height - 400, 200, 400);
    image(flames, width - 200, height - 400, 200, 400);
  }

  fill(255);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text(selectedSaying, centerX, centerY + 20, 200);
}

//this should make it so this only runs when drawMagic8Ball is running







//start of game
 function startSpaceInvaders() 
{
player = { x: width /2, y: height -50, size: 40 };
bullets = [];
invaders = [];
invaderDir = 1;

gameWon = false;

//makes the enemy rows
for (let y=50; y <200; y+= 40) { //Outer loop is rows (y position) and inner loop is the columns (x position)
for (let x=100; x <700; x+= 60) { //each invder is an object with x,y, size, and an alive 
  invaders.push({x,y, size: 30, alive: true }); //(a boolean flag used to hide or kill the invader when it)
  }
 }
}

//tracking the game state
let gameWon =false; //if o dont do this game dosent work cus it thinks you won already, 

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
  }

fill(255);
textSize(16);
textAlign(LEFT);
text("Press ESC or B to return", 20, height - 30);
}






function startPacMan() 
{
  gameMode = "WAKA WAKA"
  pacman = {x: 60, y:60, size:20};
  dots = [];
  walls = [];

  //building a maze https://www.youtube.com/watch?v=YBtzzVwrTeE
  walls =
  [
    {x: 0, y: 0, w: width, h: 20},
    {x: 0, y: 0, w: 20, h: height},
    {x: width - 20, y: 0, w: 20, h: height},
    {x: 200, y: 100, w: 400, h:20},
    {x: 200, y: 300, w: 20, h:300},
    {x: 580, y: 300, w:20, h: 300},
  ];

  //dots (goddamn i have no idea what to do for this thing) https://www.youtube.com/watch?v=YBtzzVwrTeE
  for (let x=40; x < width -40; x +=40)
  { 
    for (let y=40; y < height -40; y+=40) 
   {
    //skip dots that are inside walls
    let insideWall = false;
    for (let w of walls) 
    {
      if (x > w.x && x < w.x + w.w && y > w.y && y < w.y + w.h)
      {
        insideWall = true;
        break;
      }
    }
    if (!insideWall) dots.push({ x, y, eaten: false });
   }
  }
}


function drawPacMan() 
{
  background(0);

  // Draw walls
  rectMode(CORNER);
  fill(0, 0, 255);
  noStroke();
  for (let w of walls) rect(w.x, w.y, w.w, w.h);
  rectMode(CENTER);

  // Draw dots
  fill(255, 255, 0);
  for (let d of dots) {
    if (!d.eaten) ellipse(d.x, d.y, 6);
  }

  // Movement
  let nextX = pacman.x;
  let nextY = pacman.y;
  if (keyIsDown(LEFT_ARROW)) nextX -= pacmanSpeed;
  if (keyIsDown(RIGHT_ARROW)) nextX += pacmanSpeed;
  if (keyIsDown(UP_ARROW)) nextY -= pacmanSpeed;
  if (keyIsDown(DOWN_ARROW)) nextY += pacmanSpeed;

  // Collision detection
  let collision = false;
  for (let w of walls) {
    if (
      nextX + pacman.size / 2 > w.x &&
      nextX - pacman.size / 2 < w.x + w.w &&
      nextY + pacman.size / 2 > w.y &&
      nextY - pacman.size / 2 < w.y + w.h
    ) {
      collision = true;
      break;
    }
  }
  if (!collision) 
  {
    pacman.x = nextX;
    pacman.y = nextY;
  }

  // Draw Pac-Man
  fill(255, 255, 0);
  ellipse(pacman.x, pacman.y, pacman.size);

  // Eat dots
  for (let d of dots) 
  {
    if (!d.eaten && dist(pacman.x, pacman.y, d.x, d.y) < 10) 
    {
      d.eaten = true;
    }
  }

  // Win condition
  if (dots.every(d => d.eaten)) 
  {
    fill(255);
    textSize(32);
    text("You win! Click to return...", width / 2, height / 2);
  }

fill(255);
textSize(16);
textAlign(LEFT);
text("Press ESC or B to return", 20, height - 30);
}











//BULLETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
function keyPressed()
{
  // Global back button to exit any game
if (keyCode === ESCAPE || key === 'b' || key === 'B') {
  gameMode = "Magic8ball";
  selectedSaying = "";
  showInstructions = true; // reset Space Invader instructions
  showSnow = false;
  showFire = false;
  return; // stop any other key handling this frame
}


  if (gameMode === "SpaceInvaders" && key === "z") 
    //creates the bullets basically adding a new object to the array 
    {
      bullets.push({ x: player.x, y: player.y -20}); //bullets created have the same horizontal position and vertical postion of the player when created
    }
    //basically storing every bullet active

    if (showInstructions) showInstructions =false;
//turns off the unstructions

//Space leave

}
 





function mousePressed() {
  let randomIndex = randomNumberGenerator(0, sayings.length - 1);
  selectedSaying = sayings[randomIndex];

  // Snow & fire toggles
  if (selectedSaying === "Christmas is coming") {
    showSnow = true;
    showFire = false;
  } else if (selectedSaying === "When hell freezes over") {
    showFire = true;
    showSnow = true;
  } else {
    showFire = false;
    showSnow = false;
  }

  // Space Invaders start
  if (selectedSaying === "SPACE INVADERS") {
    gameMode = "SpaceInvaders";
    startSpaceInvaders();
  }

  // Pac-Man start
  if (selectedSaying === "WAKA WAKA") {
    startPacMan();
  }

  // If Pac-Man is finished, return to Magic 8 Ball
  if (gameMode === "WAKA WAKA" && dots.every(d => d.eaten)) {
    gameMode = "Magic8ball";
    selectedSaying = "";
  }
}







function randomNumberGenerator(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}






// Snowflake behavior
function drawSnow() 
{
  for (let i = 0; i < random(3); i++) 
  {
    snowflakes.push(
    {
      x: random(width),
      y: 0,
      size: random(2, 5),
      speed: random(1, 3),
      drift: random(-0.5, 0.5)
    });
  }
//color of snow
  noStroke();
  fill(255);

  for (let flake of snowflakes) 
  {
    flake.y += flake.speed;
    flake.x += flake.drift;
    ellipse(flake.x, flake.y, flake.size);
  }

  // Remove flakes that fall off-screen
  snowflakes = snowflakes.filter(flake => flake.y < height + 10);
}


//add more stuff