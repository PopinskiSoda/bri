const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.join(__dirname, '..', 'public');
const OFFERS_FILENAME = path.join(__dirname, 'offers.json');
const USERS_FILENAME = path.join(__dirname, 'users.json');

const PORT = 3000;

const MAX_COMMENTS_PER_RESPONCE = 5;
const MAX_REVIEWS_PER_RESPONCE = 3;

const CURRENT_USER_ID = 1;

const app = express();

app.use(express.static(ROOT_DIR));
app.use(bodyParser.json());

var offers = JSON.parse(fs.readFileSync(OFFERS_FILENAME, 'utf8'));
var users = JSON.parse(fs.readFileSync(USERS_FILENAME, 'utf8'));

function getOfferById(id) {
  return offers.find(function(offer) {
    return offer.id == id;
  });
}

function getUserById(id) {
  return users.find(function(user) {
    return user.id == id;
  });
}

function getTopReviews(offer) {
  return offer.reviews.slice(-MAX_REVIEWS_PER_RESPONCE);
}

function getTopComments(offer) {
  return offer.comments.slice(-MAX_COMMENTS_PER_RESPONCE);
}

function containsCurrentUser(array) {
  return array.find(function(user) {
    return user.id === CURRENT_USER_ID;
  });
}

app.route('/api/comments')
  .get(function(req, res) {
    let offer = getOfferById(req.query.offerId);

    res.status(200).json(getTopComments(offer));
  })
  .post(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    let comment = req.body.comment

    offer.comments.push(Object.assign(comment, {
      user: getUserById(CURRENT_USER_ID)
    }));

    res.status(201).json(getTopComments(offer));
  })
  .delete(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    offer.comments.filter(function(comment) {
      comment.id !== req.body.id;
    });
  });

app.route('/api/reviews')
  .get(function(req, res) {
    let offer = getOfferById(req.query.offerId);

    res.status(200).json(getTopReviews(offer));
  })
  .post(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    let review = req.body.review

    offer.reviews.push(Object.assign(review, {
      user: getUserById(CURRENT_USER_ID)
    }));

    res.status(201).json(getTopReviews(offer));
  })
  .delete(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    offer.reviews.filter(function(review) {
      review.id !== req.body.id;
    });
  });

app.route('/api/offers')
  .get(function(req, res) {
    res.status(200).json(offers);
  })
  .delete(function(req, res) {
    offers = offers.filter(function(offer) {
      offer.id !== req.body.id;
    });
  });

app.route('/api/like')
  .post(function(req, res) {
    let offer = getOfferById(req.body.id);

    if (containsCurrentUser(offer.likedUsers)) {
      res.status(200).json(offer.likedUsers);
      return;
    }

    offer.likedUsers.push(getUserById(CURRENT_USER_ID));
    res.status(201).json(offer.likedUsers);
  });

app.route('/api/add')
  .post(function(req, res) {
    let offer = getOfferById(req.body.id);

    if (containsCurrentUser(offer.addedUsers)) {
      res.status(200).json(offer.addedUsers);
      return;
    }

    offer.addedUsers.push(getUserById(CURRENT_USER_ID));
    res.status(201).json(offer.addedUsers);
  });

app.route('/api/currentUser')
  .get(function(req, res) {
    res.status(200).json(getUserById(CURRENT_USER_ID));
  });

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});