class Game {
  constructor(){
    this.allPlayers = {};
    this.playerName = null;
    this.playerCharacter = null;
    this.initialBalance = 1500;
  }

  createPlayer(){
    this.playerName = character;
    this.playerCharacter = character;
    this.allPlayers[this.playerName] = new Player(this.playerName, this.playerCharacter, this.initialBalance);
  }

  displayPlayer(){
    $('.player_name').text(this.playerCharacter);
    $('.player_character').text(this.playerCharacter);
    $('.player_balance').text(this.initialBalance);
  }

  displayPropertyInfo(){
    
  }
}


