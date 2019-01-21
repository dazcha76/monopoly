class Game {
  constructor(){
    this.allPlayers = {};
    this.playerName = null;
    this.playerCharacter = null;
    this.initialBalance = 1500;
    this.currentPlayer = false;
  }

  createPlayer(){
    this.playerName = character;
    this.playerCharacter = character;
    this.allPlayers[this.playerName] = new Player(this.playerName, this.playerCharacter, this.initialBalance, this.currentPlayer);
  }

  displayPlayer(){
    $('.player_character').text(this.playerCharacter);
    $('.player_balance').text(`$${this.initialBalance}`);
    this.allPlayers[this.playerName].balance;
    $(`#${playerArray[0]}`).addClass('player1');
  }
}