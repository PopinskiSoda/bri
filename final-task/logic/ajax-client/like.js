import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {callHandlers} from './ajax-utils';

const likeURLstr = `${API_URL}/like`;

var likeOfferSuccessHandlers = [];

export function likeOfferSuccessRegister(handler, offerId) {
  likeOfferSuccessHandlers.push({handler, offerId});
}

export function likeOffer(options) {
  const {id} = options;
  const likeURL = options.likeURL || likeURLstr;
  const success = options.success || callHandlers(likeOfferSuccessHandlers, id);

  $.ajax(Object.assign({
    url: likeURL,
    type: 'POST',
    success: success,
    data: JSON.stringify({id})
  }, REQUEST_HEADERS));
}