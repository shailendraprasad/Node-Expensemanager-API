import { APIKey } from '../config'

//function to validate the apikey header value in the request
var validateApiKey = (req, res, next) => {
    var apiKeyfromHeader = req.headers['apikey'];
    //Dont validate the API key for the initial URL
    if(req.url == "/"){
        return res.status(200).json({ Message: "This is an API for Expense Manage App" });
    }
    if (apiKeyfromHeader === APIKey) {
        next();
    }
    
    else {
        return res.status(401).json({ Message: "API Key is not provided in the request" });
    }
}

export { validateApiKey }