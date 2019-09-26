const morgan = require('morgan');
const express = require('express');
const app = express();
const layout = require('./views/layout');
const { db, User, Page } = require('./models');
const wikiRoute = require('./routes/wiki.js')
const userRoute = require('./routes/user.js')

app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"));

app.use('/wiki', wikiRoute)
// app.use('/user', userRoute)
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.get('/', (req, res, next) => {
  console.log('hello world!')
  res.redirect('/wiki')
})
const PORT = 1337;

async function init() {
  await db.sync({ force: true }) //could also do User.sync(), Page.sync()
  app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
  })
}
init()
