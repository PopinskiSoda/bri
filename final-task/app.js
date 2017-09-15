import OffersBar from 'Blocks/offers-bar';
import OfferPopup from 'Blocks/offer-popup';
import PopupBackground from 'Blocks/popup-background';
import PopupBase from 'Logic/popup-base';
import Offer from 'Logic/offer';
import $ from 'jquery';

const OFFERS = [
  {
    user: {
      firstName: 'Rare',
      lastName: 'Parrot',
      imageURL: 'https://s-media-cache-ak0.pinimg.com/originals/ed/ba/02/edba02290dd897bd740647beb82f6e0b.gif'
    },
    title: 'Отпуск с семьей на море',
    category: 'Отдых и путешествия',
    imageURL: 'https://i.pinimg.com/originals/87/9d/55/879d5517eb7c548f247c2cee5174e0e4.jpg',
    text: `Действие происходит в Зоне: Как-то в бар приходит Плоть, а в баре очередь, ну она встаёт за последним сталкером и ждёт. Спустя пару минут заходит долговец и спрашивает:
-Кто крайний?
Плоть отвечает, что она.
Бармен поперхнулся и умер.`,
    comments: [
      {
        user: {
          firstName: 'Rare',
          lastName: 'Parrot',
          imageURL: '../images/avatars/1.jpg'
        },
        text: 'Действие происходит в Зоне:'
      },
      {
        user: {
          firstName: 'Rare',
          lastName: 'Parrot',
          imageURL: '../images/avatars/2.jpg'
        },
        text: 'Как-то в бар приходит Плоть, а в баре очередь, ну она встаёт за последним сталкером и ждёт.'
      }
    ],
    likedUsers: [
      {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: '../images/avatars/3.jpg'
      },
      {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: '../images/avatars/4.jpg'
      },
      {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: '../images/avatars/5.jpg'
      },
    ],
    addedUsers: [
      {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: '../images/avatars/6.jpg'
      },
      {
        firstName: 'Rare',
        lastName: 'Parrot',
        imageURL: '../images/avatars/7.jpg'
      }
    ]
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

for(let i=0; i<OFFERS.length; i++) {
  OFFERS[i] = new Offer(OFFERS[i]);
}

// var offersBar = new OffersBar(OFFERS);
// console.log(offersBar.render());

// var offerCard = new OfferСard(OFFERS[0]);

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
var offersBar = new OffersBar($('.offers-bar'), {
  offers: OFFERS,
  offerPopup: offerPopup
});

PopupBase.setPopupBackground(popupBackground);

offersBar.render();
// offerPopup.setOffer(offer);
// offerPopup.open();
// offerPopup.render();