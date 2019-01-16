class Move {
  // constructor(player, position, dice_roll){
  constructor(){
    // this.player = player;
    // this.position = position;
    // this.dice_roll = dice_roll;
    this.position = 0;
    this.dice_roll = 1;

    this.board_array = ['go', 'one'];
  }

  move_player(){
    this.position += this.dice_roll;
    $('.player').appendTo('.one');
  }
}

var x = new Move();