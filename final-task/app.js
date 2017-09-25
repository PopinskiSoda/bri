import OffersBar from 'blocks/offers-bar';
import OfferPopup from 'blocks/offer-popup';
import PopupBackground from 'blocks/popup-background';
import PopupBase from 'logic/popup-base';
import Offer from 'logic/offer';
import {loginKindOf} from 'logic/auth';
import $ from 'jquery';

$(document).ready(function() {

  loginKindOf({
    onSuccess: function(user) {
      
      var popupBackground = new PopupBackground($('.popup-background'));
      var offerPopup = new OfferPopup({
        $obj: $('.offer-popup'),
        onDeleteOffer: function(id) {
          offersBar.deleteOffer(id);
        }
      });
      var offersBar = new OffersBar($('.offers-bar'), {
        offerPopup
      });

      PopupBase.setPopupBackground(popupBackground);

      offersBar.render();
    }
  });

});