function setup() 
{
  createCanvas(400, 400);
  RectMode (CENTER);
}

let spacing = 5
function draw() 
{
  background (200);
 
  for(let i= width; i >= 0; i -=50)
  {
    rect(width/2, height/2, i, i):
  }
}