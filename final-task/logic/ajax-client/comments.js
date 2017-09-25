import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';
import {callHandlers} from './ajax-utils';

const commentsURLstr = `${API_URL}/comments`;

var
  getCommentsSuccessHandlers = [],
  addCommentSuccessHandlers = [],
  deleteCommentSuccessHandlers = [];

var offers = {};

export function getCommentsSuccessRegister(handler, offerId) {
  getCommentsSuccessHandlers.push({handler, offerId});
}

export function addCommentSuccessRegister(handler, offerId) {
  addCommentSuccessHandlers.push({handler, offerId});
}

export function deleteCommentSuccessRegister(handler, offerId) {
  deleteCommentSuccessHandlers.push({handler, offerId});
}

export function getComments(options) {
  const {offerId} = options;
  const commentsURL = options.commentsURL || commentsURLstr;

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'GET',
    success: callHandlers(getCommentsSuccessHandlers, offerId),
    data: {
      offerId
    }
  }, REQUEST_HEADERS));
}

export function addComment(options) {
  const {comment, offerId} = options;
  const commentsURL = options.commentsURL || commentsURLstr;

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'POST',
    success: callHandlers(addCommentSuccessHandlers, offerId),
    data: JSON.stringify({
      comment: {
        text: comment.text,
        user: comment.user
      },
      offerId
    })
  }, REQUEST_HEADERS));
}

export function deleteComment(options) {
  const {offerId, id} = options;
  const commentsURL = options.commentsURL || commentsURLstr;

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'DELETE',
    success: callHandlers(deleteCommentSuccessHandlers, offerId),
    data: JSON.stringify({
      offerId,
      id
    })
  }, REQUEST_HEADERS));
}
