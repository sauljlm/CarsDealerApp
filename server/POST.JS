const brands = require('./bd/brands.json');
const cars = require('./bd/cars.json');
const qs = require('querystring');
const fs = require('fs');

function POST(req, res, route) {
  if(req.url === '/api/v1/brands') {
    let data = '';
    req
      .on('data', d => data += d)
      .on('end', () => {
          data = qs.parse(data);
          brands.push(data);
          fs.writeFile('./bd/brands.json', JSON.stringify(brands), err => {if(err) throw new Error(err)});
          res.end(JSON.stringify(data));
      });
  } else if (req.url === '/api/v1/cars') {
    let data = '';
      console.log(1111);
    req
      .on('data', d => data += d)
      .on('end', () => {
          data = qs.parse(data);
          cars.push(data);
          fs.writeFile('./bd/cars.json', JSON.stringify(cars), err => {if(err) throw new Error(err)});
          res.end(JSON.stringify(data));
      });
  } else {
    res.end(`la ruta ${req.url} no fue encontrada`);
  }
}

module.exports = POST; 