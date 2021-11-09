const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user')

dotenv.config()

const app = express();

mongoose.connect(
    process.env.DATABASE, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log('Connected to Database Sucessfully')
    }
})

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const { Router } = require('express');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

// app.get('/', (req, res) => {
//     res.json('Hello Amazon');
// });

// app.post('/', (req,res)=> {
//     let user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;

//     user.save((err) => {
//         if(err){
//             res.json(err);
//         } else {
//             res.json('successfully saved')
//         }
//     })
// });

app.listen(5000, (err) => {
     if (err) {
         console.log(err);
     } else {
         console.log('Listening on PORT: 5000');
     }
});