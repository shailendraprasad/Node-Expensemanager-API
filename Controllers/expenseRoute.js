import { Router } from 'express';
import { Expense } from '../Models/ExpenseModel'
import { User } from '../Models/UserModel'
import { verifyToken } from '../Authentication/tokenHelper';

//initliaze router
const expenseRoutes = Router();

//route middleware to validate all the request for expense route with token
expenseRoutes.use('*', (req, res, next) => {
    verifyToken(req, res, next);
});

//GET method to get the expenses for the user
expenseRoutes.get('/get', (req, resp) => {
    User.findOne({ _id: req.headers.id }, 'userExpenses -_id')
        .populate({ path: 'userExpenses', select: '-_id -__v' })
        .select('-_id')
        .exec((err, res) => {
            return resp.status(200).json(res);
        });
});


//create method to create the expense for the user
expenseRoutes.post('/create', (req, res) => {
    var userToUpdate;
    Expense.create(req.body, (err, result) => {
        User.findByIdAndUpdate(req.headers.id, { $push: { userExpenses: result._id } }, function (err, user) {
            return res.status(200).json({ Message: 'Expense created successfuly for the user' });
        });
    });

});

export { expenseRoutes }