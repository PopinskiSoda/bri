import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {callHandlers} from './ajax-utils';
import {likeOffer} from './like';

const addURL = `${API_URL}/add`;

var addOfferSuccessHandlers = [];

export function addOfferSuccessRegister(handler, offerId) {
  addOfferSuccessHandlers.push({handler, offerId});
}

export function addOffer(options) {
  let newOptions = Object.assign(options, {
    likeURL: addURL,
    success: callHandlers(addOfferSuccessHandlers, options.id)
  });
  likeOffer(newOptions);
}