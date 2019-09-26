const express = require('express');
const router = express.Router();
const layout = require('../views/layout')
const { db, User, Page } = require('../models');
const { addPage } = require('../views')
const wikipage = require('../views/wikipage')
const main = require('../views/main')

router.get('/', async (req, res) => {
  console.log('wiki/ get')
  const posts = await Page.findAll()

  res.send(main(posts))
})

router.get('/add', (req, res) => {
  console.log('wiki/add get')
  res.send(addPage())
})

router.post('/', async (req, res, next) => {
  //let slugged = req.body.title.replace(/\s+/g, '_').replace(/\W/g, '')

  try {
    const page = await Page.create(req.body)
      // {
    //   title: req.body.title,
    //   content: req.body.pageContent, this won't work with the above syntax because pageContent is not the same as content
    //   slug: req.body.title
    // })
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.authorName,
        email: req.body.authorEmail
      }
    })
    await page.update({ authorId: user.id })
    // page.setAuthor(user.id)  this is equal to the above

    res.redirect(`/wiki/${page.slug}`)
  } catch (error) {

    next(error)
  }
})

router.get('/:slug', async (req, res, next) => {
  const slugPage = await Page.findAll({
    where: {
      slug: req.params.slug
    }
  })
  // const author = await User.findAll({
  //   where: {
  //     id: req.params.authorName
  //   }
  // })
  try {
    res.send(wikipage(slugPage))
  } catch (err) {
    next(err)
  }
})

module.exports = router
