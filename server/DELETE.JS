const fs = require('fs');
let cars = require('./bd/cars.json');

function DELETE(req, res) {
  if(req.url.indexOf('/api/v1/cars') > -1) {
    let id = +req.url.split('cars/')[1];
    cars.splice(id -1, 1);
    cars = cars.map((element, index) => {
      element.id = index + 1;
      return element;
    });
    if(cars[id]) {
      fs.writeFile('./bd/cars.json', JSON.stringify(cars),
      err => {if (err) throw new Error(err)});
      router(res, {success: true, data: cars});
    } else {
      router(res, {error: 'no se encontró el Id' , status: 404});
    }
  } else {
    router(res, {error: 'not resource found' , status: 404});
  }
}

function router(res, {success = false, error = null, data = null, status = 200}) {
  res.statusCode = status;
  res.end(JSON.stringify({success, data, error}));
}

module.exports = DELETE;