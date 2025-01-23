const fs = require("fs");

const server   = require("http").createServer(); //creating a server

server.on("request", (req, res) => {
    //solition 1   //in this case node will have to load entire file in th memory 
    // fs.readFile("test-file.txt",(err,data)=>{
    //    if(err) console.log(err);
    //    res.end(data);
    // })

    //solution 2: Streams
    const readable = fs.createReadStream("test-file.txt");  //creates a stream from the data that is test file
    readable.on("data", chunk=>{
        res.write(chunk)});   //write the data in the response    
    } ,                    //each time a readable data can be consumed readble stream emmits the data events

    readable.on("end",()=>{
        res.end();
    })  //end the response    , end method signals that no more data will be written to the response
)

server.listen(8000,"127.0.0.1",()=>{
    console.log("File read successfully");
})