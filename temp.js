var fs = require("fs");

var randomstring = require("randomstring");

var data = "New File Contents";

var a = [];


for(var i=0;i<100;i++) {
    const  data = {
        first_name: randomstring.generate(6),
        last_name: randomstring.generate(4),
        email: randomstring.generate(10),
        username: randomstring.generate(4),
        password: randomstring.generate(10)
    };
    a.push(data);
}




fs.writeFile("temp.txt", a, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});