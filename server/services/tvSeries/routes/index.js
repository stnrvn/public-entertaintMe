const router = require('express').Router()
const tvSeriesRouter = require('./tvSeries')

router.use(tvSeriesRouter)

module.exports = router