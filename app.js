const morgan = require('morgan');
const express = require('express');
const app = express();
const layout = require('./views/layout');
const { db } = require('./models');

app.use(express.urlencoded({ extended: false}))
app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"));

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.get('/', (req, res, next) => {
    console.log('hello world!')
    res.send(layout(''))
})

const PORT = 1337;

app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
})
