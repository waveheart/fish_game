var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.momTails;
	this.momTailsCount = 0;
	this.momTailsTimer = 0;

	this.momEyes;
	this.momEyesTimer = 0;
	this.momEyesCount = 0;
	this.momEyesInterval = 1000;

	this.momBodyOrange;
	this.momBodyBlue;
	this.momBodyCount;

	// this.bigBody = new Image();

}
momObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;

	this.momTails = [];
	this.momEyes = [];
	this.momBodyOrange = [];
	this.momBodyBlue = [];
	this.momBodyCount = 0;

	// this.bigBody.src = "src/bigSwim0.png";
	
	for (var i = 0; i < 8; i++) {
		this.momTails[i] = new Image();
		this.momTails[i].src = "src/bigTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		this.momEyes[i] = new Image();
		this.momEyes[i].src = "src/bigEye" + i + ".png";
	}

	for (var i = 0; i < 8; i++) {
		this.momBodyOrange[i] = new Image();
		this.momBodyBlue[i] = new Image();

		this.momBodyOrange[i].src = "src/bigSwim" + i + ".png"
		this.momBodyBlue[i].src = "src/bigSwimBlue" + i + ".png"

	}
}
momObj.prototype.draw = function(){
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.98);

	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle = lerpAngle(beta,this.angle,0.6)

	this.momTailsTimer += deltaTime;
	if(this.momTailsTimer > 75){
		this.momTailsCount = (this.momTailsCount + 1) % 8;
		this.momTailsTimer %= 75;
	} 

	this.momEyesTimer += deltaTime;
	if(this.momEyesTimer > this.momEyesInterval){
		this.momEyesCount = (this.momEyesCount + 1) % 2;
		this.momEyesTimer %= this.momEyesTimer;
		if( this.momEyesCount == 0){
			this.momEyesInterval = Math.random() * 1500 + 2000;
		}else{
			this.momEyesInterval = 100;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	ctx1.drawImage(this.momTails[this.momTailsCount],-this.momTails[this.momTailsCount].width*0.5+30,-this.momTails[this.momTailsCount].height*0.5);
	if(data.blue_double == 1){
		ctx1.drawImage(this.momBodyOrange[this.momBodyCount],-this.momBodyOrange[this.momBodyCount].width*0.5,-this.momBodyOrange[this.momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(this.momBodyBlue[this.momBodyCount],-this.momBodyBlue[this.momBodyCount].width*0.5,-this.momBodyBlue[this.momBodyCount].height*0.5);
	}
	ctx1.drawImage(this.momEyes[this.momEyesCount],-this.momEyes[this.momEyesCount].width*0.5,-this.momEyes[this.momEyesCount].height*0.5);


	ctx1.restore();
}