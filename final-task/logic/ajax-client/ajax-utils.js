export function callHandlers(handlers, offerId) {
  return function(data) {
    var filteredHandlers;

    if (offerId !== undefined) {
      filteredHandlers = handlers.filter(function(obj) {
        return obj.offerId === offerId;
      });
    }
    else {
      filteredHandlers = handlers;
    }

    for (let i=0; i<filteredHandlers.length; i++) {
      let handler = filteredHandlers[i].handler;
      handler(data);
    }
  };
}