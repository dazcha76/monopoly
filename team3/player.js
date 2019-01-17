class Player{
    constructor(name, character){
        this.balance=1500;
        this.playerName = name;
        this.playerCharacter = character;
        this.player_position=0;
        this.createPlayerCard();
    }

    createPlayerCard(){
        var player_container = $('<div>').addClass('players');
        var player_name = $('<div>').addClass('player_name').attr('id', this.playerName).text(this.playerName);
        var player_balance = $('<div>').addClass('player_balance');
        var roll_button = $('<button>').text("Roll").addClass(`roll_dice ${this.playerCharacter}`).click(this.move_player);
        var end_button = $('<button>').text("End").addClass('end_turn');
        var player_chip = $('<div>').addClass(`player1 ${this.playerCharacter}`).css('background-image', `url("images/${this.playerCharacter.toLowerCase()}.jpg")`);
        player_container.append(player_name, player_balance, roll_button, end_button);
        $('.players_container').append(player_container);
        $('.go').append(player_chip);
    }

    move_player(){

        var dice_one=Math.floor((Math.random() * 6)+1);
        var dice_two=Math.floor((Math.random() * 6)+1);

        var dice_roll = dice_one +dice_two;
        var buttonClass = $('.roll_dice').attr('class');
        var player = buttonClass.substring(10);
        var currentPosition = newGame.allPlayers[player].player_position;
        var tempCurrentPosition = currentPosition;
        currentPosition += dice_roll;
        if (currentPosition > 39) {
            var positionDifference = 39 - tempCurrentPosition;
            var newPosition = dice_roll - positionDifference - 1;
            newGame.allPlayers[player].player_position = 0;
            currentPosition = newPosition;
            newGame.allPlayers[player].addMoney(200);
        }
        newGame.allPlayers[player].player_position = currentPosition;
        $('.player1').appendTo('.'+ currentPosition);
        $('.dice_one').text(dice_one);
        $('.dice_two').text(dice_two);
    }

    addMoney(deposit){
        this.balance+=deposit;
        $(".player_balance").text(this.balance);
        return this.balance;
    }

    removeMoney(withdraw){
        if(withdraw>this.balance){
            return this.balance;
        }
        this.balance-=withdraw;
        $(".player_balance").text(this.balance);
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
