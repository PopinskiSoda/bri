import Template from './index.handlebars';

export default class OfferCard {
  constructor(offer) {
    this._offer = offer;
  }

  render() {
    return Template(this._offer);
  }
}