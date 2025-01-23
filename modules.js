
//console.log(arguments);  //this is a special keyword in nodejs, which is an array like structure, which contains all the arguments passed to the nodejs script
  
//five arguments of a wrapper function  export , require , module , __filename , __dirname      
//console.log(require('module').wrapper);

//module.exports
const C = require("./test-module-1")
const calculator = new C()
console.log(calculator.add(2,5));


//exports
// const exp = require("./test-module-2")
// const calc = new exp();
const {add,multiply,divide} = require("./test-module-2")


//caching 

require("./test-module-3")();
require("./test-module-3")();//this one and the one down bellow is the same, because the module is cached
require("./test-module-3")(); 
