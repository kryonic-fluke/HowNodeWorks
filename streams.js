const fs = require("fs");

const server   = require("http").createServer(); //creating a server

server.on("request", (req, res) => {
    //solition 1   //in this case node will have to load entire file in th memory 
    // fs.readFile("test-file.txt",(err,data)=>{
    //    if(err) console.log(err);
    //    res.end(data);
    // })
//-----------------------------------------------------------------------
    //solution 2: Streams
    // const readable = fs.createReadStream("test-file.txt");  //creates a stream from the data that is test file
    // readable.on("data", chunk=>{ //each time a readable data can be consumed readble stream emmits the data events
    //     res.write(chunk);   //write the data in the response    
    // } )               

    // readable.on("end",()=>{
    //     res.end();
    // })  //end the response    , end method signals that no more data will be written to the response

    // readable.on("error", err=>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found");
    // })  //error handling    

    //proble with thiss approach is , that readable stream is much-much faster than, sending the result with response writeable stream, which will overwelm the response stream , this is called backpressure
    // -------------------------------------------------------------------------

    //solution 3 using pipe operator, available in all readable streams, allows us to pipe the output right into the input of a writbel stream
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);  //pipe the readable stream to the response stream  
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("File read successfully");
})