$(document).ready(initGame);

var diceValue=null;
var diceRolled=false;



function initGame(){
    console.log('I started!');
    initPlayer();
    clickHandlers();
}

function clickHandlers() {
	console.log("click handlers");
	$(".dice_area").click(rollDice);

	$(".dice_area").click(diceRolledCheck);

    $('.start_game').click(function(){
        var newGame = new Game();
        newGame.createPlayer();
        newGame.displayPlayer();
    });
}

function initPlayer(){
    console.log('init player');
}

function rollDice() {
	console.log("rolling dice!");

	if(diceRolled===false){
        diceValue = Math.floor((Math.random() * 1) + 1);
        $(".dice_area").text(diceValue);
        diceRolled=true;
	}
	return diceValue;
}

function diceRolledCheck(){
    if(diceRolled===true){
        x.move_player(diceValue);
        diceRolled=false;
    }
}