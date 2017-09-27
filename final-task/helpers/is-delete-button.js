module.exports = function(options) {
  if (this.currentUser.id === this.user.id) {
    return options.fn(this);
  }
  return '';
};