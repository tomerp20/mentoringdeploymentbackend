/*
 CRUD
 1) Create - POST /users { name: 'mosh' }
 2) Read - GET /users
 3) Read - GET /users/:id
 
 4) Update - PUT/PATCH /users/:id { name: 'new mosh' }
 5) Delete - DELETE /users/:id

 6) Register - POST /users/register { .... } -- if user already exist - return error 
*/

const express = require('express');
const route = express.Router();

const DB = require('../db');
const { usersSchema, userRegistrationSchema, userLoginSchema } = require('../dto/users.schema');
const { validateDto } = require('../dto/validate');

const { postLogin, postRegister, putByID, getMe, getPermissions } = require('../controllers/users.controller');

const users = new DB('users');

route.get('/me', getMe);

route.post('/register', validateDto(userRegistrationSchema), postRegister);
route.post('/login', validateDto(userLoginSchema), postLogin);
route.put('/:id', validateDto(usersSchema), putByID);

route.get('/permissions', getPermissions);


route.delete('/:id', (req, res) => {
    const { id } = req.params;
    const resp = users.deleteById(id);

    res.ok(`res: ${resp}`);
})



route.get('/', (req, res) => {

    console.log('req.query', req.query);


    res.ok(users.get());
})


/*
    dto/validate.js

    route.post(a, m, b);
*/


route.get('/:id', (req, res, next) => {
    console.log('params', req.params);

    res.ok(users.getById(req.params.id));
})

module.exports = route;