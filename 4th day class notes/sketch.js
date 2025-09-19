let r=255;
let g=255;
let b=255;

function setup() {
  createCanvas(600, 600);
  rectMode (CENTER);
}

function draw() 
{
  background(r,g,b);
 if (mouseX > width / 2)
 {
  fill(255,0,0);
  ellipse(width/2, height/2, 100, 100);
  print("TEST 1 is TRUE");
 }
 else if (mouseY > height / 2)
 {
  fill(0);
  rect(width /2, height/2);
 }
 else if (mouseY > height /2)
 {
  fill(0);
  rect(width/2, height/2, 100, 100);
  print("TEST 2 is True");
 }
 else 
 {
  fill(255);
  rect(width/2, height/2, 100, 100);
  print("TEST1 and TEST 2 are Both FALSE")
 }
}

function mousePressed () {

}