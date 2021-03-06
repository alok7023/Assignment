require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./route/router');
const app = express();


app.use(express.json({extended: false}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', router);



// Database Connection
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED") 
});


// PORT
const port = process.env.PORT || 3000;


//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})
