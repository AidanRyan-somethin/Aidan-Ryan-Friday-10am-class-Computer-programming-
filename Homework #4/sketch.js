//Aidan ryan, Magic 8 ball, just ask a question then get your answer by clicking the magic 8 ball,  im trying to explore magic stuff
function randomNumberGenerator(min, max) 
{
return Math.floor(Math.random() * (max - min + 1)) +min;
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
"RAVE!!!!!!!!!"

];
// i left these guys behind the function so i can figure out how this works
//turns out it works like this, im the goat

//selected saying for the random generator thomg
let selectedSaying = "";

function setup() 
{
  createCanvas(800, 800);
  rectMode(CENTER);
  //figuring out text took me a good 30 mins :)
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() 
{
  // check if the ball said rave
  if (selectedSaying === "RAVE!!!!!!!!!") 
{
  //at first this was a straight up epllispe machine, had to search up how to make it not one
  if (frameCount % 10 === 0) 
  {
  background(random(255), random(255), random(255));
  }
  
}

 else 
  {
  background(200, 200, 200);
  }

  // Center location stuff
  let centerX = width / 2;
  let centerY = height / 2;
  
  // da ellipse
  fill(0);
  ellipse(centerX, centerY, 400);

  // traingle be like,
  fill(0, 0, 255);
  triangle(
    centerX - 120, centerY + 100,   // left point
    centerX, centerY - 130,        // top point
    centerX + 120, centerY + 100    // right point
  );

  //table stuuf (this is the base)
 fill(150, 111, 51);
 stroke(0); // black outline
 rect(centerX, centerY + 200, 800, 100); // (x, y, w, h)

 //left leg
 rect(centerX - 350, centerY + 300, 80, 200);
 //right leg
 rect(centerX + 350, centerY + 300, 80, 200);

 //curtains
 //fill
 //ellipse
 //ellipse

  fill (255);
  text(selectedSaying, centerX, centerY);
}

function mousePressed() 
{
let randomIndex = randomNumberGenerator(0, sayings.length - 1);
selectedSaying = sayings[randomIndex];
}

//function mousePressed(0 {
//const randomIndex = randomNumberGenerator(0,4);
//turn sayings[randomIndex];}

// i want to add curtains, make them wavy, and maybe a dude in the background that reacts to the things that happen
