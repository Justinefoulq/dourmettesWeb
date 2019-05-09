const express = require('express');
const morgan =require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//initializations 
const app=express();

//settings 

app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, ));
app.engine('.hbs', exphbs({
	defaultLayout :'main'
	layoutsDir: path.join(app.get('views'),'layouts'),
}))

//Middlewares
app.use(morgan('dev'));

//Global Variables


//Routes
app.use(require('./routes'));

//Public

//Starting the server 
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
})
