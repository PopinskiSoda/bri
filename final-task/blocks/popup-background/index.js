import Template from './index.handlebars';

export default class PopupBackground {
  
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('popup-background');
  }

  show() {
    this._$obj.removeClass('popup-background--hidden');
  }

  hide() {
    this._$obj.addClass('popup-background--hidden');
  }

  render() {
    return Template({});
  }
}