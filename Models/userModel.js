import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    spendLimit: Number,
    userExpenses : [{type: Schema.Types.ObjectId, ref: 'Expense'}]
})

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

var User = mongoose.model('User', userSchema);

export { User }
