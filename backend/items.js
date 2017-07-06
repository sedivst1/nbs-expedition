'use strict';

let items =
  [
    {
      id: 1,
      dispatchListId: 1000,
      productBarcode: '11',
      productCode: 'C189-5',
      productName: 'ADATA USB-C - USB 3.1 Gen 1, 1m',
      productAmount: 3,
      productAttachmentUrl: 'https://i.alza.cz/ImgW.ashx?fd=f3&cd=DU413v3',
    },
    {
      id: 2,
      dispatchListId: 1000,
      productBarcode: '12',
      productCode: 'C177-4',
      productName: 'Sony Xperia Z3 Compact (D5803) White',
      productAmount: 1,
      productAttachmentUrl: '',
    },
    {
      id: 3,
      dispatchListId: 1000,
      productBarcode: '13',
      productCode: 'C125-4',
      productName: 'MSI GT72VR 7RE-447CZ Dominator Pro',
      productAmount: 1,
      productAttachmentUrl: 'https://i.alza.cz/ImgW.ashx?fd=f3&cd=NB117z4w',
    },
    {
      id: 4,
      dispatchListId: 1000,
      productBarcode: '14',
      productCode: 'C195-0',
      productName: 'Yenkee YPF 05UNICLMT 5.5" transparentní + antireflexní',
      productAmount: 6,
    },
    {
      id: 5,
      dispatchListId: 1001,
      productBarcode: '15',
      productCode: 'C137-2',
      productName: 'Intel Core i7-7820X',
      productAmount: 2,
      productAttachmentUrl: 'https://i.alza.cz/ImgW.ashx?fd=f3&cd=BO535g',
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

    let properItems = [];
    let success = false;

    for (let i = 0; i < items.length; i++) {
      if (items[i].dispatchListId.toString() === req.params.dispatchId) {
        properItems.push(items[i]);
        success = true;
      }
    }
    if (success) {
      resolve({success: true, result: properItems});
    }
    else {
      reject({success: false, result: items});
    }
  });
};
