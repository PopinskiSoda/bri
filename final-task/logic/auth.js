import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from './request-headers';

const currentUserURL = `${API_URL}/currentUser`;

var currentUser;

export function loginKindOf(options) {
  const {onSuccess} = options;

  $.ajax(Object.assign({
    url: currentUserURL,
    type: 'GET',
    success: function(user) {
      currentUser = user;
      onSuccess(user);
    }
  }, REQUEST_HEADERS));
}

export function getCurrentUser() {
  return currentUser;
}