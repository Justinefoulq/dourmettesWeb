/* Here we want to define a web application */ 
console.log('Hello')

const express= require('express')
const bodyParser=require('body-parser')
const cors = require('cors')
const morgan=require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
/*cors help to open the serveur around the world  it's kind of security covering aplication*/ 
app.use(cors())

/*here we can do all grap instruction : get post put patch delete... */ 
app.get('/status', (req,res) => {
	res.send({
		message:'Hola Chicaaa'
	})


})

app.listen(process.env.PORT || 8081)