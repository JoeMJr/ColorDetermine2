var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
console.log("I exist?")
//
var relativeX;
var relativeY;

var trackandfield = new synaptic.Architect.Perceptron(24,3,3,3);

var trainingData = [
//Red
{input: [1,1,1,1,1,1,1,1,
		 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0], output: [1,0,0]},
//I'm going to try this but it might break things so I might remove it
/*
// I removed it since it skewed the outputs from being somewhat coherent (not really) to insane 100% and 0%s
//Orange
{input: [1,1,1,1,1,1,1,1,
		 1,0,1,0,0,1,0,1,
         0,0,0,0,0,0,0,0], output: [1,0.647,0]},
*/
//Yellow
{input: [1,1,1,1,1,1,1,1,
		 1,1,1,1,1,1,1,1,
         0,0,0,0,0,0,0,0], output: [1,1,0]}, 
//Green
{input: [0,0,0,0,0,0,0,0,
		 1,1,1,1,1,1,1,1,
         0,0,0,0,0,0,0,0], output: [0,1,0]},
//Cyan
{input: [0,0,0,0,0,0,0,0,
		 1,1,1,1,1,1,1,1,
         1,1,1,1,1,1,1,1], output: [0,1,1]},
//Blue
{input: [0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1], output: [0,0,1]},
 //Magenta
{input: [1,1,1,1,1,1,1,1,
		 0,0,0,0,0,0,0,0,
         1,1,1,1,1,1,1,1], output: [1,0,1]},
// I know this is probably a bad idea but I am curious to see what my past self was afraid of
// I know this is might just funnel everything into either black or white but I wanna see it
//White
{input: [1,1,1,1,1,1,1,1,
		 1,1,1,1,1,1,1,1,
         1,1,1,1,1,1,1,1], output: [1,1,1]},
// Black
{input: [0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0], output: [0,0,0]}

]

var put;

var rec;

var result = [0,0,0];
//Color Array
var clr1;
var bgr1;
var clr2;
var bgr2;
var clr3;
var bgr3;

var bCase = 0;

var aiColor = "#FFFFFF";
//RECTANGLE MATHS
var rbox = {
	x:400,
	y:50,
	width:50,
	heigth:50
};
var rect1 = {
	x:20,
	y:200,
	width:100,
	heigth:50
};
var rect2 = {
	x:140,
	y:200,
	width:100,
	heigth:50
};
var rect3 = {
	x:260,
	y:200,
	width:100,
	heigth:50
};

function isInside(rect){
	if(relativeX > rect.x && relativeX < rect.x+rect.width && relativeY < rect.y+rect.heigth && relativeY > rect.y){
  	return true
  }
  else
  {
  	return false;
  }
}

//INPUTS
document.addEventListener("click", mouseClickHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseClickHandler(e) {
	//BRUH
  //RESET BOX
  if(isInside(rbox) == true){
  	pokemonTrainer.train(trainingData, {
    rate: 0.3,
    iterations: 1000000,
    error: .005,
    shuffle: true
		}); // Train with training data
    bCase = 0;
  	reroll();
  }
  //FIRST RECTANGLE
  if(isInside(rect1) == true){
  	//alert("1");
  	put = convertToBinaryArray(bgr1);
		rec = trackandfield.activate(put);
    //
    reColor(rec);
    //Assigning to result
    result = [((rec[0] * 100).toFixed(2)), ((rec[1] * 100).toFixed(2)), ((rec[2] * 100).toFixed(2))]
    bCase = 1;
  	
  }
  //SECOND RECTANGLE
  if(isInside(rect2) == true){
  	put = convertToBinaryArray(bgr2);
		rec = trackandfield.activate(put);
    reColor(rec);
  	result = [((rec[0] * 100).toFixed(2)), ((rec[1] * 100).toFixed(2)), ((rec[2] * 100).toFixed(2))]
    bCase = 2;
  }
  //THIRD RECTANGLE
  if(isInside(rect3) == true){
  	put = convertToBinaryArray(bgr3);
		rec = trackandfield.activate(put);
    reColor(rec);
    result = [((rec[0] * 100).toFixed(2)), ((rec[1] * 100).toFixed(2)), ((rec[2] * 100).toFixed(2))]
    bCase = 3;
  }
  //endofisinside
}

function mouseMoveHandler(e) {
    relativeX = e.clientX - canvas.offsetLeft;
    relativeY = e.clientY - canvas.offsetTop;
    
}

// MOST OF THE MATHS
function rng(){ 

var x = [(Math.floor(Math.random() * 256)) , (Math.floor(Math.random() * 256)) , (Math.floor(Math.random() * 256))]
return x;

}

//ASSIGNING
bgr1 = rng();
clr1 = 'rgb(' + bgr1 + ')';
bgr2 = rng();
clr2 = 'rgb(' + bgr2 + ')';
bgr3 = rng();
clr3 = 'rgb(' + bgr3 + ')';
//REROLL
function reroll(){
bgr1 = rng();
clr1 = 'rgb(' + bgr1 + ')';
bgr2 = rng();
clr2 = 'rgb(' + bgr2 + ')';
bgr3 = rng();
clr3 = 'rgb(' + bgr3 + ')';
aiColor = "#FFFFFF";
}

//binary array stuf
function convertToBinaryArray(x) {
    // Convert to binary
    var temp1 = x[0].toString(2); 
    
    var temp2 = x[1].toString(2); 
    
    var temp3 = x[2].toString(2); 
    

    // If it less than 8 digits long, add zeroes
    while(temp1.length < 8) { 
        temp1 = "0" + temp1;
    }
    //
    while(temp2.length < 8) { 
        temp2 = "0" + temp2;
    }
    //
    while(temp3.length < 8) { 
        temp3 = "0" + temp3;
    }
    //adding all strings into one string
 		var tempInBinary = temp1 + temp2 + temp3;
    // Convert string to array
    return tempInBinary.split("").map(function(i) {
        return parseInt(i); }
    );
}

//Network training
var pokemonTrainer = new synaptic.Trainer(trackandfield); // Create trainer

pokemonTrainer.train(trainingData, {
    rate: 0.3,
    iterations: 1000000,
    error: .005,
    shuffle: true
}); // Train with training data

//MORE COLOR STUFF
function reColor(x){
	var a = [ (x[0]*255), (x[1]*255), (x[2]*255)];
	
  aiColor = 'rgb(' + a + ')';
}

// DRAWING STUFF FUNCTIONs


function drawPos() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Pos: " + relativeX + ", " + relativeY, 10, 40);
}
function drawE() {
	ctx.beginPath();
	ctx.rect(5, 55, 350, 40);
	ctx.fillStyle = "gray";
	ctx.fill();
	ctx.closePath();
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Red: " + result[0] + "% , Green: " + result[1] + "% , Blue: " + result[2] + "%", 10, 80);
  
}

function drawF(){
	ctx.beginPath();
	ctx.rect(5, 275, 350, 40);
	ctx.fillStyle = "gray";
	ctx.fill();
	ctx.closePath();
  
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFFFFF";
  switch(bCase){
  	case 0:
    	ctx.fillText("", 10, 300);
      break;
    case 1:
    	ctx.fillText("Rect 1: Red: "+Math.round((bgr1[0]/255)*100)+"%, Green: "+Math.round((bgr1[1]/255)*100)+"%, Blue: "+ Math.round((bgr1[2]/255)*100)+"%", 10, 300);
      break;
    case 2:
    	ctx.fillText("Rect 2: Red: "+Math.round((bgr2[0]/255)*100)+"%, Green: "+Math.round((bgr2[1]/255)*100)+"%, Blue: "+ Math.round((bgr2[2]/255)*100)+"%", 10, 300);
      break;
    case 3:
    	ctx.fillText("Rect 3: Red: "+Math.round((bgr3[0]/255)*100)+"%, Green: "+Math.round((bgr3[1]/255)*100)+"%, Blue: "+ Math.round((bgr3[2]/255)*100)+"%", 10, 300);
      break;
  }
  
}

function drawRect1() {
ctx.beginPath();
ctx.rect(rect1.x,rect1.y,rect1.width,rect1.heigth);
ctx.fillStyle = clr1;
ctx.fill();
ctx.closePath();
}

function drawRect2() {
ctx.beginPath();
ctx.rect(rect2.x,rect2.y,rect2.width,rect2.heigth);
ctx.fillStyle = clr2;
ctx.fill();
ctx.closePath();
  
}

function drawRect3() {
ctx.beginPath();
ctx.rect(rect3.x,rect3.y,rect3.width,rect3.heigth);
ctx.fillStyle = clr3;
ctx.fill();
ctx.closePath();
  
}

function drawRBox() {
ctx.beginPath();
ctx.rect(rbox.x, rbox.y, rbox.width, rbox.heigth);
ctx.fillStyle = "gray";
ctx.fill();
ctx.closePath();
  
}

function drawNColor() {
ctx.beginPath();
ctx.rect(rect2.x,125,rect2.width,rect2.heigth);
ctx.fillStyle = aiColor;
ctx.fill();
ctx.closePath();
  
}


function drawShapes() {
  drawRect1();
  drawRect2();
  drawRect3();
  drawNColor();
  drawRBox();
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPos();
  drawE();
  drawF();
  drawShapes();
}

var interval = setInterval(draw, 10);