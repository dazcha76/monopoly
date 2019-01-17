class Player{
    constructor(name, character){
        this.balance=1500;
        this.playerName = name;
        this.playerCharacter = character;
        this.player_position=0;

        this.createPlayerCards();
    }

    createPlayerCards(){
        var player_container = $('<div>').addClass('players');
        var player_name = $('<div>').addClass('player_name');
        var player_character = $('<div>').addClass('player_character');
        var player_balance = $('<div>').addClass('player_balance');
        var roll_button = $('<button>').text("ROLL").addClass(`roll_dice ${this.playerName}`).click(this.move_player);
        var end_button = $('<button>').text("END").addClass('end_turn');

        player_container.append(player_name, player_character, player_balance, roll_button, end_button);

        $('.players_container').append(player_container)

    }

    move_player(){

        var dice_roll = Math.floor((Math.random() * 1)+1);

        var buttonClass = $('.roll_dice').attr('class');
        var player = buttonClass.substring(10);

        var currentPosition = newGame.allPlayers[player].player_position;

        currentPosition += dice_roll;

        newGame.allPlayers[player].player_position = currentPosition;
        $('.player').appendTo('.'+ currentPosition);
    }

    addMoney(deposit){
        this.balance+=deposit;
        return this.balance;
    }

    removeMoney(withdraw){

        if(withdraw>this.balance){
            return this.balance;
        }

        this.balance-=withdraw;
        return this.balance;
    }
    checkMoney(){
        return this.balance;
    }
   
    addProperty(){}
    removeProperty(){}
    checkProperty(){}

    addRailRoad(){}
    removeRailRoad(){}
    checkRailRoad(){}


    addUtilities(){}
    removeUtilities(){}
    checkUtilities(){}
}
// var sky = new Player('sky', 'frodo');
