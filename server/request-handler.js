/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  var method = request.method;
  var url = request.url;

  console.log('URL:', url);

  var body = {
    results: []
  };

  headers['Content-Type'] = "application/json; charset=utf-8";
  

  if (method === "POST"  && url === '/classes/messages') {
    console.log('POST');

    request.on('error', function(err) {
      console.log(err);
    });

    request.on('data', function(chunk) {
      body.results.push(JSON.parse(chunk));
      console.log('CHUNK:', JSON.parse(chunk));
    });

    request.on('end', function() {
      console.log('Body:', JSON.stringify(body.results));
      console.log('body after:', body);
    });

    response.writeHead(201, headers);
    response.end('Received message!');
  } else if (method === "GET" && url === '/classes/messages') {
    console.log('GET');


    response.writeHead(200, headers);
    // response.setHeader('Content-Type', 'text/plain');
    response.on('data', function(chunk) {
      body.results.push(chunk);
    });
    response.write(JSON.stringify(body));
    response.end();
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('NOT FOUND');
    response.end("Sorry. Does not compute.");
  }




  // The outgoing status.
  // var statusCode = 200;

/*
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.on('data', function(chunk){
    statusCode = 201;
  });

  response.writeHead(statusCode, headers);

  response.write(JSON.stringify(body));

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.write(JSON.stringify({}));

  response.end();
  */
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;
