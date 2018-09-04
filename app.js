import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './Controllers/userRoute';
import { expenseRoutes } from './Controllers/expenseRoute';
import mongoose from 'mongoose';
import { validateApiKey } from './Authentication/validateApiKey';
import { mongoDbUrl, port } from './config';


//Initialise express
const app = express();

//connect to the MongoDb database using mongoose
var db = mongoose.connect(mongoDbUrl, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('error while connecting to the Database')
        throw err;
    }
});

//middleware to validate the API key in the request
app.use(validateApiKey);
//body parser
app.use(bodyParser.json());
//user Routing
app.use('/api/user', userRoutes);
//Expense Routing
app.use('/api/expense', expenseRoutes);


//default route
app.get('/', (req, res) => {
    res.send('This is an API for Expense Manager Application')
});

//listen in the port provided in the process start or from the config
app.listen(process.env.PORT || port, () => console.log('app is running now on port ' +  (process.env.PORT || port)));

export { db }
