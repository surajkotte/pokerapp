export class DataProvider {
  StartingChipsCount = 0;
  EndingChipsCount = 0;
  StartingMoney = 0;
  EndingMoney = 0;
  oneBuyInToChips = 0;
  oneBuyInToDoller = 0;
  oneChipCost = 0;
  DataObject = [];
  positiveBal = [];
  negativeBal = [];
  data1 = [];
  constructor(DataObject = [], oneBuyInToChips, oneBuyInToDoller, oneChipCost) {
    this.DataObject = DataObject;
    this.oneBuyInToChips = oneBuyInToChips;
    this.oneBuyInToDoller = oneBuyInToDoller;
    this.oneChipCost = oneChipCost;
  }
  calculateData() {
    this.DataObject.map((Item) => {
      var StartingChips = Item.startingBuyIn * this.oneBuyInToChips;
      this.StartingChipsCount += StartingChips;
      this.EndingChipsCount += parseInt(Item.endingBid);
      var Money = Item.startingBuyIn * this.oneBuyInToDoller;
      this.StartingMoney += Money;
      var onechipscost = this.oneChipCost;
      var profitorloss = Math.abs(Money - Item.endingBid * this.oneChipCost);
      this.EndingMoney += profitorloss;
      if (StartingChips > Item.endingBid) {
        profitorloss = "-" + profitorloss;
      }
      if (profitorloss < 0) {
        this.negativeBal.push({
          name: Item.name,
          money: Math.abs(profitorloss),
        });
      } else if (profitorloss > 0) {
        this.positiveBal.push({
          name: Item.name,
          money: Math.abs(profitorloss),
        });
      }
    });
  }
  calculateAdjustmentData() {
    this.SortPositiveBal();
    this.SortPositiveBal();
    var i = 0,
      j = 0;
    if (this.positiveBal.length > 0 && this.negativeBal.length > 0) {
      while (i < this.positiveBal.length || j < this.negativeBal.length) {
        if (this.negativeBal[j].money < this.positiveBal[i].money) {
          this.data1.push({
            from: this.negativeBal[j].name,
            to: this.positiveBal[i].name,
            Amount: this.negativeBal[j].money,
          });
          this.positiveBal[i].money -= this.negativeBal[j].money;
          j++;
        } else if (this.negativeBal[j].money == this.positiveBal[i].money) {
          this.data1.push({
            from: this.negativeBal[j].name,
            to: this.positiveBal[i].name,
            Amount: this.positiveBal[i].money,
          });
          this.positiveBal[i].money -= this.negativeBal[j].money;
          i++;
          j++;
        } else {
          this.data1.push({
            from: this.negativeBal[j].name,
            to: this.positiveBal[i].name,
            Amount: this.positiveBal[i].money,
          });
          this.negativeBal[j].money =
            this.negativeBal[j].money - this.positiveBal[i].money;
          i++;
        }
      }
    }
  }
  GetStartingMoney() {
    return this.StartingMoney;
  }
  GetEndingMoney() {
    return this.EndingMoney;
  }
  GetStartingChipsCount() {
    return this.StartingChipsCount;
  }
  GetEndingChpisCount() {
    return this.EndingChipsCount;
  }
  GetPositiveBal() {
    return this.positiveBal;
  }
  GetNegativeBal() {
    return this.negativeBal;
  }
  GetAdjustedData() {
    return this.data1;
  }
  SortPositiveBal() {
    this.positiveBal = this.positiveBal.sort(function (a, b) {
      return b.money - a.money;
    });
  }
  SortNegativeBal() {
    this.negativeBal = this.negativeBal.sort(function (a, b) {
      return b.money - a.money;
    });
  }
}
