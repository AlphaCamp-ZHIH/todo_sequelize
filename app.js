const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session  = require('express-session');
const usePassport = require('./config/passport');

const app  = express();
const port = 3000;
const routes = require('./routes/index');

//template
app.engine('hbs',exphbs({defaultLayout:'main',extname:'hbs'}));
app.set('view engine','hbs');

//bodyParser methodOverride
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//session and passport
app.use(session({
  secret:'heyhey',
  resave:false,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
usePassport();

app.use((req, res, next) =>{
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  
  return next();
})

app.use(routes);


app.listen(port, ()=>{
console.log(`operate server  port:${port} successfully`)

});

