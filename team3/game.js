class Game {
  constructor(name , character, balance){
    this.allPlayers = {};
    this.playerName = name;
    this.playerCharacter = character;
    this.initialBalance = balance;
  }

  createPlayer(){
    this.allPlayers = new Player(this.playerName, this.playerCharacter, this.initialBalance);
  }

  displayPlayer(){
    $('.player_name').text(this.player_name);
    $('.player_balance').text(this.initialBalance);
  }
}

