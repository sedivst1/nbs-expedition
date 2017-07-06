'use strict';

let items =
  [
    {
      id: 2,
      productAttachmentUrl: 'https://i.alza.cz/ImgW.ashx?fd=f3&cd=RO212z6c2a',
    },
    {
      id: 4,
      productAttachmentUrl: 'https://i.alza.cz/ImgW.ashx?fd=f3&cd=YEE021e',
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

    for (let i = 0; i < items.length; i++) {
      if (items[i].id.toString() === req.params.id) {
        resolve({success: true, result: items[i]});
        break;
      }
    }
    reject({success: false, result: items});
  });
};
