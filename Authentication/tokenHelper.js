import jsonwebtoken from 'jsonwebtoken'
import { secret } from '../config';
import { encrypt, decrypt } from './cryption';


var jwt = jsonwebtoken;

//function to create the JWT token with id as the object value
var createToken = (objectToAddinToken) => {
    var token = jwt.sign({ data: encrypt(objectToAddinToken) }, secret, { expiresIn: 900 });
    return token;
}

var verifyToken = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.headers['auth-token'];
    if (!token)
        return res.status(403).send({ auth: false, ErrorMessage: 'No token provided.' });

    // verifies secret and checks exp
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, ErrorMessage: err.message || "Token authentication failure." });
        }
        // if everything is good, save to request for use in other routes
        req.headers.id = decrypt(decoded.data);
        next();
    });
}

//export the methods
export { verifyToken, createToken }
