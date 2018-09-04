import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var expenseSchema = new Schema({
    amount : Number,
    category : String,
    date: Date,
})

var Expense = mongoose.model('Expense', expenseSchema);

export { Expense }
