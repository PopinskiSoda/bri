import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {likeOffer} from './like';

const addURL = `${API_URL}/add`;

export function addOffer(options) {
  let newOptions = Object.assign(options, {likeURL: addURL});
  likeOffer(newOptions);
}