import $ from 'jquery';
import {API_URL} from 'Configs/constants';
import REQUEST_HEADERS from './request-headers';

const commentsURL = `${API_URL}/comments`;

export function getComments(options) {
  const {onSuccess, offerId} = options;

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'GET',
    success: options.onSuccess,
    data: {
      offerId: options.offerId
    }
  }, REQUEST_HEADERS));
}

export function addComment(options) {
  const {onSuccess, comment, offerId} = options;

  console.log(comment);

  $.ajax(Object.assign({
    url: commentsURL,
    type: 'POST',
    success: onSuccess,
    data: JSON.stringify({
      comment: {
        text: comment.getText(),
        user: comment.getUser()
      },
      offerId
    })
  }, REQUEST_HEADERS));
}

export function deleteComment(offerId, commentId, onSuccess) {
  $.ajax({
    url: commentsURL,
    type: 'DELETE',
    success: onSuccess
  });
}
