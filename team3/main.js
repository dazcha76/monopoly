$(document).ready(initGame);

var diceValue=null;
var diceRolled=false;
var newGame = null;
var player = null;

function initGame(){

    clickHandlers();
}

function clickHandlers() {

	// $(".dice_area").click(rollDice);

	// $(".dice_area").click(diceRolledCheck);

    $('.start_game').click(function(){
        newGame = new Game();
        newGame.createPlayer();
        newGame.displayPlayer();
    });
}

// function rollDice() {
// 	if(!diceRolled){
//         diceValue = Math.floor((Math.random() * 1)+1);
//         $(".dice_area").text(diceValue);
//         diceRolled=true;
// 	}
// 	return diceValue;
// }

// function diceRolledCheck(){
//     if(diceRolled){
//         sky.move_player(diceValue);
//         diceRolled=false;
//     }
// }
