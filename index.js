const express =     require('express');
const bodyParser =  require('body-parser');
const environment = require('dotenv');
const response =    require('./Application/Model/Response');
const { ValidationError } = require('express-validation');
const accessToken = require('./Application/Model/AccessToken');
const user =        require('./Application/Model/User');

// Setup express module
const app = express();
module.exports = app;

// Configure environments
environment.config(function() {
    app.use(express.session({ cookie: { maxAge: 60000 }}));
});

// Middleware for API key to access API gateway.
app.use(require('./Application/Middleware/APIValidator')());

// Setup body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ################# Public Route ##############
app.use(require("./Application/Routes/public"));
// ############### End Route #################

// Middleware for validate and load active user
app.use(require('./Application/Middleware/UserValidator')());

// ################# Private Route ##############
app.use(require("./Application/Routes/private"));
// ############### End Route #################

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        return response.failed(res, 400, err.details.body[0].message)
    }
    return response.failed(res, 500)  
})

app.use(function(req, res, next) {
    return response.failed(res, 404) 
});


const port = process.env.SERVER_PORT || 3000;
app.listen(port, function(error) {
    if(error) console.log(error);
    else console.log('Server started on: ' + port);
});