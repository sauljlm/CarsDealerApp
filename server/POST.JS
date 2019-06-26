const brands = require('./bd/brands.json');
const cars = require('./bd/cars.json');
const querystring = require('querystring');
const fs = require('fs');

function processData(req, res, file, url, type) {
  let data = '';
  req
    .on('data', d => data += d)
    .on('end', () => {
      data = querystring.parse(data);
      if (type === 'car') {
        if(validateCar(data.name, data.year, data.color)) { 
          data = addDefaults(data.name, data.year, data.description, data.color, data.date);
          writeData(res, file, url, data);
        } else {
          res.end(`los valores ${res} no son validos`);
        }
      } else if (type === 'brand') {
        if(validateBrand(data.name)) {
          writeData(res, file, url, data);
        } else {
          res.end(`los valores ${res} no son validos`);
        }
      } 
    });
}

function writeData(res, file, url, data) {
  file.push(data);
  fs.writeFile(`${url}`, JSON.stringify(file), err => {if(err) throw new Error(err)});
  res.end(JSON.stringify(data));
}

function validateBrand(name) {
  if (name) {
    return true;
  } else {
    return false;
  }
}

function validateCar(name, year, color) {
  console.log(year);
  if(name && year && color) {
    return true;
  } else {
    return false;
  }
}

function generateID() {
  const id = Math.floor((Math.random() * (999)) + 100);
  return id;
}

function generateDate() {
  let date = new Date();
  date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return date;
}

function addDefaults(name, year, description, color, date) {
  let DATA = {
    id: generateID(),
    name: name,
    year: year,
    description : description,
    year: year,
    color: color,
    date: date
  }
  if (!date) DATA.date = generateDate();
  return DATA;
}

function POST(req, res) {
  if(req.url === '/api/v1/brands') {
    processData(req, res, brands, './bd/brands.json', 'brand');
  } else if (req.url === '/api/v1/cars') {
    processData(req, res, cars, './bd/cars.json', 'car');
  } else {
    res.end(`la ruta ${req.url} no fue encontrada`);
  }
}

module.exports = POST; 