// Aidan Ryan, Magic 8 Ball
// Theme: Magic and fun interactions
// Instructions: Click the 8 ball to get a random answer, watch the Among Us character react

function randomNumberGenerator(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sayings = 
[
  "You can certainly try",
  "I dont know bout that",
  "When hell freezes over",
  "Meh",
  "Sorry, i don't feel like answering",
  "Pay $1.99 for 5 more answers",
  "New Ball. Who dis",
  "You ARE the father!",
  "Reply hazy, Look it up on Google",
  "RAVE!!!!!!!!!",
  "Sus"
];

let selectedSaying = "";
let amongUsImages = [];
let currentAmongUsIndex = 0;  
let lastImageTime = 0; //amongus image timer
let lastBackgroundTime = 0; //background image timer

function preload() 
{
  amongUsImages.push(loadImage("images/2rcjpn4o1sn51.webp")); // black
  amongUsImages.push(loadImage("images/4eof2l4o1sn51.webp")); // grey
  amongUsImages.push(loadImage("images/xyqo6hx42sn51.webp")); // white
  amongUsImages.push(loadImage("images/f7f4fmpi2sn51.webp")); // light brown
  amongUsImages.push(loadImage("images/ppawzo4o1sn51.webp")); // pink
  amongUsImages.push(loadImage("images/9kvk25sh2sn51.webp")); // purple
  amongUsImages.push(loadImage("images/ph2jho4o1sn51.webp")); // blue
  amongUsImages.push(loadImage("images/0j244l4o1sn51.webp")); // cyan
  amongUsImages.push(loadImage("images/vf3ojm4o1sn51.webp")); // green
  amongUsImages.push(loadImage("images/76glbq4o1sn51.webp")); // lime
  amongUsImages.push(loadImage("images/xprpkp063sn51.webp")); // yellow
  amongUsImages.push(loadImage("images/iio3xm4o1sn51.webp")); // orange
  amongUsImages.push(loadImage("images/an871k4o1sn51.webp")); // red
}

function setup() 
{
  createCanvas(800, 800);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function drawAmongUs() 
{
  let centerX = width / 2 - 350; // left of center
  let centerY = height / 2 + 15; // above center
  let xOffset = 0;
  let yOffset = 0;
  let scaleSize = 1;

  if (selectedSaying === "RAVE!!!!!!!!!") 
    {
    // switch images rapidly 
    if (millis() - lastImageTime > 100) 
    {
      currentAmongUsIndex = (currentAmongUsIndex + 1) % amongUsImages.length;
      lastImageTime = millis();
    }
    xOffset = sin(frameCount * 0.3) * 50; // go side to side rapidly
    } 
  else if (selectedSaying === "Sus") 
  {
    // always use red image
    currentAmongUsIndex = amongUsImages.length - 1; // red is last in array
    yOffset = sin(frameCount * 0.1) * 20; // bounce up/down
  } 
  else if (selectedSaying === "Pay $1.99 for 5 more answers") 
{
    scaleSize = 1.5; // grow
}

  push();
  translate(centerX + xOffset, centerY + yOffset);
  scale(scaleSize);
  image(amongUsImages[currentAmongUsIndex], 0, 0, 100, 150);
  pop();
}

function draw() {
  // background changes for RAVE
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

  // Draw Among Us character
  drawAmongUs();

  let centerX = width / 2;
  let centerY = height / 2;

  // 8-ball
  fill(0);
  ellipse(centerX, centerY, 400);

  // triangle
  fill(0, 0, 255);
  triangle(centerX - 120, centerY + 100, centerX, centerY - 130, centerX + 120, centerY + 100);

  // table
  fill(150, 111, 51);
  stroke(0);
  rect(centerX, centerY + 200, 800, 100);
  rect(centerX - 350, centerY + 300, 80, 200);
  rect(centerX + 350, centerY + 300, 80, 200);

  // text
  fill(255);
  text(selectedSaying, centerX, centerY);
}

function mousePressed() {
  let randomIndex = randomNumberGenerator(0, sayings.length - 1);
  selectedSaying = sayings[randomIndex];
}