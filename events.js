const EventEmitter = require("events");  //getting the events module

const http = require("http");

class Sales extends EventEmitter {
    constructor() {
        super();      //super Allows the Sales class to inherit all EventEmitter methods like .on() and .emit()
    }
}

const myEmitter = new Sales();  //this is an instance(object) of EventEmitter


myEmitter.on("newSale", () => {
  console.log("There was a new sale!");    //  listners
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Suyash"); //listner
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`); //listner receives an argument passed by the emitter
});

myEmitter.emit("newSale",9); //this is an event emitter  , we can pass an argument 


/////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("request received");
    res.end("Request received");
}); //request is an event, for which we are listening

server.on("request", (req, res) => {
    console.log("another request received");
    
});

server.on("close", (req, res) => {
    console.log("server closed");
    
});

server.listen(8000 ,"127.0.0.1", () => {
    console.log("Waiting for requests...")
})  