const fs = require("fs");
const crypto = require("crypto"); //all the packages from this module will be offloaded to threadpool

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2; //changing the default size of threadpool
setTimeout(() => console.log("Timer 4 finished"), 3000); // they both are running outside of the timmer
setImmediate(() => console.log("Immediate 2 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished"); // Callback runs in Poll phase of event loop

  process.nextTick(() => {
    console.log("Process.nextTick"); // Microtask, executed after each phase,
    // Highest priority in event loop, runs immediately after current operation
  });

  setImmediate(() => {
    console.log("Immediate 2 finished"); // Runs in Check phase of event loop
    // Executed after Timer phase, but before next I/O cycle
  });

  setTimeout(() => console.log("Timer 3 finished"), 0); // Runs in Timer phase
  // Even with 0ms, it's not guaranteed to run immediately

  setTimeout(() => console.log("Timer 4 finished"), 3000); // Timer with 3-second delay

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
    // Offloaded to threadpool
    // Node.js uses 4 threads by default for these CPU-intensive tasks
    // Can be configured with UV_THREADPOOL_SIZE environment variable
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512", () => {  //sync will not be off loaded to thread pool , will block the code execution
        console.log(Date.now() - start, "password encrypted");
  });
});

console.log("hello from top level code"); //1st

//sequence of execution : top level code >  >mocro taks (promise callback) >setTimout/setInterval > event loop
//event loop : Synchronous code executes first
// Microtasks (Promises, nextTick) execute next
// Macrotasks (timers, I/O, etc.) execute last
// process.nextTick has priority over Promises
// Event loop continues as long as there are callbacks to process
