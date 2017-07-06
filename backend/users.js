'use strict';

let users =
  [
    {
      id: '123',
      firstName: "John",
      lastName: "Doe",
      type: 0
    },
    {
      id: '456',
      firstName: "Alex",
      lastName: "Foo",
      type: 1
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

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === req.params.id) {
        resolve({success: true, result: users[i]});
        break;
      }
    }
    reject({success: false, result: users});
  });
};
