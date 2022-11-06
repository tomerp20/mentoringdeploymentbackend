require('dotenv').config()

const express = require('express');
const cors = require('cors');
const { ValidRes, ErrNotAuth, ErrNotAuthed, CreatedRes, ErrUserNotFound } = require('./lib/ResponseHandler');
const { jwtVerify } = require('./lib/JWT');
const DB = require('./db');

const app = express();

const cookieParser = require("cookie-parser");
const { getPermissionsList } = require('./lib/permissions');






// preparation layer

//help us can body as json
app.use(express.json());

app.use(cookieParser());



app.use(async (req, res, next) => {
    res.ok = (data) => {
        const resp = ValidRes(data);

        res.cookie("auth", true, {
            httpOnly: true
        });

        res.cookie("nonsec", true, {
            httpOnly: false
        });

        res.block(resp);
    };

    res.create = (data) => {
        const resp = CreatedRes(data);
        res.block(resp);
    }

    //...

    res.block = (resp) => {
        res.status(resp.status).send(resp.payload);
    }

    next();
})

//auth layer

app.use(cors())

//auth middleware
app.use((req, res, next) => {
    return next();

    const authorized = ['/users/login', '/users/register'];

    if (authorized.includes(req.url)) {
        return next();
    }

    const { authorization } = req.headers;


    try {
        const decoded = jwtVerify(authorization);

        const users = new DB('users');

        const user = users.getById(decoded.id);

        if (!user) {
            return next(ErrUserNotFound());
        }

        delete user.password;
        console.log('user', user);

        user.permissions = getPermissionsList(user.permissionId);

        req.user = user;



        return next();
    } catch (error) {
        next(ErrNotAuthed());
    }

    //3) verify that the token is valid
    //4) verify user exist 




})



// route layer
app.use('/tweets', require('./routes/tweets.route'));
app.use('/users', require('./routes/users.route'));


//error layer
app.use((err, req, res, next) => {
    console.log('err ->>> ', err);
    res.block(err);
})


app.listen(process.env.PORT, () => {
    console.log(`Express is listening on port ${process.env.PORT}`);
});


