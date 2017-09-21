module.exports = function(usersArray) {
  var isContainsCurrentUser = usersArray.find(function(user) {
    return user.id === this.currentUser.id;
  }, this);

  return isContainsCurrentUser ? 'disabled' : '';
};