import $ from 'jquery';
import OfferCard from 'blocks/offer-card';
import {
  getOffers,
  getOffersSuccessRegister,
  deleteOfferSuccessRegister
} from 'logic/ajax-client/offers';

export default class OffersBar {
  constructor(options) {
    this._$obj = options.$obj || $('<div>').addClass('offers-bar');

    this._offers = options.offers || [];
    this._offerPopup = options.offerPopup || null;
    this._offerCards = [];
    this._columnsAmount = options.columnsAmount || 4;

    for (let i = 0; i < this._columnsAmount; i++) {
      this._$obj.append(
        $('<div>').addClass('offers-bar__column')
      );
    }

    this._handleCommentsButton = this._handleCommentsButton.bind(this);
    this._handleGetOffersSuccess = this._handleGetOffersSuccess.bind(this);
    this._handleDeleteOfferSuccess = this._handleDeleteOfferSuccess.bind(this);
  }

  addOfferCard(offer) {
    var offerCard = new OfferCard({
      offer,
      offerPopup: this._offerPopup,
      handleCommentsButton: this._handleCommentsButton
    });

    this._offerCards.push(offerCard);

    return offerCard;
  }

  _handleDeleteOfferSuccess(newOffers) {
    this._offers = newOffers;
    this.renderOfferCards();
  }

  _renderOfferCard(offer, columnIndex) {
    var offerCard = this.addOfferCard(offer);
    var $column = this._$obj.children().eq(columnIndex);
    
    offerCard.render();
    offerCard.appendTo($column);
  }

  renderOfferCards() {
    this._$obj.children().empty();

    for(let i=0; i<this._offers.length; i++) {
      this._renderOfferCard(this._offers[i], i % this._columnsAmount);
    }
  }

  render() {
    this._init();
  }

  _handleCommentsButton(targetCommentsBar) {
    for(let i=0; i<this._offerCards.length; i++) {
      let offerCard = this._offerCards[i];
      offerCard.hideCommentsBar();
    }
    
    targetCommentsBar.show();
    targetCommentsBar.focus();
  }

  _handleGetOffersSuccess(offers) {
    this._offers = offers;
    this.renderOfferCards();
  }

  _init() {
    getOffersSuccessRegister(this._handleGetOffersSuccess);
    deleteOfferSuccessRegister(this._handleDeleteOfferSuccess);
    getOffers();
  }
}