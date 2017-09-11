import OffersBar from 'Blocks/offers-bar';
import OfferСard from 'Blocks/offer-card';
import OfferPopup from 'Blocks/offer-popup';
import PopupBackground from 'Blocks/popup-background';
import $ from 'jquery';

const OFFERS = [
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: 'Попугай',
    category: 'Зверь',
    timespan: 'Актуально',
    location: 'Зоопарк',
    likedAmount: 12,
    addedAmount: 1
  },
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: 'Попугай',
    category: 'Зверь',
    timespan: 'Актуально',
    location: 'Зоопарк',
    likedAmount: 12,
    addedAmount: 1
  },
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageURL: 'http://i.imgur.com/2czseQm.gif',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
];

var offersBar = new OffersBar(OFFERS);
// console.log(offersBar.render());

var offerCard = new OfferСard(OFFERS[0]);

// console.log(offerCard.render());
var offerPopup = new OfferPopup({
  firstName: 'Rare',
  lastName: 'Parrot',
  imageURL: 'http://i.imgur.com/2czseQm.gif'}
);
var popupBackground = new PopupBackground();

$('body')
  .append(offersBar.render())
  .append(popupBackground.render())
  .append(offerPopup.render());

// $('.grid').masonry({
//   itemSelector: '.item',
//   columnWidth: '222px'
// });
  // $('<div>')
  //   .addClass('offers-bar')
  //   .append(offerCard.render())
