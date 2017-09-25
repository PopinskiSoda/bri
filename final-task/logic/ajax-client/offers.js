import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {callHandlers} from './ajax-utils';

const offerURL = `${API_URL}/offers`;

var
  getOffersSuccessHandlers = [],
  deleteOfferSuccessHandlers = [];

export function getOffersSuccessRegister(handler) {
  getOffersSuccessHandlers.push({handler});
}

export function deleteOfferSuccessRegister(handler, offerId) {
  deleteOfferSuccessHandlers.push({handler, offerId});
}

export function getOffers() {
  $.ajax(Object.assign({
    url: offerURL,
    type: 'GET',
    success: callHandlers(getOffersSuccessHandlers), 
  }, REQUEST_HEADERS));
}

export function deleteOffer(options) {
  const {id} = options;

  $.ajax(Object.assign({
    url: offerURL,
    type: 'DELETE',
    success: callHandlers(deleteOfferSuccessHandlers, offerId),
    data: JSON.stringify({id})
  }, REQUEST_HEADERS));
}
