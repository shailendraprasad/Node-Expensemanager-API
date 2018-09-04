import crypto from "crypto";
import { secret } from '../config'

//method to encrypt the data in the JWT using a secret key
function encrypt(data) {
    var cipher = crypto.createCipher('aes-256-cbc', secret);
    var crypted = cipher.update(data.toString(), 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

//method to decrypt the data in the JWT using a secret key
function decrypt(data) {
    var decipher = crypto.createDecipher('aes-256-cbc', secret);
    var decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;

}

//export the methods
export { encrypt, decrypt }