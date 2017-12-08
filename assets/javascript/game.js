$(document).ready(function() {

	var chosenHero;
	var chosenVillain;
	var isHeroChosen = false;
	var isVillainChosen = false;
	var villainsToFight = 4;
	var gameOver = false;
	var lose = false;
	var won = false;
	
	var Hero = function(name) {
		this.name = name;
		this.attackPower = 20;
		this.hp = Math.floor(Math.random()*200) + 100;
	}

	var heroes = {
		hero1: new Hero('Captain America'),
		hero2: new Hero('Spiderman'),
		hero3: new Hero('Thor'),
		hero4: new Hero('Batman')
	}

	var Villain = function(name, counterAttackPower) {
		this.name = name;
		this.counterAttackPower = counterAttackPower;
		this.hp = Math.floor(Math.random()*200) + 100;
	}

	var villains = {
		villain1: new Villain("Red Skull", 20),
		villain2: new Villain("Joker", 15),
		villain3: new Villain("Loki", 5),
		villain4: new Villain("Green Goblin", 10)
	}

	function displayHP () {
		$('#hero1 .HP').html(heroes.hero1.hp); 
		$('#hero2 .HP').html(heroes.hero2.hp); 
		$('#hero3 .HP').html(heroes.hero3.hp); 
		$('#hero4 .HP').html(heroes.hero4.hp); 
		$('#villain1 .HP').html(villains.villain1.hp); 
		$('#villain2 .HP').html(villains.villain2.hp); 
		$('#villain3 .HP').html(villains.villain3.hp); 
		$('#villain4 .HP').html(villains.villain4.hp); 
	};


	function villainPos() {

	};

	function resetGame() {
		
	};

	function startGame() {
	};	

	displayHP();

//CLICK HERO



    $(".hero").on("click", function() {
    	if (isHeroChosen) return;
    	else {
    		var heroId = $(this).attr('id');
    		chosenHero = heroes[heroId];
			$(this).appendTo(".heroPicked");
			$(".heroesContent").addClass("heroesRemaining");
			var newHtml =`<p class="heroesSubheading">You are ${chosenHero.name}! Now pick the first villain to fight </p>`; 
			$(".heroPickedSubheading").append(newHtml);
			isHeroChosen = true;
		}
	});

//CLICK VILLAIN

	$(".villain").on("click", function() {
		if (isVillainChosen) return;
		
		else {
			villainsToFight --;

			console.log(villainsToFight);
			var villainId = $(this).attr('id');
			chosenVillain = villains[villainId];
			$(this).appendTo(".villainPicked");
			$(".villainsContent").addClass("villainsRemaining");
			var newHtml =`<p class="villainsSubheading">You are fighting ${chosenVillain.name}! Now you can attack! </p>`; 
			$(".villainPickedSubheading").append(newHtml);
			$(".attackButton").css("visibility", "visible");
			isVillainChosen = true;
		}
	});

//ATTACK BUTTON
		
	$(".attackButton").on("click", function() {
		if (isVillainChosen && isHeroChosen && chosenHero.hp > 0 && villainsToFight >= 0 ) {
			chosenVillain.hp -= chosenHero.attackPower;
			chosenHero.hp -= chosenVillain.counterAttackPower;

			$(".villainPickedResults p").css("visibility", "visible");
			$(".heroPickedResults p").css("visibility", "visible");
			
			$('.villainPickedResults p').html(`You attacked villain ${chosenVillain.name} for damage of ${chosenHero.attackPower}`); 		
	 		$('.heroPickedResults p').html(`${chosenVillain.name} attacked you back for damage of ${chosenVillain.counterAttackPower}`); 

			$('.villainPicked .HP').html(chosenVillain.hp); 
			$('.heroPicked .HP').html(chosenHero.hp); 
		}
	});


	if (chosenVillain.hp <= 0 && villainsToFight > 0){
			$(".villainsContent").removeClass("villainsRemaining");
			isVillainChosen = false;
			$('.villainPickedResults p').html(`You won this round against ${chosenVillain.name}. Pick a new villain to fight!`); 		
	 		$('.heroPickedResults p').html(`${chosenVillain.name} you lost.`); 
	}

	if (chosenVillain.hp <= 0 && villainsToFight === 0) {
		gameOver = true;
		win = true;
			$('.villainPickedResults p').html(`You won against ${chosenVillain.name}`); 		
	 		$('.heroPickedResults p').html(`${chosenVillain.name} you lost.`); 
	}

	if (chosenHero.hp <= 0) {
		gameOver = true;
		lose = true;
	}


});



	// if (chosenVillain.Hp <= 0 && villainToFight > 0) {
	// 	//hide the villain
			

	// 		$(".villainsContent").css("opacity", "0");

	// 	else if (chosenVillainNewHp <=0) {
			

	// 	else if (villainsToFight === 0) {
	// 		won = true;
	// 	}
	// 	}
	// });
