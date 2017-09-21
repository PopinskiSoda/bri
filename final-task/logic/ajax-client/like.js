import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';

const likeURLstr = `${API_URL}/like`;

export function likeOffer(options) {
  const {id, onSuccess} = options;
  const likeURL = options.likeURL || likeURLstr;

  $.ajax(Object.assign({
    url: likeURL,
    type: 'POST',
    success: onSuccess,
    data: JSON.stringify({id})
  }, REQUEST_HEADERS));
}