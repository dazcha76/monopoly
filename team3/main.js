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
  $('.Frodo,.Gandalf,.Aragorn,.Legolas,.Arwen').on('click', selectCharacter);
}


function selectCharacter(){

  character = $(this).attr('class');
    playerArray.push(character);
  if($('.next_player').hasClass('clickable')){
    $('.next_player').css('opacity', '1').on('click', nextPlayer);
  }
  $(this).css('opacity', '0.3').off('click').addClass('picked');

  $('h3').removeClass('animated bounceInLeft');
  console.log("character")
}

function nextPlayer(){
  newGame = new Game();
  newGame.createPlayer();
  newGame.displayPlayer();
  $('span').text('Player 2');
  $('h3').addClass('animated bounceInLeft');
  $('.next_player').css('opacity', '0.3').off('click', nextPlayer).removeClass('clickable');
  $('.start_game').css('opacity', '1').on('click', startGame);
  console.log("next player");

}

function startGame(){
  newGame.createPlayer();
  newGame.displayPlayer();
  $('.welcome_page').addClass('hidden');
  console.log("start game");
    //playerArray.push(character);
}

function displayPropertyInfo(){
  var thisCard = $(this).attr('class');
  var thisPosition = parseInt(thisCard);
  var propertyInfo = properties[thisPosition];
  var details;

  for(details in propertyInfo){
    var detail = $('<p>').text(details + ": " + propertyInfo[details]);
    $('.property_info').append(detail);
  }
}