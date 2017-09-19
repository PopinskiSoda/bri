import Template from './index.handlebars';
import CommentsBar from 'Blocks/comments-bar';
import $ from 'jquery';

export default class OfferCard {
  constructor(offer, offerPopup) {
    this._$obj = null;

    this._offer = offer;
    this._offerPopup = offerPopup || null;
    this._commentsBar = null;

    this._handlePopup = this._handlePopup.bind(this);
  }

  appendTo($parent) {
    this._$obj.appendTo($parent);
  }

  render() {
    var $newObj = $(Template(this._offer));

    if (this._$obj) {
      this._$obj.replaceWith($newOffer);
    }
    this._$obj = $newObj;
    this._init();
  }

  renderCommentsBar() {
    this._commentsBar.render();
  }

  renderComments() {
    this._commentsBar.renderComments();
  }

  _handlePopup() {
    this._offerPopup.setOffer(this._offer);
    this._offerPopup.render();
    this._offerPopup.open();
  }

  _init() {
    var $commentsBar = this._$obj.find('.comments-bar');

    this._commentsBar = new CommentsBar($commentsBar, {
      modifier: 'card'
    });

    this._commentsBar.render();

    this._$obj.find('.offer-card__review-button').click(function(event) {console.log("review");});
    this._$obj.find('.offer-card__like-button').click(function(event) {console.log("like");});
    this._$obj.find('.offer-card__add-button').click(function(event) {console.log("add");});
    this._$obj.find('.offer-card__comment-button').click(function(event) {console.log("comment");});
    this._$obj.find('.offer-card__popup-button').click(this._handlePopup);
  }
}