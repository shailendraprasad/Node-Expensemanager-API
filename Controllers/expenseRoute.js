import { Router } from 'express';
import { Expense } from '../Models/ExpenseModel'

//initliaze router
const expenseRoutes = Router();

//route middleware to validate all the request for expense route with token
expenseRoutes.use('*', (req, res, next) => {
    verifyToken(req, res, next);
});

//GET method to get the expenses for the user
expenseRoutes.get('/get', (req, res) => {
    Expense.find({}, '-_id -__v', (err, expenses) => {
        if (expenses.length > 0)
            res.status(200).json(expenses);
        else
            res.status(200).json({ Message: 'There are no expenses for this user in the DB' });
    })
});


//create method to create the expense for the user
expenseRoutes.post('/create', (req, res) => res.json('expense create'));

export { expenseRoutes }