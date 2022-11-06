const yup = require('yup');

/*
    name - required
    name - string
    
    optional
    age - integer
    email - string, email 
*/

let usersSchema = yup.object().shape({
    name: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    age: yup.number().integer().positive(),
    email: yup.string().email()
})

let userRegistrationSchema = yup.object().shape({
    name: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup.string().required().email(),
    password: yup.string().required().matches(/^[aA-zZ\s]+$/, "password need to be good")
})

let userLoginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().matches(/^[aA-zZ\s]+$/, "password need to be good")
})

module.exports = {
    usersSchema,
    userRegistrationSchema,
    userLoginSchema
};