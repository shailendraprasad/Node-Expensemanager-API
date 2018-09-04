//secret key for JWT token generation and comparison
var secret = "Ex93nseM@n@g3r!"
//API key in the request
var APIKey = "q7Tzbr2PHVa5TemOsBP7"
//URL for mongo database
var mongoDbUrl = "mongodb://localhost/ExpenseManagerDb";
//Default port if port is not provided in the process.env
var port = "3001"


export { secret, APIKey, mongoDbUrl, port }
