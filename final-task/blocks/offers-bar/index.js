import Template from './index.handlebars';

// export default function(){
//   console.log(Template({
//     offers: [
//       {
//         imageSrc: '',
//         title: '',
//         category: '',
//         timespan: '',
//         location: '',
//         likedAmount: 0,
//         addedAmount: 0
//       }
//     ]
//   }));
// }

export default class OffersBar {
  constructor(offers) {
    this._offers = offers || [];
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
    return Template({
      offers: this._offers
    });
  }
}