$(document).ready(initGame);

var diceValue=null;
var diceRolled=false;
var newGame = null;
var player = null;
var character = null;

function initGame(){
  clickHandlers();
}

function clickHandlers() {
  $('.start_game').click(function(){
      newGame = new Game();
      newGame.createPlayer();
      newGame.displayPlayer();
      $('.welcome_page').addClass('hidden');
  });

  $('.character').click(selectCharacter);
}

function selectCharacter(){
  character = $(this).attr('id');
}