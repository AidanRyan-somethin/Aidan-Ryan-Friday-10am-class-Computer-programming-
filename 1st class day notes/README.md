# Aidan-Ryan-Friday-10am-class-Computer-programming-
my repo for Mtech 1201 or something

<!-- 
//this is a Single Line comment
 -->


function setup() 
{
    <!-- //you must include setup function to run
    //only include One setup function per setup -->
create canvas(700,400);
<!-- sets size of canvas with area Width and height -->

function draw() 
    <!-- background(200) // black and white bad -->
    background(205, 127, 0);
    <!--a line from points (500, 50) to (10, 300) -->
    line (500, 50, 10, 300)
    <!-- //line function needs starting point and ending paramiters 
    //line(x1, y1, x2, y2)
    //triangle (x1, y1, x2, y2, x3, y3)-->
    triangle (500, 300, 600, 600, 200, 400)

<!-- //drawing a rectangle: -->
    rect(100, 400, 400, 200);
}