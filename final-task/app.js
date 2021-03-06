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
      
      var popupBackground = new PopupBackground({
        $obj: $('.popup-background')
      });
      var offerPopup = new OfferPopup({
        $obj: $('.offer-popup')
      });
      var offersBar = new OffersBar({
        $obj: $('.offers-bar'),
        offerPopup
      });

      PopupBase.setPopupBackground(popupBackground);

      offersBar.render();
    }
  });

});