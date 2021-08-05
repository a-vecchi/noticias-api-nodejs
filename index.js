const jwt = require("jsonwebtoken");

let payload = {
    iss: "omundoedos.net",
    iat: new Date().getSeconds(),
    exp: new Date().setMinutes(60),
    name: "Alex",
    email: "alex@email.com"
};

var token = jwt.sign(payload, "batman batman batman");

console.log(token);