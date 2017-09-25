import Template from './index.handlebars';
import $ from 'jquery';
import OfferCard from 'blocks/offer-card';
import {
  getOffers,
  getOffersSuccessRegister,
  deleteOfferSuccessRegister
} from 'logic/ajax-client/offers';

export default class OffersBar {
  constructor($obj, options) {
    this._$obj = $obj || $('<div>').addClass('offers-bar');

    this._offers = options && options.offers || [];
    this._offerPopup = options && options.offerPopup || null;
    this._offerCards = [];

    this._handleCommentsButton = this._handleCommentsButton.bind(this);
    this._handleGetOffersSuccess = this._handleGetOffersSuccess.bind(this);
    this._handleDeleteOfferSuccess = this._handleDeleteOfferSuccess.bind(this);
  }

  addOfferCard(offer) {
    let $offerCard = $('<div>').addClass('offer-card');

    let offerCard = new OfferCard($offerCard, {
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

  renderOfferCard(offer) {
    let offerCard = this.addOfferCard(offer);

    offerCard.render();
    offerCard.appendTo(this._$obj);
  }

  renderOfferCards() {
    this._$obj.empty();

    for(let i=0; i<this._offers.length; i++) {
      this.renderOfferCard(this._offers[i]);
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