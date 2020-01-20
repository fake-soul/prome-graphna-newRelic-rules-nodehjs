var async = require('async'),
    axios = require('axios');


module.exports = (app) => {
    app.get('/url1', (req, res) => {
        axios.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
            .then((response) => {
                    console.log(res);
                    res.send("OK ");
                }
            )
            .catch((error) => {
                console.log(err);
                res.send("NOT_OK ")
            });
    });

    app.get('/url3', (req, res) => {
       axios.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
           .then((response) => {
               console.log(response);

           })
           .catch((error) => {
               console.log(error);
           })
           .then((response) => {
               axios.post('https://postman-echo.com/post', {
                   params: {
                       'foo1': 'bar1',
                       'foo2': 'bar2'
                   }
               })
                   .then((response1) => {
                      console.log(response1);
                   })
                   .catch((error) => {
                       console.log(error);
                   })
                   .then((response1) => {
                       res.send("OK");
                   });
           });
    });2
}