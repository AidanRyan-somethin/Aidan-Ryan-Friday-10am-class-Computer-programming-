// Aidan Ryan, Magic 8 Ball
// Theme: Magic and different interactions based on choosen saying
// Instructions: Ask the 8 ball something and get a single answer

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  
}

function draw() 
{
  background(170, 170, 170);

  // Center coordinates
  let centerX = width / 2;
  let centerY = height / 2;

  // The 8 ball (ellipse primitive)
  fill(0);
  stroke(255);
  strokeWeight(4);
  ellipse(centerX, centerY, 400);

  // The blue triangle (triangle primitive)
  fill(0, 0, 255);
  noStroke();
  triangle
  (
    centerX - 120, centerY + 100,
    centerX, centerY - 130,
    centerX + 120, centerY + 100
  );

  // Table (rect primitives)
  fill(150, 111, 51);
  stroke(0);
  strokeWeight(2);
  rect(centerX, centerY + 200, 800, 100);
  rect(centerX - 350, centerY + 300, 80, 200);
  rect(centerX + 350, centerY + 300, 80, 200);

  // Text inside triangle
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Im a magic 8 ball :)", centerX, centerY + 20);
}
