import Template from './index.handlebars';

export default class OfferPopup {
  constructor(offer) {
    this._offer = offer;
  }
  // 
  render() {
    return Template(this._offer);
  }
}