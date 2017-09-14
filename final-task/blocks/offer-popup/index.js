import Template from './index.handlebars';
import $ from 'jquery';
import PopupBase from 'Logic/popup-base';
import CommentsBar from 'Blocks/comments-bar';

export default class OfferPopup extends PopupBase {
  constructor($obj, offer) {
    super();
    this._$obj = $obj;
    this._$closeButton = null;
    this._$commentsBar = null;
    this._offer = offer || null;
  }

  setOffer(offer) {
    this._offer = offer;
  }

  open() {
    super.open();
    this._$obj.removeClass('offer-popup--hidden');
  }

  close() {
    super.close();
    this._$obj.addClass('offer-popup--hidden');
  }

  render() {
    var $newObj = $(Template(this._offer));

    this._$obj.replaceWith($newObj);
    this._$obj = $newObj;
    this._init();
  }

  renderCommentsBar() {
  }

  _init() {
    this._$closeButton = this._$obj.find('.button--close');
    this._$closeButton.click(this.close.bind(this));
    this._$commentsBar = this._$obj.find('.comments-bar');
  }
}