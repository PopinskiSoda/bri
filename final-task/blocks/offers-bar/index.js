import Template from './index.handlebars';
import $ from 'jquery';
import OfferCard from 'Blocks/offer-card';

export default class OffersBar {
  constructor($obj, options) {
    this._$obj = $obj;
    this._offers = options.offers || [];
    this._offerPopup = options.offerPopup || null;
  }

  addOffer(offer) {
    this._offers.push(offer);
  }

  // addOffers(offers) {
  //   for(let i; i<offers.length; i++) {
  //     this.addOffer(offers[i]);
  //   }
  // }
  
  setOffers(offers) {
    this._offers = offers;
  }

  render() {
    this._$obj.empty();

    console.log(this._offers);

    for(let i=0; i<this._offers.length; i++) {
      let offerCard = new OfferCard(this._offers[i], this._offerPopup);

      offerCard.render();
      offerCard.appendTo(this._$obj);
    }
  }
}