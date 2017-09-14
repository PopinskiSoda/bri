import OffersBar from 'Blocks/offers-bar';
import OfferСard from 'Blocks/offer-card';
import OfferPopup from 'Blocks/offer-popup';
import PopupBackground from 'Blocks/popup-background';
import PopupBase from 'Logic/popup-base';
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
    imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
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
var offer = {
  user: {
    firstName: 'Rare',
    lastName: 'Parrot',
    imageURL: 'http://i.imgur.com/2czseQm.gif'
  },
  imageURL: 'https://nashzeleniymir.ru/wp-content/uploads/2016/03/%D0%9F%D0%BE%D0%BF%D1%83%D0%B3%D0%B0%D0%B9.jpg',
  comments: [
    {
      user: {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: 'http://i.imgur.com/2czseQm.gif'
      },
      text: 'Действие происходит в Зоне:'
    },
    {
      user: {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: 'http://i.imgur.com/2czseQm.gif'
      },
      text: 'Как-то в бар приходит Плоть, а в баре очередь, ну она встаёт за последним сталкером и ждёт.'
    }
  ],
  likedUsers: [
    {
      firstName: 'Rare',
      lastName: 'Parrot',
      imageURL: 'http://i.imgur.com/2czseQm.gif'
    },
    {
      firstName: 'Rare',
      lastName: 'Parrot',
      imageURL: 'http://i.imgur.com/2czseQm.gif'
    },
    {
      firstName: 'Rare',
      lastName: 'Parrot',
      imageURL: 'http://i.imgur.com/2czseQm.gif'
    },
  ],
  addedUsers: [
    {
      firstName: 'Rare',
      lastName: 'Parrot',
      imageURL: 'http://i.imgur.com/2czseQm.gif'
    },
    {
      firstName: 'Rare',
      lastName: 'Parrot',
      imageURL: 'http://i.imgur.com/2czseQm.gif'
    }
  ]
};

var popupBackground = new PopupBackground($('.popup-background'));
var offerPopup = new OfferPopup($('.offer-popup'));

PopupBase.setPopupBackground(popupBackground);

offerPopup.setOffer(offer);
offerPopup.render();
offerPopup.open();