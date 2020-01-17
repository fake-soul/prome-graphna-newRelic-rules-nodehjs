var Sequelize = require('sequelize');
var UserModel = require('./models/user');

const sequelize = new Sequelize('playdb', 'root1', 'hello', {
    host: 'localhost',
    port: '8889',
    dialect: 'mysql'
});


const User = UserModel(sequelize, Sequelize);

sequelize.sync()
.then(() => {
    console.log("User created");
});

module.exports = User;