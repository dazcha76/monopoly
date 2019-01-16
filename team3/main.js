$(document).ready(initGame);

function initGame(){
    console.log('I started!');
    initPlayer();
    clickHandlers();
}

function clickHandlers() {
	console.log("click handlers");
	$(".dice_area").click(rollDice);
  $(".start_game").click()
}

function initPlayer(){
    console.log('init player');
}

function rollDice() {
	console.log("rolling dice!");
	var diceValue = Math.floor((Math.random() * 1) + 1);
	$(".dice_area").text(diceValue);
}