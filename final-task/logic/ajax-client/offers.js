import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';

const offerURL = `${API_URL}/offers`;

export function getOffers(options) {
  const {onSuccess} = options;

  $.ajax(Object.assign({
    url: offerURL,
    type: 'GET',
    success: onSuccess
  }, REQUEST_HEADERS));
}

export function deleteOffer(options) {
  const {onSuccess, offerId, id} = options;

  $.ajax({
    url: offerURL,
    type: 'DELETE',
    success: onSuccess
  });
}
