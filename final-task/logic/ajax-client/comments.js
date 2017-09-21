import $ from 'jquery';
import {API_URL} from 'configs/constants';
import REQUEST_HEADERS from '../request-headers';

const commentsURLstr = `${API_URL}/comments`;

export function getComments(options) {
  const {onSuccess, offerId} = options;
  const commentsURL = options.commentsURL || commentsURLstr;

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'GET',
    success: onSuccess,
    data: {
      offerId
    }
  }, REQUEST_HEADERS));
}

export function addComment(options) {
  const {onSuccess, comment, offerId} = options;
  const commentsURL = options.commentsURL || commentsURLstr;

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'POST',
    success: onSuccess,
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
  const {onSuccess, offerId, id} = options;
  const commentsURL = options.commentsURL || commentsURLstr;

  $.ajax({
    url: commentsURL,
    type: 'DELETE',
    success: onSuccess
  });
}
