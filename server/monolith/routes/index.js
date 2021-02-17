const router = require('express').Router()
const movieRouter = require('./movie')
const tvSeriesRouter = require('./tvSeries')

router.use(movieRouter)
router.use(tvSeriesRouter)

module.exports = router