const router = require('express').Router()

const movieController = require('../controllers/movieController')

router.get('/movies', movieController.get)
router.get('/movies/:id', movieController.getById)
router.post('/movies', movieController.create)
router.put('/movies/:id', movieController.update)
router.delete('/movies/:id', movieController.delete)

module.exports = router