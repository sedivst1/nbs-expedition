'use strict';

let invoices =
  [
    {
      id: 1000,
      productsId: 1,
      customerName: "Connor McDavid",
      code1: "VF1-123456/2017",
      code2: "76302/1",
    },
    {
      id: 1001,
      productsId: 2,
      customerName: "Brad Marchand",
      code1: "VF2-234567/2017",
      code2: "76302/2",
    }
  ];

exports.get = function(req, res) {
  exports.getIntern(req, res, null, null).then(
    function(result) {
      res.json(result);
    }, function(error) {
      res.json(error);
    }
  );
};

exports.getIntern = function(req, res, connectData, obj) {
  return new Promise(function(resolve, reject) {

    for (let i = 0; i < invoices.length; i++) {
      if (invoices[i].id.toString() === req.params.id) {
        resolve({success: true, result: invoices[i]});
        break;
      }
    }
    reject({success: false, result: invoices});
  });
};
