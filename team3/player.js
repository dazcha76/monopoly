class Player{

    constructor(name, character, amount, turn){
        this.balance=amount;
        this.properties = [];
        this.playerName = name;
        this.playerCharacter = character;
        this.player_position=0;
        this.createPlayerCard();

        this.goToJail = this.goToJail.bind(this);
        this.buyProperty = this.buyProperty.bind(this);
    }

    createPlayerCard(){
        var player_container = $('<div>').addClass(`players ${this.playerName}`);
        var player_name = $('<div>').addClass('player_name ' +this.playerName).text(this.playerName);
        var player_balance = $('<div>').addClass('player_balance ' + this.playerName);
        var player_properties = $('<div>').addClass('player_properties');
        var row1 =  $('<div>').addClass('row1');
        var row2 =  $('<div>').addClass('row2');
        var brown = $('<div>').addClass('colorContainer brown ' + this.playerName);
        var bluegray = $('<div>').addClass('colorContainer bluegray ' + this.playerName);
        var violet = $('<div>').addClass('colorContainer violet ' + this.playerName);
        var orange = $('<div>').addClass('colorContainer orange ' + this.playerName);
        var red = $('<div>').addClass('colorContainer red ' + this.playerName);
        var yellow = $('<div>').addClass('colorContainer yellow ' + this.playerName);
        var green = $('<div>').addClass('colorContainer green ' + this.playerName);
        var blue = $('<div>').addClass('colorContainer blue ' + this.playerName);
        var black = $('<div>').addClass('colorContainer black ' + this.playerName);
        var white = $('<div>').addClass('colorContainer white ' + this.playerName);

        row1.append(brown, bluegray, violet, orange, black);
        row2.append(red, yellow, green, blue, white);
        player_properties.append(row1, row2);

        if(!this.currentTurn){
            var buttonContainer = $('<div>').addClass('buttons');
        }else{
            var buttonContainer = $('<div>').addClass('buttons').hide();
        }

        var roll_button = $('<button>')
                            .text("Roll")
                            .addClass(`roll_dice ${this.playerCharacter}`)
                            .click(this.move_player);
        var end_button = $('<button>').text("End").addClass('end_turn').click(this.endTurn);
        buttonContainer.append(roll_button, end_button);

        var player_chip = $('<div>').addClass('player_chip').attr('id', this.playerName).css('background-image', `url("images/${this.playerCharacter.toLowerCase()}.jpg")`);

        if(playerArray.length>0){
            $(`#${playerArray[0]}`).addClass('player1');
        }

        player_container.append(player_name, player_balance, player_properties, buttonContainer);

        $('.players_container').append(player_container);
        $('.0.num').append(player_chip);
    }

    move_player(){        
        var player = $('.player1').attr('id');
        if (newGame.allPlayers[player]) {
            var dice_one = Math.floor((Math.random() * 6) + 1);
            var dice_two = Math.floor((Math.random() * 6) + 1);
            var dice_roll = dice_one + dice_two;
            var buttonClass = $('.roll_dice').attr('class');
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
            $(`#${player}`).appendTo('.' + currentPosition + '.num');

            $('.dice_one').css('background-image', `url(images/${dice_one}.png)`);
            $('.dice_two').css('background-image', `url(images/${dice_two}.png)`);

            newGame.allPlayers[player].handleSpaces(player, currentPosition);
        }
    }

    handleSpaces(player, position){
        var playerName = player;

        if(position === 30){
            $(player).appendTo('.30.num');
            document.getElementById("not_pass").play();
            setTimeout(this.goToJail, 5000);
            return;
        }

        if(properties[position].status === 'not for sale'){
            return;
        } else if(properties[position].owned === false){

            $('.option_button_1').remove();

            if(properties[position].cost < newGame.allPlayers[playerName].balance){
                $('.options_modal').removeClass('hidden');
                $('.option').text('Would you like to buy ' + properties[position].name + ' for $' + properties[position].cost + '?');
                var button_one=$('<button>').addClass(`option_button_1 buy_prop ${this.playerCharacter}`).text('Yes').on('click',this.buyProperty);
                var button_two=$('<button>').addClass('option_button_2').text('No').click(function(){
                    $('.options_modal').addClass('hidden');
                    $('.option_button_1').removeClass(`buy_prop ${player}`).empty();
                    $('.option_button_2').empty();
                });

                $('.options_wrapper').append(button_one,button_two);

            } else  {
                return;
            }
        } else if(properties[position].owned === true){
            this.payRent();
        }
    }

    goToJail(){
        var player = $('.player1').attr('id');
        var currentPosition = newGame.allPlayers[player].player_position;
        $(player).appendTo('.jail');
        currentPosition = 10;
    }

    addMoney(deposit){
        this.balance+=deposit;
        $(`.player_balance.${this.playerName}`).text(`$${this.balance}`);
        document.getElementById("ka-ching").play();
        return this.balance;
    }

    removeMoney(withdraw){
        if(withdraw>this.balance){
            withdraw=this.balance;
            this.balance=0;
            return;
        }
        if(this.balance===0){
            this.playerLoses();
        }

        this.balance-=withdraw;

        $(`.player_balance.${this.playerName}`).text(`$${this.balance}`);
    }
   
    buyProperty(){

        var buttonClass = $('.buy_prop').attr('class');
        var containerClass = $('.colorContainer').attr('class').substring(15);
        var player = buttonClass.substring(25);
        var currentPosition = newGame.allPlayers[player].player_position;
        var prop = properties[currentPosition];
        var cost = properties[currentPosition].cost;
        var newProperty = $('<div>')
                            .addClass(`${currentPosition} bought_prop ${prop.color}`)
                            .hover(this.showDeed, this.hideDeed)
                            .text(`${prop.initials}`);

        $(`.colorContainer.${prop.color}.${player}`).append(newProperty);

        newGame.allPlayers[player].properties.push(prop);

        properties[currentPosition].owned = true;
        properties[currentPosition].owner = player;
        newGame.allPlayers[player].removeMoney(cost);
        $('.option_button_1').remove();
        $('.option_button_2').remove();
        $('.options_modal').addClass('hidden');
    }
    
    endTurn(){
        $('.player1').removeClass('player1');
        var temp = playerArray.shift();
        playerArray.push(temp);
        var nextPlayer = playerArray[0];
        $(`#${nextPlayer}`).addClass('player1');
    }

    payRent(){
        $('.option_button_1, .option_button_2').remove();
        var current_player=$('.player1').attr('id');
        var currentPosition = newGame.allPlayers[current_player].player_position;
        var owner=properties[currentPosition].owner;
        if(properties[currentPosition].owned ===true){
            if(current_player === owner){
                return
            } else {
                if(properties[currentPosition].rent<newGame.allPlayers[current_player].balance){
                    newGame.allPlayers[owner].balance+= properties[currentPosition].rent;
                    newGame.allPlayers[current_player].balance-=properties[currentPosition].rent;
                }else{
                    newGame.allPlayers[owner].balance+= newGame.allPlayers[current_player].balance;
                    newGame.allPlayers[current_player].balance=0;
                }
            }
        }
        $(`.player_balance.${this.playerName}`).text(`$${this.balance}`);
        $(`.player_balance.${owner}`).text(`$${newGame.allPlayers[owner].balance}`);
        if(this.balance===0){
            this.playerLoses();
        }
        $('.options_modal').removeClass('hidden');
        $('.option').text('This property is owned by ' + properties[currentPosition].owner + '. Pay owner $' + properties[currentPosition].rent + '!');
        var ok_button = $('<button>').addClass('option_button_1').text('OK').click(function(){
            $('.options_modal').addClass('hidden');
        });
        $('.options_wrapper').append(ok_button);
    }

    sellProperty(){}

    checkProperty(){}


    playerLoses(){
        var player = $('.player1').attr('id');
        $('.options_modal').removeClass('hidden');
        $('.option').text( player +' you lost!');
        var ok_button = $('<button>').addClass('option_button_1').text('OK').click(function(){
        $('.options_modal').addClass('hidden')});
        $('.options_wrapper').append(ok_button);
    }

    showDeed(){
        var propertyIndex = parseInt($(this).attr('class'));
        var currentProperty = properties[propertyIndex];
        console.log(currentProperty);
        if(currentProperty.color === 'brown'){
            $('.deed_modal').removeClass('hidden').css('border', '8px solid #8a6d3b');
        } else if(currentProperty.color === 'bluegray'){
            $('.deed_modal').removeClass('hidden').css('border', '8px solid #66afe9');
        } else {
            $('.deed_modal').removeClass('hidden').css('border', `8px solid ${currentProperty.color}`);
        }
        $('.deed_bar').addClass(currentProperty.color)
        $('.deed_bar > p').text(currentProperty.name);
        $('.rent_value').text(currentProperty.rent);
        $('.rent_set_value').text(currentProperty.monopolyRent);
        $('.one_house_value').text(currentProperty.house1);
        $('.two_houses_value').text(currentProperty.house2);
        $('.three_houses_value').text(currentProperty.house3);
        $('.four_houses_value').text(currentProperty.house4);
        $('.hotel_value').text(currentProperty.hotel);
        $('.house_cost_value').text(currentProperty.houseCost);
        $('.hotel_cost_value').text(currentProperty.hotelCost);
    }

    hideDeed(){
      $('.deed_modal').addClass('hidden');
    }
}
