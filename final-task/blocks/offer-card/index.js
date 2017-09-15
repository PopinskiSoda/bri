import Template from './index.handlebars';
import $ from 'jquery';

export default class OfferCard {
  constructor(offer, offerPopup) {
    this._$obj = null;
    this._offer = offer;
    this._offerPopup = offerPopup || null;
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

  _init() {
    var self = this;

    this._$obj.find('.offer-card__review-button').click(function(event) {console.log("review");});
    this._$obj.find('.offer-card__like-button').click(function(event) {console.log("like");});
    this._$obj.find('.offer-card__add-button').click(function(event) {console.log("add");});
    this._$obj.find('.offer-card__comment-button').click(function(event) {console.log("comment");});
    this._$obj.find('.offer-card__popup-button').click(function() {
      self._offerPopup.setOffer(self._offer);
      self._offerPopup.render();
      self._offerPopup.open();
    });
  }
}