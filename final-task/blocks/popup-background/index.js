import Template from './index.handlebars';

export default class PopupBackground {
  
  constructor($obj) {
    this._$obj = $obj;
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