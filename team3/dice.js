class DiceRoll {
	constructor() {
		this.diceValue = 0;
	}

	rollDice() {
		this.diceValue = Math.floor((Math.random() * 1) + 1);
		return this.diceValue;
	}
}