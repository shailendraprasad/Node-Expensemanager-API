import { APIKey } from '../config'

//function to validate the apikey header value in the request
var validateApiKey = (req, res, next) => {
    var apiKeyfromHeader = req.headers['apikey'];
    if (apiKeyfromHeader === APIKey) {
        next();
    }
    else {
        return res.status(401).json({ Message: "API Key is not provided in the request" });
    }
}

export { validateApiKey }