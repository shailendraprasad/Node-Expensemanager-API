import { Router } from 'express';
import { User } from '../Models/UserModel'
import bcrypt from 'bcrypt';
import underscore from 'underscore';
import { verifyToken, createToken } from '../Authentication/tokenHelper';
import { constants } from '../Common/constants';

const userRoutes = Router();

//method to validate the JWT token in the request
//Added methods to ignore the validation for this route
userRoutes.use('', (req, res, next) => {
    var _ = underscore;
    var nonSecurePaths = ['/create', '/login', '/getall']
    if (_.contains(nonSecurePaths, req.path.toLocaleLowerCase()))
        next();
    else
        verifyToken(req, res, next);
});

//Get all the users
userRoutes.get('/getall', (req, res) => {
    User.find({}, '-_id -__v', (err, users) => {
        if (users.length > 0)
            res.status(200).json({ Users: users });
        else
            res.status(200).json({ Message: constants.EM_No_Users, ErrorCode: constants.EC_No_Users });
    })
});

//Get user by email
userRoutes.get('/get', (req, res) => {
    User.find({ _id: req.headers.id }, '-_id -__v', (err, users) => {
        if (users.length > 0)
            res.status(200).json({ User: users[0] });
        else
            res.status(200).json({ Message: 'No user records found with the provided email id' });
    })
});

//Post to create a new user
userRoutes.post('/create', (req, res) => {
    var userfromBody = req.body;

    User.find({ email: userfromBody.email }, function (err, user) {
        if (user.length > 0) {
            return res.status(400).json({ Message: 'User email already exists!' });
        }

        User.create(userfromBody);

        return res.status(201).json({ Message: 'User created successfuly!' });
    });
});

//Login for the user
userRoutes.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.find({ email: email }, function (err, user) {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (err) {
                    res.status(400).json({ Message: "Some error occured" });
                }
                else if (!result) {
                    res.status(200).json({ Message: "Login Failed" });
                }
                else if (result) {
                    var token = createToken(user[0]._id);
                    res.header('auth-Token', token);
                    res.status(200).json({ Message: "Login Successful" });
                }
            });
        }
        else {
            res.status(200).json({ Message: "Email not available!" })
        }
    });
});

export { userRoutes }