module.exports = function(items, columnsAmount, options) {
  var columns = [];

  for (var j = 0; j < columnsAmount; j++) {
    columns.push([]);
  }

  var i = 0;

  while (i < items.length) {
    for (j = 0; j < columnsAmount; j++) {
      columns[j].push(options.fn(item[i + j]));
    }

    i += columnsAmount;
  }

  var result = '';

  for (j = 0; j < columnsAmount; j++) {
    result = result + '<div class="column">' + columns[j].join('') + '</div>';
  }

  console.log(result);

  return result;
};