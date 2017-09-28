module.exports = function(block) {
  if (this.hidden) {
    return block + '--hidden';
  }
  return '';
};