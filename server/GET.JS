const brands = require('./bd/brands.json');
const cars = require('./bd/cars.json');

function GET(req, res, route) {
  if(req.url === '/api/v1/brands') {
    router(res, {success: true, data: brands});
  } else if (req.url === '/api/v1/cars') {
    router(res, {success: true, data: cars});
  } else {
    res.end(`la ruta ${req.url} no fue encontrada`);
  }
}

function router(res, {success = false, error = null, data = null, status = 200}) {
  res.statusCode = status;
  res.end(JSON.stringify({success, data, error}));
}

module.exports = GET;