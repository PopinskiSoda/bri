// import OffersBar from 'Blocks/offers-bar';
import OfferСard from 'Blocks/offer-card';
import $ from 'jquery';

const OFFERS = [
  {
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
    title: 'Попугай',
    category: 'Зверь',
    timespan: 'Актуально',
    location: 'Зоопарк',
    likedAmount: 12,
    addedAmount: 1
  },
  {
    imageSrc: '2',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  }
];

// var offersBar = new OffersBar(OFFERS);
// console.log(offersBar.render());

var offerCard = new OfferСard(OFFERS[0]);

// console.log(offerCard.render());

$('body').append(
  $('<div>')
    .addClass('offers-bar')
    .append(offerCard.render())
);
