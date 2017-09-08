import OffersBar from 'Blocks/offers-bar';
import OfferСard from 'Blocks/offer-card';
import OfferPopup from 'Blocks/offer-popup';
import PopupBackground from 'Blocks/popup-background';
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
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
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
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
    title: '3',
    category: '4',
    timespan: '5',
    location: '6',
    likedAmount: 0,
    addedAmount: 0
  },
  {
    imageSrc: 'http://wallpaper-gallery.net/images/image/image-3.jpg',
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
var offerPopup = new OfferPopup();
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
