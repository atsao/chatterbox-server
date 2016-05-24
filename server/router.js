function home(request, response) {
  if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<h1>Hellooo</h1>");
    response.end();
  }
}

function send(request, response) {

}

function messages(request, response) {

}


module.exports = {
  home: home,
  send: send,
  messages: messages
}







  // if (method === "POST" && url === '/classes/messages') {
  //   console.log('POST');

  //   request.on('error', function(err) {
  //     console.log(err);
  //   });

  //   request.on('data', function(chunk) {
  //     body.results.push(JSON.parse(chunk));
  //     console.log('CHUNK:', JSON.parse(chunk));
  //   });

  //   request.on('end', function() {
  //     console.log('Body:', JSON.stringify(body.results));
  //     console.log('body after:', body);
  //   });

  //   response.writeHead(201, headers);
  //   response.end('Received message!');
  // } else if (method === "GET" && url === '/classes/messages') {
  //   console.log('GET');


  //   response.writeHead(200, headers);
  //   response.write(JSON.stringify(body), 'utf8');
  //   response.end();
  // } else {
  //   response.writeHead(404, {'Content-Type': 'text/html'});
  //   response.write('NOT FOUND');
  //   response.end("Sorry. Does not compute.");
  // }