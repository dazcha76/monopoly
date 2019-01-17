class Move {
  // constructor(player, position){
  constructor(){
    // this.player = player;
    // this.dice_roll = dice_roll;
    this.position = newGame.allPlayers.Sky.position;
    console.log(this.position)
    //this.dice_roll = 1;

  }

  move_player(diceRoll){
    this.dice_roll=diceRoll;
    this.position += this.dice_roll;
    $('.player').appendTo('.one');

  }

}
