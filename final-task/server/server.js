const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.join(__dirname, '..', 'public');
const OFFERS_FILENAME = path.join(__dirname, 'offers.json');
const USERS_FILENAME = path.join(__dirname, 'users.json');

const PORT = 3000;

const MAX_COMMENTS_PER_RESPONSE = 5;
const MAX_REVIEWS_PER_RESPONSE = 3;

const CURRENT_USER_ID = 1;

const app = express();

app.use(express.static(ROOT_DIR));
app.use(bodyParser.json());

var offers = JSON.parse(fs.readFileSync(OFFERS_FILENAME, 'utf8'));
var users = JSON.parse(fs.readFileSync(USERS_FILENAME, 'utf8'));

function getMaxId(array) {
  return Math.max.apply(null, array.map(function(item) {
    return item.id || 0;
  }));
}

function pushItemWithId(array, item) {
  var maxId = getMaxId(array);
  var newId = 0;

  if (maxId >= 0) {
    newId = maxId + 1;
  }

  array.push(Object.assign(item, {
    id: newId
  }));
}

function getItemById(array, id) {
  return array.find(function(item) {
    return item.id == id;
  });
}

function getUserById(id) {
  return getItemById(users, id);
}

function getOfferById(id) {
  return getItemById(offers, id);
}

function getTopReviews(offer) {
  return {
    reviews: offer.reviews.slice(-MAX_REVIEWS_PER_RESPONSE),
    total: offer.reviews.length
  };
}

function getTopComments(offer) {
  return {
    comments: offer.comments.slice(-MAX_COMMENTS_PER_RESPONSE),
    total: offer.comments.length
  };
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

    pushItemWithId(offer.comments, Object.assign(comment, {
      user: getUserById(CURRENT_USER_ID)
    }));

    res.status(201).json(getTopComments(offer));
  })
  .delete(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    
    offer.comments = offer.comments.filter(function(comment) {
      return comment.id !== req.body.id;
    });
    res.status(200).json(getTopComments(offer));
  });

app.route('/api/reviews')
  .get(function(req, res) {
    let offer = getOfferById(req.query.offerId);

    res.status(200).json(getTopReviews(offer));
  })
  .post(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    let review = req.body.review

    pushItemWithId(offer.reviews, Object.assign(review, {
      user: getUserById(CURRENT_USER_ID)
    }));

    res.status(201).json(getTopReviews(offer));
  })
  .delete(function(req, res) {
    let offer = getOfferById(req.body.offerId);
    offer.reviews = offer.reviews.filter(function(review) {
      return review.id !== req.body.id;
    });
    res.status(200).json(getTopReviews(offer));
  });

app.route('/api/offers')
  .get(function(req, res) {
    res.status(200).json(offers);
  })
  .delete(function(req, res) {
    offers = offers.filter(function(offer) {
      return offer.id !== req.body.id;
    });
    res.status(200).json(offers);
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