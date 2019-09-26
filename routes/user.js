const express = require('express');
const router = express.Router();
const layout = require('../views/layout')
const { db, User, Page } = require('../models');
const { addPage } = require('../views')
const wikipage = require('../views/wikipage')
const main = require('../views/main')
const userList = require('../views/userList')
const userPages = require('../views/userPages')

router.get('/', async (req, res, next) => {
    try {const users = await User.findAll()
    res.send(userList(users))
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {const user = await User.findAll({
        where: {
            id: req.params.id
        }
    })
    const pages = await Page.findAll({
        where: {
            authorId: req.params.id
        }
    })
    res.send(userPages(user[0], pages))
    } catch (err) {
        next(err)
    }
})

module.exports = router
