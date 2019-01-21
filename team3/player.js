class Player{

    constructor(name, character, amount, turn){
        this.balance=amount;
        this.properties = [];
        this.multipliers = {'brown': [], 
                            'bluegray': [], 
                            'violet': [],
                            'orange': [],
                            'red': [],
                            'yellow': [],
                            'green': [],
                            'blue': [],
                            'black': [],
                            'white':[] 
                            };
        this.playerName = name;
        this.playerCharacter = character;
        this.player_position=0;
        this.createPlayerCard();

        this.createPlayerCard = this.createPlayerCard.bind(this);
        this.goToJail = this.goToJail.bind(this);
        this.buyProperty = this.buyProperty.bind(this);
    }

    createPlayerCard(){
        var player_container = $('<div>').addClass(`players ${this.playerName}`).css('height', '8%');
        var player_name = $('<div>').addClass(`player_name ${this.playerName}`).css('height', '100%').text(this.playerName);
        var info_container = $('<div>').addClass(`player_info_container ${this.playerName}`).css({'height': '0', 'opacity': '0'});
        var player_balance = $('<div>').addClass(`player_balance ${this.playerName}`);
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

        var buttonContainer = $('<div>').addClass('buttons');
        var roll_button = $('<button>')
                            .text("Roll")
                            .addClass(`roll_dice ${this.playerCharacter}`)
                            .click(this.move_player);
        var end_button = $('<button>').text("End").addClass('end_turn').click(this.endTurn);
        buttonContainer.append(roll_button, end_button);
        var player_chip = $('<div>')
                            .addClass('player_chip')
                            .attr('id', this.playerName)
                            .css('background-image', `url("images/${this.playerCharacter.toLowerCase()}.jpg")`);

        info_container.append(player_balance, player_properties, buttonContainer)
        player_container.append(player_name, info_container);

        $('.players_container').append(player_container);
        $('.0.num').append(player_chip);

        if(playerArray.length === 1){
            $(`#${playerArray[0]}`).addClass('player1');
        }  

        this.showPlayerOne(this.playerName);
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

            if(currentPosition === 10){
                $('.player_chip').css('left', '10%')
            } else {
                $('.player_chip').css('left', '65%')
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

        if(position === 4){
            $('.options_modal').removeClass('hidden');
            $('.option').text('Gollum has found you! Pay $200!');
            var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
                $('.options_modal').addClass('hidden');
                $('.ok_button').remove();
            });
            $('.options_wrapper').append(ok_button);
            newGame.allPlayers[playerName].removeMoney(200);
        } else if(position===30){
            $(playerName).appendTo('.30.num.big.go_to_jail');
            document.getElementById("not_pass").play();
            setTimeout(this.goToJail, 5000);
            newGame.allPlayers[playerName].inJail = true;
        } else if(position === 38){
            $('.options_modal').removeClass('hidden');
            $('.option').text('You have entered Shalob\'s Lair. Pay $100!');
            var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
                $('.options_modal').addClass('hidden');
                $('.ok_button').remove();
            });
            $('.options_wrapper').append(ok_button);
            newGame.allPlayers[playerName].removeMoney(100);
        } else if(position === 7 || position === 22 || position === 36){
            this.handleLandrova();
        } else if(position === 2 || position === 17 || position === 33){
            this.handleSmaugsTreasure();
        }

        if(properties[position].owned === false){
            if(properties[position].cost < newGame.allPlayers[playerName].balance){
                $('.options_modal').removeClass('hidden');
                $('.option').text('Would you like to buy ' + properties[position].name + ' for $' + properties[position].cost + '?');
                var button_one=$('<button>').addClass(`option_button_1 buy_prop ${this.playerCharacter}`).text('Yes').on('click',this.buyProperty);
                var button_two=$('<button>').addClass('option_button_2').text('No').click(function(){
                    $('.options_modal').addClass('hidden');
                    $('.option_button_1, .option_button_2').remove();
                });
                $('.options_wrapper').append(button_one,button_two);
            } else  {
                $('.options_modal').removeClass('hidden');
                $('.option').text(`You don\'t have enough money to buy ${properties[position].name}.`);
                var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
                    $('.options_modal').addClass('hidden');
                    $('.ok_button').remove()
                });
                $('.options_wrapper').append(ok_button);
            }
        } else if(properties[position].owned === true){
            this.payRent();
        }
    }

    handleLandrova(){
        var randomNum = Math.floor((Math.random() * landroval.length));
        var chance = landroval[randomNum];
        $('.options_modal').removeClass('hidden');
        $('.option').text(`${chance}`);
        var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
            $('.options_modal').addClass('hidden');
            $('.ok_button').remove();
        });
        $('.options_wrapper').append(ok_button);
        landroval.splice(randomNum, 1);
    }

    handleSmaugsTreasure(){
        var randomNum = Math.floor((Math.random() * smaugs_treasure.length));
        var chest = smaugs_treasure[randomNum];
        $('.options_modal').removeClass('hidden');
        $('.option').text(`${chest}`);
        var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
            $('.options_modal').addClass('hidden');
            $('.ok_button').remove();
        });
        $('.options_wrapper').append(ok_button);
        smaugs_treasure.splice(randomNum, 1);
    }


    goToJail(){
        var player = $('.player1').attr('id');
        newGame.allPlayers[player].player_position = 10;
        $(`#${player}`).appendTo('.jail');
        return;
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
            this.playerLoses();
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
        newGame.allPlayers[player].multipliers[prop.color].push(prop.color);

        properties[currentPosition].owned = true;
        properties[currentPosition].owner = player;
        newGame.allPlayers[player].removeMoney(cost);
        $('.option_button_1').remove();
        $('.option_button_2').remove();
        $('.options_modal').addClass('hidden');
    }
    
    endTurn(){
        var currentPlayer = $('.player1').attr('id') ;

        $(`.players.${currentPlayer}`).css({'height': '8%'});
        $(`.player_name.${currentPlayer}`).css({'height': '100%'});
        $(`.player_info_container.${currentPlayer}`).css({'height': '0', 'opacity': '0'});

        $('.player1').removeClass('player1');
        var temp = playerArray.shift();
        playerArray.push(temp);
        var nextPlayer = playerArray[0];
        $(`#${nextPlayer}`).addClass('player1');

        $(`.players.${nextPlayer}`).css({'height': '50%'});
        $(`.player_name.${nextPlayer}`).css({'height': '18%'});
        $(`.player_info_container.${nextPlayer}`).css({'height': '85%', 'opacity': '1'});
    }

    showPlayerOne(name){
        if( $('.player1').attr('id') === name){
            $('.players').css('height', '50%');
            $('.player_name').css('height', '18%');
            $('.player_info_container').css({'height': '85%', 'opacity': '1'});
        }
    }

    payRent(){
        $('.option_button_1, .option_button_2').remove();
        var current_player=$('.player1').attr('id');
        var currentPosition = newGame.allPlayers[current_player].player_position;
        var currentColor = properties[currentPosition].color;
        var owner=properties[currentPosition].owner;
        if(properties[currentPosition].owned ===true){
            if(current_player === owner){
                $('.option').text(`You already own ${properties[currentPosition].name}.`);
            } else { 
                if(currentColor === 'white'){
                    var dice_one = Math.floor((Math.random() * 6) + 1);
                    var dice_two = Math.floor((Math.random() * 6) + 1);
                    var dice_roll = dice_one + dice_two;

                    var times4 = dice_roll * 4;
                    var times10 = dice_roll * 10;

                    if(newGame.allPlayers[owner].multipliers.white.length === 1){
                        if(times4 < newGame.allPlayers[current_player].balance){
                            $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${times4}!`);
                            newGame.allPlayers[owner].balance+= properties[currentPosition].times4;
                            newGame.allPlayers[current_player].balance-=properties[currentPosition].times4;
                        }
                    } else if(newGame.allPlayers[owner].multipliers.white.length === 2){
                        if(times10 < newGame.allPlayers[current_player].balance){
                            $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${times10}!`);
                            newGame.allPlayers[owner].balance+= properties[currentPosition].times10;
                            newGame.allPlayers[current_player].balance-=properties[currentPosition].times10;
                        }
                    }

                } else if(newGame.allPlayers[owner].multipliers[currentColor].length === 1 && properties[currentPosition].rent < newGame.allPlayers[current_player].balance){
                    $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${properties[currentPosition].rent}!`);
                    newGame.allPlayers[owner].balance+= properties[currentPosition].rent;
                    newGame.allPlayers[current_player].balance-=properties[currentPosition].rent;
                } else if(newGame.allPlayers[owner].multipliers[currentColor].length === 2){
                    if(currentColor === 'black'){
                        if(properties[currentPosition].railroadrent2 < newGame.allPlayers[current_player].balance){
                            $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${properties[currentPosition].railroadrent2}!`);
                            newGame.allPlayers[owner].balance+= properties[currentPosition].railroadrent2;
                            newGame.allPlayers[current_player].balance-=properties[currentPosition].railroadrent2;
                        }
                    } else if(currentColor === 'brown' || currentColor === 'blue'){
                        if(properties[currentPosition].monopolyRent < newGame.allPlayers[current_player].balance){
                            $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${properties[currentPosition].monopolyRent}!`);
                            newGame.allPlayers[owner].balance+= properties[currentPosition].monopolyRent;
                            newGame.allPlayers[current_player].balance-=properties[currentPosition].monopolyRent;
                        }
                    }
                } else if(newGame.allPlayers[owner].multipliers[currentColor].length === 3 && properties[currentPosition].monopolyRent < newGame.allPlayers[current_player].balance){
                    $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${properties[currentPosition].monopolyRent}!`);
                    newGame.allPlayers[owner].balance+= properties[currentPosition].monopolyRent;
                    newGame.allPlayers[current_player].balance-=properties[currentPosition].monopolyRent;
                } else if(newGame.allPlayers[owner].multipliers.black.length === 4 && properties[currentPosition].railroadrent4 < newGame.allPlayers[current_player].balance){
                    $('.option').text(`${properties[currentPosition].name} is owned by ${owner}. Pay them $${properties[currentPosition].railroadrent4}!`);
                    newGame.allPlayers[owner].balance+= properties[currentPosition].railroadrent4;
                    newGame.allPlayers[current_player].balance-=properties[currentPosition].railroadrent4;
                } else if (properties[currentPosition].rent>newGame.allPlayers[current_player].balance) {
                    newGame.allPlayers[owner].balance+= newGame.allPlayers[current_player].balance;
                    newGame.allPlayers[current_player].balance=0;
                    this.playerLoses();
                }
            }
        }
        $(`.player_balance.${this.playerName}`).text(`$${this.balance}`);
        $(`.player_balance.${owner}`).text(`$${newGame.allPlayers[owner].balance}`);
        if(this.balance===0){
            this.playerLoses();
        }

        $('.options_modal').removeClass('hidden');
        var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
            $('.options_modal').addClass('hidden');
            $('.ok_button').remove();
        });
        $('.options_wrapper').append(ok_button);
    }

    sellProperty(){}

    checkProperty(){}

    playerLoses(){

        var player = $('.player1').attr('id');
        $('.options_modal').removeClass('hidden');
        $('.option').text( player +' you lost!');
        var ok_button = $('<button>').addClass('ok_button').text('OK').click(function(){
        $('.options_modal').addClass('hidden')});
        $('.options_wrapper').append(ok_button);
        $(ok_button).remove();
    }

    showDeed(){
        var propertyIndex = parseInt($(this).attr('class'));
        var currentProperty = properties[propertyIndex];

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
        var propertyIndex = parseInt($(this).attr('class'));
        var currentProperty = properties[propertyIndex];
        $('.deed_bar').removeClass(currentProperty.color);
    }
}
