const router = require('express').Router()

const tvSeriesController = require('../controllers/tvSeriesController')

router.get('/series', tvSeriesController.get)
router.get('/series/:id', tvSeriesController.getById)
router.post('/series', tvSeriesController.create)
router.put('/series/:id', tvSeriesController.update)
router.delete('/series/:id', tvSeriesController.delete)

module.exports = router