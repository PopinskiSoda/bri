import Template from './index.handlebars';
import $ from 'jquery';

export default class Counter {
   
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('counter');
    this._amount = options.amount || 0;
    this._title = options.title || '';
    this._declinedTitle = options.declinedTitle || '';
    this._declinedPluralTitle = options.declinedPluralTitle || '';
    this._classes = options.classes || '';
  }

  _declineTitle(amount) {
    if ((amount === 1) || (amount > 20 && amount % 10 === 1) || !this._declinedTitle || !this._declinedPluralTitle) {
      return this._title;
    }
    if ((amount >= 2 && amount <= 4) || (amount > 20 && amount % 10 >= 2 && amount % 10 <= 4)) {
      return this._declinedTitle;
    }
    return this._declinedPluralTitle;
  }

  appendTo($parent) {
    this._$obj.appendTo($parent);
  }

  setAmount(amount) {
    this._amount = amount;
  }

  render() {
    var $newObj = $(Template({
      amount: this._amount,
      title: this._declineTitle(this._amount),
      classes: this._classes,
      hidden: !this._amount
    }));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
  }
}