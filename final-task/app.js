import OffersBar from 'blocks/offers-bar';
import OfferPopup from 'blocks/offer-popup';
import PopupBackground from 'blocks/popup-background';
import PopupBase from 'logic/popup-base';
import Offer from 'logic/offer';
import $ from 'jquery';

$(document).ready(function() {

  var popupBackground = new PopupBackground($('.popup-background'));
  var offerPopup = new OfferPopup($('.offer-popup'));
  var offersBar = new OffersBar($('.offers-bar'), {
    offerPopup: offerPopup
  });

  PopupBase.setPopupBackground(popupBackground);

  offersBar.render();
});