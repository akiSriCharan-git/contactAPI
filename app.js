// Requiring modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//mongoose
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log('Successfully connected to database')
})
.catch(err=>{
  console.log(err)
  console.log("Database connection error")
});

const controller = require('./controller/user');
const verifyToken = require('./middleware/verifyToken');
const rest = require('./controller/rest')

//SIGNUP AND LOGIN
app.post('/register', controller.Signup);
app.post('/login', controller.Login);
app.get('/', verifyToken, controller.Hello);

//GET
app.get('/contacts', verifyToken, rest.getAll);
app.get('/contacts/:contactId', verifyToken, rest.getOne);

//POST
app.post('/contacts', verifyToken, rest.create);

//PUT
app.put('/contacts/:contactId', verifyToken, rest.put);

//PATCH
app.patch('/contacts/:contactId', verifyToken, rest.patch);

//DELETE
app.delete('/contacts', verifyToken, rest.deleteAll);
app.delete('/contacts/:contactId', verifyToken, rest.deleteOne);
const port = process.env.PORT || 8888
app.listen(port, ()=>{
  console.log('Server started on port ' + port)
});
