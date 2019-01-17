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
      $('.buy').hover(displayPropertyInfo);
  });

  $('.character').click(selectCharacter);
}

function selectCharacter(){
  character = $(this).attr('id');
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