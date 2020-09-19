// declare viriables
let bg;
let painting;
let particleCount = 0;
let start = false;
let button;
let size = 10;
let paintings = ["painting1.jpg", "painting2.jpg", "painting3.jpg", "painting4.jpg", "painting5.jpg"];
let paintingCount = 0;
let isTranslate = false;
let music;


// preload files
function preload() {
	// background
	bg = loadImage('background.jpg');
	// get painting from paintings array;
	painting = loadImage(paintings[paintingCount]);
	paintingCount++;
	// frame
	frame = loadImage('frame.png');
	// music
	music = loadSound('music.mov');
}


function setup() {
	// create canvas
	c = createCanvas(1300, 800);
	frameRate(60);
	// display background and frame
	background(bg);
	// setup button
	button = createButton('Save the Artwork');
	button.position(1090, 387);
	button.size(60,30);
	button.style('background-color', '#262626');
	button.style('color', '#FFFFFF');
	button.style('font-family', 'Georgia');
	button.style('font-size', '8px');
	button.style('font-weight','bold');
	button.mousePressed(download);
	button.hide(); // hide until paintings complete
	image(frame, 55, -65);
	// create slider for particle size
	slider = createSlider(5, 15, 0);
	slider.position(1095, 478);
	slider.style('width', '80px');
}


// particle class
class Particle {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
		// x and y position adjusted based on layout
		let newX = this.posX + (painting.width - width) / 2;
		let newY = this.posY + (painting.height - height) / 2;
		// get color of particle from this specific position of the original image
		this.color = color(painting.get(newX, newY));
		this.color.setAlpha(100); //lower opacity
		this.size = slider.value();
	}

	//draw the particle
	drawParticle() {
		noStroke();
		fill(this.color);
		ellipse(this.posX, this.posY, this.size, this.size);
	}
}


function draw() {
	//instructions
	//box
	stroke(0, 0, 0);
	strokeWeight(0.1);
	fill('#262626');
	rect(1090, 425, 110, 148);
	//text
	textFont('Georgia');
	fill(255);
	textSize(9);
	text('To Interact with the Work', 1094, 438);
	textSize(8);
	text('- Click on canvas to start;', 1095, 452);
	text('- Slide this bar to adjust', 1095, 464);
	text('  the size of the stroke;', 1095, 476);
	text('- After 10 seconds, the', 1095, 504);
	text('  current canvas will be', 1095, 516);
	text('  complete and automatically', 1095, 528);
	text('  saved to your computer;', 1095, 540);
	text('- Click space to clear canvas', 1095, 552);
	text('  and start a new painting.', 1095, 564);

	// label
	// box
	noFill();
	rect(1090, 580, 110, 60);
	// text
	fill(51);
	textSize(10);
	text('Jiaqi Liu & The User', 1095, 593);
	textSize(8);
	textStyle(ITALIC);
	text('Pointillism', 1095, 605);
	textStyle(NORMAL);
	text(', 2020', 1135, 605);
	textSize(8);
	text('Code on Screen', 1095, 617);
	
	// draw image with particles
	// move painting to desired position
	translate(0, -50);
	isTranslate = true;
	// after 600 iterations, the loop for the current image stops
	if (start === true && particleCount <= 600) {
		// iteration for particles, 100 each
		for (var i = 0; i < 100; i++) {
			// draw partical within range of fram
			let particle = new Particle(random(275, 1025), random(150, 651));
			particle.drawParticle();
		}
		// increment particalCount after each loop
		particleCount += 1; 
	}
	// after 600 iterations, the completed artwork will be saved
	if (particleCount === 600){
		button.show();
	}
}


// click on canvas to start the first painting and play music
function mousePressed() {
	if (mouseX >= 275 && mouseX <= 1025 && mouseY >= 100 && mouseY <= 600) {
		if(!music.isPlaying()) {
			music.loop();//music will start again when finished
			start = true;
		}
	}
}


// press space key to move on to next painting
function keyPressed() {
	if (keyCode == 32) {
		// reset canvas
		clear();
		count = 0;
		button.hide(); 
		particleCount = 0;
		// load next image in paintings array
		painting = loadImage(paintings[paintingCount]);
		// move on to next painting. Go back to first one if the last one is complete
		if (paintingCount == 4) {
			paintingCount = 0;
		} else {
			paintingCount++;
		}
		// fix the position
		if(isTranslate == true) {
			translate(0, 50);
			isTranslate = false;
		}
		// reload background and frame (because of the reset)
		background(bg);
		image(frame, 55, -65);
		// start next painting 
		start = true;
	}
}


function download(){
	// save only final artwork on the canvas
	final = get(230, 59.5, 836, 585);
	save(final, 'Pointillism.jpg');
}