var nools = require('nools');



// var filePath = __dirname + '/rules/helloworld.nools';
// console.log(filePath);
// var flow = nools.compile(filePath);
// console.log('level 1');
// var session = flow.getSession();
// console.log('level 2');
// var Output = flow.getDefined('output');
// console.log('level 3');
// session.assert(new Output("six"));
// console.log('level 4');
// session.match();
//
// console.log('Rule excuted @ '+ filePath);

var flow = nools.compile(__dirname + "/rules/sorting.nools"),
    session = flow.getSession();
    Message = flow.getDefined("message");

session.assert(new Message("ascending", [5,235,6,73,14]));
session.match();
console.log(Message);


