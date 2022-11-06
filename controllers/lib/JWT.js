const jwt = require('jsonwebtoken');

const privateKey = 'mosh';

module.exports.jwtSign = (payload, expiresIn = '1d') => {
    const access_token = jwt.sign(payload, privateKey, { expiresIn });

    return access_token;
}

module.exports.jwtVerify = (token) => {
    const payload = jwt.verify(token, privateKey);

    return payload;
}