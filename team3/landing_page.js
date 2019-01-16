class LandingPage {
  constructor(name, character){
    this.player_name = null;
    this.character = null;
    this.initialBalance = 1500;
  }

  setInfo(){
    this.player_name = $('.nameInput').val();
    this.character = $('select').val();
  }

  startClickHandler() {
    var newGame = new Game(this.player_name, this.character, this.initialBalance);
    return newGame;
  }
}