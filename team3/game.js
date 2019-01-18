class Game {
  constructor(){
    this.allPlayers = {};
    this.playerName = null;
    this.playerCharacter = null;
    // this.initialBalance = 1500;
    this.currentPlayer = false;
  }

  createPlayer(){
    this.playerName = character;
    this.playerCharacter = character;
    if(playerArray[0]){
      this.currentPlayer = true
    }
  
    playerArray.push(this.playerName);
    this.allPlayers[this.playerName] = new Player(this.playerName, this.playerCharacter, this.currentPlayer);
  }

  displayPlayer(){
    $(`#${this.playerCharacter}`).text(this.playerCharacter);
    $('.player_character').text(this.playerCharacter);
    $('.player_balance').text(this.initialBalance);
    //this.allPlayers[this.playerName].balance

  }
}


