const yup = require('yup');

/*
    name - required
    name - string
    
    optional
    description - required
    description - string
*/

let tweetsSchema = yup.object().shape({
    name: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    description: yup.string()
})

module.exports = { tweetsSchema };