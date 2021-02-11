const router = require('express').Router()

const tvSeriesController = require('../controllers/tvSeriesController')

router.get('/tvSeries', tvSeriesController.get)
router.get('/tvSeries/:id', tvSeriesController.getById)
router.post('/tvSeries', tvSeriesController.create)
router.put('/tvSeries/:id', tvSeriesController.update)
router.delete('/tvSeries/:id', tvSeriesController.delete)

module.exports = router