var can1;
var can2;
var ctx1;
var ctx2;
var lastTime;
var deltaTime;

var canWidth;
var canHeight;

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var data;

var wave;
var halo;

var dust;
var dustPic = [];

var bgPic = new Image();

document.body.onload = game();

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;

	gameloop();
}

function init(){
	can1 = document.getElementById('canvas1');
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove', onMousemove,false)

	bgPic.src = "src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth*0.5;
	my = canHeight*0.5;

	data = new dataObj;

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj;
	wave.init();

	halo = new haloObj;
	halo.init();

	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "src/dust" + i + ".png";
	}

	dust = new dustObj();
	dust.init();
}

function gameloop(){

	window.requestAnimFrame(gameloop);
	var now = new Date();
	deltaTime =  deltaTime<20? now - lastTime:20;
	lastTime = now;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	
	baby.draw();
	momFruitsCollision();
	momBabycollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMousemove(e) {
	if(!data.gameOver){
		if(e.offsetX||e.layerX){
			mx = e.offsetX==undefined? e.layerX:e.offsetX;
			my = e.offsetY==undefined? e.layerY:e.offsetY;
		}
	}
	
}