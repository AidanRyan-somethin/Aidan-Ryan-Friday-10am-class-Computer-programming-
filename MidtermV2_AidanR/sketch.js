function setup() 
{
  createCanvas(400, 400);
  RectMode (CENTER);
}

let spacing = 5
function draw() 
{
  background (200);
 
  for(let i = 1; i < height; i = i + spacing)
  {
  rect(width/2, height/2, i, i);
  }

  for(let i = 1; i < width; i = i + spacing)
  {
  rect(height/2, width/2, i, i);
  }
}
