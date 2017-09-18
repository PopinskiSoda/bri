import Template from './index.handlebars';
import $ from 'jquery';
import PopupBase from 'Logic/popup-base';
import CommentsBar from 'Blocks/comments-bar';

export default class OfferPopup extends PopupBase {
  constructor($obj, offer) {
    super();

    this._$obj = $obj;
    this._$closeButton = null;

    this._offer = offer || null;
    this._commentsBar = null;
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
    this._commentsBar.render({
      modifier: 'popup'
    });
  }

  renderComments() {
    this._commentsBar.renderComments();
  }

  _init() {
    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar($commentsBar);
    this._commentsBar.render();

    this._$closeButton = this._$obj.find('.button--close');
    this._$closeButton.click(this.close.bind(this));
  }
}