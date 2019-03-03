# Node-Expensemanager-API

Expense Manager API

This is an API for the Expense Manager.

The application uses
•	Node JS
•	Mongo DB
•	Express 
•	bcrypt for encryption
•	jsonwebtoken for token creation

Running the application:

To run locally - npm run start
To build – npm run build
To serve the application from build path – npm run serve

For Hosting in IIS:

It also includes a Web.config file which contains the details if you need the application to be hosted in IIS. Pre-requisite for that will be installing iisnode from Azure Github (link: https://github.com/Azure/iisnode) 

Azure Pipeline:

Please refer to azure-pipelines.yml file for azure pipeline creation which will trigger a CI build post commit. Refer to the Azure Devops documentation for further configuration


