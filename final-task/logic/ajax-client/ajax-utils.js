export function callHandlers(handlers, offerId) {
  return function(data) {
    var filteredHandlers;

    if (offerId !== undefined) {
      filteredHandlers = handlers.filter(function(obj) {                // Хотим вызвать все хэндлеры кроме тех
        return obj.offerId === offerId || obj.offerId === undefined;    // у которых другой id
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