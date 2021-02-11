const router = require('express').Router()
const movieRouter = require('./movie')

router.use(movieRouter)

module.exports = router