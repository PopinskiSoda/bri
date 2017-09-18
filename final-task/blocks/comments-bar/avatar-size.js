export default function(partial) {
  var context = {};

  if (this.modifier === 'popup') {
    context.size = 'medium';
  }

  if (this.modifier === 'card') {
    context.size = 'small';
  }
  
  return partial.fn(context);
}