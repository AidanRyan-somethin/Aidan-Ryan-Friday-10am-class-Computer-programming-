
//Aidan Ryan

//tbh, this stuff is hard
//variables for the growing circle/ellipse
let q= 400;
let w= 300;
let e= 50;
let r= 50;
//plan to make a circle that increases in the center every mouseclick

function setup() {
createCanvas (800,600);
}

//btw its not working and being annoying
function draw() {
  background (127,127,127);
  fill (150,200,50);
  ellipse (q,w,e,r);
  rectMode(Center);
}

//idk why my live isnt working, but give me a sec im totally super good at coding

//old code

//function keyPressed() {
//  console.log("Key pressed:", key);
//  e += 100;
//  r += 100; }

//searched it up and im trying this console log thing to check if it is fireing

//ok saw something cool in the thin so imma try to do an if command
//grow when thing is pressed or something (hopefully)
if (keyIsPressed) {
  e +=2;
  r +=2;
}
//to be honest, i have no clue if this stuff works, and am trying to figure this out to this very moment, cus my computers "go live" thing isnt working that well and not doing what i want it to do