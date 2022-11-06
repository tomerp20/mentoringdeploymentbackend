const DB = require("../db");
const { jwtSign } = require("../lib/JWT");

const users = new DB('users');

module.exports.getUserByEmail = (email) => {
    const list = users.get();
    const user = list.find(i => i.email === email);

    return user;
}

module.exports.getUserToken = (user) => {
    const { id } = user;
    delete user.password;

    const access_token = jwtSign({ id });

    return access_token;
}