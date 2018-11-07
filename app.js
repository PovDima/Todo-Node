const express = require('express');
const todoController = require('./controllers/todoController');

// Init App
const app = express();

// Set up template engine ejs
app.engine('ejs', require('ejs').renderFile);
 app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Fire controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log('Listening port 3000');
