
events and and event driven architecture 

Event emmiters (emmits events when something iportant happens in th app) ==> Picked by event listners(made by devs) ==>fire of callback functions  


Node usage of server driven architecture to handle server request 

const server =http.createServer();

server.on"request", (req,res) =>{     //server.on creates a listner
    console.log("request received");
    res.end("request recived");
}


so lets say a server emits a event  , each time a request is hit the server, so the listner will call a callback function attatched to the event (request here ) will be called  .

this event emmiter > event listner   ,  is called observer pattern. the idea is a observer is keep waiting /observing,untill a subjetc  will emmit a event.  they are reactive and decoupled and self contained

---------------------------------------------------------------------

Node.js Streams: A Comprehensive Overview
Streams Fundamentals

Streams are event-based mechanisms for processing data piece by piece
Allows handling large data volumes without loading entire content into memory
Inherits from EventEmitter class
Enables efficient, incremental data processing

Stream Types
1. Readable Streams

Purpose: Consuming/reading data incrementally
Examples: HTTP request data, file reading
Key Events:

data: New data chunk available
end: No more data to consume


Methods: pipe(), read()
Use Case: Reading large files, network requests

2. Writable Streams

Purpose: Sending/writing data
Examples: HTTP responses, file writing
Key Events:

drain: Buffer ready for more data
finish: All data written


Methods: write(), end()
Use Case: Sending responses, saving files

3. Duplex Streams

Simultaneously readable and writable
Examples: Network sockets, WebSockets
Supports both input and output operations

4. Transform Streams

Special duplex streams
Can modify/transform data during transfer
Examples: Compression (zlib), encryption
Processes data while streaming

Stream Workflow

Create stream
Listen to events
Process data incrementally
Handle stream completion

Code Example
javascriptCopyconst fs = require('fs');

// Readable Stream
const readStream = fs.createReadStream('large-file.txt');
readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length);
});

// Writable Stream
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Streaming data...');
Best Practices

Use pipe() for efficient data transfer
Handle errors with .on('error')
Close streams after use
Monitor memory consumption