class Player{

    constructor(name, character, turn){
        this.balance=1500;
        this.properties = [];
        this.playerName = name;
        this.playerCharacter = character;
        this.player_position=0;
        this.currentPlayer=turn;
        this.createPlayerCard();
    }

    createPlayerCard(){
        var player_container = $('<div>').addClass('players');
        var player_name = $('<div>').addClass('player_name').attr('id', this.playerName).text(this.playerName);
        var player_balance = $('<div>').addClass('player_balance');
        if(!this.currentPlayer){
            var buttonContainer = $('<div>').addClass('buttons');
        }else{
            var buttonContainer = $('<div>').addClass('buttons').hide();
        }
        var roll_button = $('<button>').text("Roll").addClass(`roll_dice ${this.playerCharacter}`).click(this.move_player);
        var buy_button = $('<button>').text("Buy").addClass(`buy_prop ${this.playerCharacter}`).click(this.buyProperty);
        var end_button = $('<button>').text("End").addClass('end_turn').click(this.endTurn);
        buttonContainer.append(roll_button,buy_button,end_button);

        var player_chip = $('<div>').addClass(`player1 ${this.playerCharacter}`).css('background-image', `url("images/${this.playerCharacter.toLowerCase()}.jpg")`);
        player_container.append(player_name, player_balance, buttonContainer);

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
        var currentTempName = newGame.allPlayers[player].playerName;
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
        console.log(this.playerName);
        var target = ".player1."+currentTempName;
        $(target).appendTo('.'+ currentPosition);
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
   
    buyProperty(){
        var buttonClass = $('.buy_prop').attr('class');
        var player = buttonClass.substring(9);
        var currentPosition = newGame.allPlayers[player].player_position;
        var prop = properties[currentPosition];
        newGame.allPlayers[player].properties.push(prop);
        properties[currentPosition].owned = true;
        properties[currentPosition].owner = player;
        var cost = properties[currentPosition].cost;
        newGame.allPlayers[player].removeMoney(cost);
    }
    
    endTurn(){
        var player = $('.player_name').attr('id');
        var currentPlayerName = newGame.allPlayers[player].playerName;
        $(`#${currentPlayerName} ~ .buttons`).hide();
        newGame.allPlayers[player].currentTurn = false;
        var temp = playerArray.shift();
        playerArray.push(temp);
        newGame.allPlayers[playerArray[0]].currentTurn=true;
        var nextPlayer = playerArray[0];
        $(`#${nextPlayer} ~ .buttons`).show();
    }

    sellProperty(){}

    checkProperty(){}

}
