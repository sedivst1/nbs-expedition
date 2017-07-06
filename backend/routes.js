'use strict';

let users = require('./users'),
    invoices = require('./dispatch_lists'),
    items = require('./items'),
    itemsPicture = require('./items-picture'),
    serverCallbacks = require('./serverCallbacks');


module.exports = function (app) {
  app.get('/api/user_ex_id/:id', users.get);
  app.get('/api/dispatch_lists/:id', invoices.get);
  app.get('/api/items/:dispatchId', items.get);
  app.get('/api/items-picture/:id', itemsPicture.get);

  app.post('/api/serverCallback/itemRequired', serverCallbacks.postItem);
  app.post('/api/serverCallback/orderFinished', serverCallbacks.postOrder);
};
