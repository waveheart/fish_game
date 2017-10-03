var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babytails;
	this.babyEyes;
	this.babyBodys;
	// this.babyEye = new Image();
	// this.babyBody = new Image();
	// this.babyTail = new Image();

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;


}
babyObj.prototype.init = function(){
	this.x = canWidth/2 -50;
	this.y = canHeight/2 + 50;
	this.angle = 0; 
	this.babytails = [];
	this.babyEyes = [];
	this.babyBodys = [];
	// this.babyEye.src = "src/babyEye0.png" 
	// this.babyBody.src = "src/babyFade0.png"
	// this.babyTail.src = "src/babyTail0.png"
	for (var i = 0; i < 8; i++) {
		this.babytails[i] = new Image();
		this.babytails[i].src = "src/babyTail" + i + ".png";
	}
	for (var i = 0; i < 2; i++) {
		this.babyEyes[i] = new Image();
		this.babyEyes[i].src = "src/babyEye" + i + ".png"
	}

	for (var i = 0; i < 20; i++) {
		this.babyBodys[i] = new Image();
		this.babyBodys[i].src = "src/babyFade" + i +".png"
	}
}
babyObj.prototype.draw = function(){


	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.98);

	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle = lerpAngle(beta,this.angle,0.4)

	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1000 + 1500;
		}else{
			this.babyEyeInterval = 70;
		}
	}

	this.babyBodyTimer += deltaTime;
	if( this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount>19){
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.babytails[this.babyTailCount], -this.babytails[this.babyTailCount].width*0.5+23, -this.babytails[this.babyTailCount].height*0.5);
	ctx1.drawImage(this.babyBodys[this.babyBodyCount], -this.babyBodys[this.babyBodyCount].width*0.5, -this.babyBodys[this.babyBodyCount].height*0.5);
	ctx1.drawImage(this.babyEyes[this.babyEyeCount], -this.babyEyes[this.babyEyeCount].width*0.5, -this.babyEyes[this.babyEyeCount].height*0.5);
	

	ctx1.restore();
}