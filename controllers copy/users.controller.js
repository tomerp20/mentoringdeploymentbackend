const DB = require("../db");
const { getPermissionsList } = require("../lib/permissions");
const { ErrUserNotFound, ErrConflict } = require("../lib/ResponseHandler");
const { getUserByEmail, getUserToken } = require("../services/users.service");

const users = new DB('users');

//GET /me 
module.exports.getMe = (req, res) => {
    const { user } = req;
    user.permissions = getPermissionsList(user.permissionId);

    res.ok(user);
}

module.exports.getPermissions = (req, res) => {
    const { user } = req;

    const permissions = getPermissionsList(user.permissionId);

    res.ok(permissions);
}

//POST /register
module.exports.postRegister = (req, res, next) => {
    const { email } = req.body;

    const user = getUserByEmail(email);

    if (user) {
        return next(ErrConflict());
    }

    const newUser = users.add(req.body);
    res.create(newUser);
}

//POST /login
module.exports.postLogin = (req, res, next) => {
    //get the user
    const { email, password } = req.body;

    const user = getUserByEmail(email);

    if (!user) {
        return next(ErrUserNotFound());
    }

    if (user.password !== password) {
        return next(ErrUserNotFound());
    }

    //create access token with the user
    const access_token = getUserToken(user);

    //respond back
    res.ok({ access_token, user })
}

module.exports.putByID = (req, res) => {

    const { id } = req.params;
    const { body } = req;



    const resp = users.updateItem(id, body);

    res.ok(`res: ${resp}`);
}