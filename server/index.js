const http = require('http');

const methods = {
    PUT: require('./PUT'),
    POST: require('./POST'),
    GET: require('./GET'),
    DELITE: require('./DELETE'),
}

function createRutes(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(methods[req.method]) {
        console.log('request');
        methods[req.method](req, res);
    } else {
        res.end(`no se encontró ${res}`);
    }
}

http.createServer(createRutes).listen(1234);
console.log('runing on localhost:1234');
