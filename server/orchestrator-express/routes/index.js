const router = require('express').Router()
const movieRouter = require('./movies')
const tvSeriesRouter = require('./tvSeries')
const entertaintmeRouter = require('./entertaintme')

router.use(movieRouter)
router.use(tvSeriesRouter)
router.use(entertaintmeRouter)

module.exports = router


