const brands = require('./bd/brands.json');
const cars = require('./bd/cars.json');
const qs = require('querystring');
const fs = require('fs');

function writeFile(req, res, file, url) {
  let data = '';
  req
    .on('data', d => data += d)
    .on('end', () => {
      data = qs.parse(data);
      if(data.name && data.year && data.color) {
        data = addDefaults(data.name, data.year, data.description, data.color, data.date);
        file.push(data);
        fs.writeFile(`${url}`, JSON.stringify(file), err => {if(err) throw new Error(err)});
        res.end(JSON.stringify(data));
      } else {
        res.end(`los valores ${res} no son validos`);
      }
    });
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
    writeFile(req, res, brands, './bd/brands.json');
  } else if (req.url === '/api/v1/cars') {
    writeFile(req, res, cars, './bd/cars.json');
  } else {
    res.end(`la ruta ${req.url} no fue encontrada`);
  }
}

module.exports = POST; 