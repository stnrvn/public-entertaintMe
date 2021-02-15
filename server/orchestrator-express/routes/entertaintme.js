const router = require('express').Router()

const entertaintmeController = require('../controllers/entertaintmeController')

router.get('/entertaintme', entertaintmeController.get)

module.exports = router