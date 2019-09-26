const express = require('express');
const router = express.Router();
const layout = require('../views/layout')
const { db, User, Page } = require('../models');
const { addPage } = require('../views')

router.get('/', (req, res) => {
  console.log('wiki/ get')
  res.send(layout(''))
})

router.get('/add', (req, res) => {
  console.log('wiki/add get')
  res.send(addPage())
})

router.post('/', async (req, res, next) => {
  //let slugged = req.body.title.replace(/\s+/g, '_').replace(/\W/g, '')

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.pageContent,
      slug: req.body.title

    })
    console.log(page.dataValues)
    res.redirect('/')
  } catch (error) {

    next(error)
  }
})

module.exports = router
