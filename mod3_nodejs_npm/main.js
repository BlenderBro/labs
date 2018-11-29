const http = require('http'); //from standard node library


// Create a simple server object:


// http.createServer(function (req, res) {
// 	res.write('<h1 style="text-align:center">Node http server here!<h1>'); //write a response to the client
// 	res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080


// Create a simple static file server:

const url = require('url'); 	//url helper from standard node library
const fs = require('fs'); 	//filesystem helper from standard node library
const path = require('path'); //path helper from standard node library
const port = 8080;

/*
*	Browsers don't read extensions (mimetypes) so they don't understand the difference between index.html and index.js
*	they use the header Content-type
*/
const mimeType = {
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.wav': 'audio/wav',
	'.mp3': 'audio/mpeg',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
	'.doc': 'application/msword',
	'.eot': 'appliaction/vnd.ms-fontobject',
	'.ttf': 'aplication/font-sfnt'
};

http.createServer(function (req, res) {
	console.log(`${req.method} ${req.url}`);
	
	const parsedUrl = url.parse(req.url); //parse the url from the request ex: C:\Documents\..\mod3_nodejs_npm\index.html
	/*
	*	Extract the url path and limit it to the current directory
	*	Append that path to the base url (localhost)
	*
	*/
	const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
	let pathname = path.join(__dirname, sanitizePath);
	fs.exists(pathname, function (exist) {
		// if the file is not found, return 404
		if (!exist) {
			res.statusCode = 404;
			res.end(`File ${pathname} not found!`);
			return;
		}
		// if the path points to a directory, then look for index.html
		if (fs.statSync(pathname).isDirectory()) {
			pathname += '/index.html';
		}
		// read file from file system
		fs.readFile(pathname, function (err, data) {
			if (err) {
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
				// based on the URL path, extract the file extention. e.g. .js, .doc, ...
				const ext = path.parse(pathname).ext;
				// if the file is found, set Content-type and send data
				res.setHeader('Content-type', mimeType[ext] || 'text/plain');
				res.end(data);
			}
		});
	});
}).listen(parseInt(port));
console.log(`Server listening on port ${port}`);