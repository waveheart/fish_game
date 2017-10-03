function momFruitsCollision(){
	if (!data.gameOver) {
		for (var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i] && fruit.eatable[i]){
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y)
				if(l<900){
					fruit.dead(i);
					data.fruitNum ++;
					mom.momBodyCount = mom.momBodyCount>=7? 7:mom.momBodyCount+1;
					if(fruit.fruitType[i] == "blue"){
						data.blue_double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i]);
				}
			}
		}
	}
	
}

function momBabycollision(){

	if (data.fruitNum > 0 && !data.gameOver) {
		var l = calLength2(mom.x,mom.y, baby.x, baby.y);
		if(l < 900){
			baby.babyBodyCount = 0;
			// data.reset();
			mom.momBodyCount = 0;
			data.addscore();
			//draw halo
			halo.born( baby.x, baby.y);
		}
	}
	
}