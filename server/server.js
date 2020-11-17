const express = require('express')
const bodyParser = require('body-parser')
//middleware between fend and server
const cors = require('cors')


//sets the port to 3000
const PORT = 3000

//calling the file api.js
const api = require('./routes/api')
const app = express()
app.use(cors())

app.use(bodyParser.json())

//api file route call
app.use('/api', api)
app.get('/', function(req, res){
    res.send('Server Test')
})


app.listen(PORT, function(){
    console.log('Server running on' + PORT)
})