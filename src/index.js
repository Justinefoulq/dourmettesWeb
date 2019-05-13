const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const mysql = require('mysql')
const cookieSession =require('cookie-session')

const {database} = require('./keys');

const pool = mysql.createPool(database)


//initialisation
const app = express();
require('./lib/passport');

//setting
app.set('port', process.env.PORT ||4000)
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs')

//middleware

app.use(flash());


app.use(cookieSession({
  maxAge: 1*60*60*1000,
	secret:'projetwebdourmettes',
	resave:false,
	saveUninitialized:false,
	store: new MySQLStore(database)

}));



app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




//global variable
app.use((req, res, next) =>{
	app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.client = req.user;


  next()
})

/*app.use(async() => {
   const Location =  await pool.query('SELECT * FROM location');
  app.locals.allLocation = Location;
  console.log(Location.NumLoc);
})*/
/* console.log(app.locals.allLocation);*/



//route
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use(require('./routes/compteclient'))
app.use(require('./routes/adminresa'))
app.use(require('./routes/creareservation'))

app.use(require('./routes/location'))
app.use('/admin', require('./routes/admin'))
app.use('/admin', require('./routes/adminresa'))
app.use('/admin', require('./routes/adminsemaine'))
app.use('/admin', require('./routes/adminsaison'))
app.use('/admin', require('./routes/admintarif'))




//public
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function(req, res){
  res.status(400).redirect('/Error')

});

//start server
app.listen(app.get('port'), () =>{
  console.log('Server on port ', app.get('port'))
})
