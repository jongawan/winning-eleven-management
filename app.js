// Happy coding guys
const express = require('express');
const app = express();
const routes = require('./router');
const session = require ('express-session')


//const errorMiddleware = require('./errorMiddleware');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));

app.use (session({
    secret: 'secret-key',
    resave:false,
    saveUninitialized: false
}))



app.use('/',routes);

//app.use(errorMiddleware);



app.listen(4000, () => {
    console.log('I Love Football Local Version - Port 4000')
    //console.log(error)
});