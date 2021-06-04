const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app  = express();
const port = 3000;
const routes = require('./routes/index');

app.engine('hbs',exphbs({defaultLayout:'main',extname:'hbs'}));
app.set('view engine','hbs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(routes);


app.listen(port, ()=>{
console.log(`operate server  port:${port} successfully`)

});

