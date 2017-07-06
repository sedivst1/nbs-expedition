'use strict';

exports.postItem = function(req, res) {
  exports.postItemIntern(req, res, null, null).then(
    function(result) {
      res.json(result);
    }, function(error) {
      res.json(error);
    }
  );
};

exports.postItemIntern = function(req, res, connectData, obj) {
  return new Promise(function(resolve, reject) {
    console.log('Item required!');
    /* returns how many items can be picked and packed */
    resolve({success: true, result: req.body[1]});
  });
};

exports.postOrder = function(req, res) {
  exports.postOrderIntern(req, res, null, null).then(
    function(result) {
      res.json(result);
    }, function(error) {
      res.json(error);
    }
  );
};

exports.postOrderIntern = function(req, res, connectData, obj) {
  return new Promise(function(resolve, reject) {
    console.log('Order Finished!');
    resolve({success: true, result: true});
  });
};


