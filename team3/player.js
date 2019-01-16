class Player{
    constructor(balance){
        this.balance=balance;
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