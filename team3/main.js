$(document).ready(initGame);

var diceValue=null;
var diceRolled=false;
var newGame = null;
var player = null;
var character = null;
var playerArray=[];

function initGame(){
  clickHandlers();
}

function clickHandlers() {
  $('.select').on('click', selectCharacter);
}

function selectCharacter(){
  character = $(this).attr('class').substring(7);
  playerArray.push(character);
  if($('.next_player').hasClass('clickable')){
    $('.next_player').css('opacity', '1').on('click', nextPlayer);
  }
  $(this).css('opacity', '0.3').off('click').addClass('picked');
  $('h3').removeClass('animated bounceInLeft');
}

function nextPlayer(){
  newGame = new Game();
  newGame.createPlayer();
  newGame.displayPlayer();
  $('.which_player').text('Player 2');
  $('h3').addClass('animated bounceInLeft');
  $('.next_player').css('opacity', '0.3').off('click', nextPlayer).removeClass('clickable');
  $('.start_game').css('opacity', '1').on('click', startGame);
}

function startGame(){
  newGame.createPlayer();
  newGame.displayPlayer();
  $('.welcome_page').addClass('hidden');
}