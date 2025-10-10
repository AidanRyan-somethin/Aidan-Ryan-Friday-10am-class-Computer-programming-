// Aidan Ryan
// Click and ask a question in order to get an answer back

let snowflakes = [];
let flames;
let showFire = false;
let showSnow = false;

function preload() 
{
  // Make sure the file "Flames.png" is in the same folder as this sketch!
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
  "RAVE!!!!!!!!!"
];

let selectedSaying = "";
let lastBackgroundTime = 0;

function draw() 
{
  // Background changes for RAVE mode
  if (selectedSaying === "RAVE!!!!!!!!!") 
  {
    if (millis() - lastBackgroundTime > 1000) {
      background(random(255), random(255), random(255));
      lastBackgroundTime = millis();
    }
  } 
  else 
  {
    background(170, 170, 170);
  }

  // Center coordinates
  let centerX = width / 2;
  let centerY = height / 2;

  // The 8 ball
  fill(0);
  ellipse(centerX, centerY, 400);

  // The blue triangle 
  fill(0, 0, 255);
  triangle(
    centerX - 120, centerY + 100,
    centerX, centerY - 130,
    centerX + 120, centerY + 100
  );

  // The table
  fill(150, 111, 51);
  stroke(0);
  rect(centerX, centerY + 200, 800, 100);
  rect(centerX - 350, centerY + 300, 80, 200);
  rect(centerX + 350, centerY + 300, 80, 200);

  // Draw snow if active
  if (showSnow) 
  {
    drawSnow();
  }

  // Draw fire if active
  if (showFire && flames) 
  {
    image(flames, 0, height - 400, 200, 400);          // left side
    image(flames, width - 200, height - 400, 200, 400); // right side
  }

  // Draw the selected text inside the triangle
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text(selectedSaying, centerX, centerY + 20, 200);
}

function mousePressed() 
{
  let randomIndex = randomNumberGenerator(0, sayings.length - 1);
  selectedSaying = sayings[randomIndex];

  // Control snow/fire states
  if (selectedSaying === "Christmas is coming") 
  {
    showSnow = true;
    showFire = false;
  } 
  else if (selectedSaying === "When hell freezes over") 
  {
    showFire = true;
    showSnow = true;
  } 
  else 
  {
    showFire = false;
    showSnow = false;
  }
}

function randomNumberGenerator(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//https://www.youtube.com/watch?v=JG7B4W9HeOw&t=60s this is the where i got most of the info on snowflake stuff
// Snowflake behavior
function drawSnow() 
{
  // create a random number between 1 and 3, and use i to keep track of where we are
  //also i++ is for whenever the loop repeats, it adds one
  // 
  for (let i = 0; i < random(3); i++) 
  {
    //basically gives the snowflake, width, starts at the top, and gives it a random size, speed, and drift within the numbers
    snowflakes.push(
    {
      x: random(width),
      y: 0,
      size: random(2, 5),
      speed: random(1, 3),
      drift: random(-0.5, 0.5)
    });
  }

  // Draw and move all snowflakes
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
 //.filter basically makes an array, only this stuff may be in it, not any of this stuff
 //whenever the snowlakes rach the bottom, it gets rid of them. 
 //if a snowflake falls past 810, then it goes bye bye and fails the test
}
//add more stuff