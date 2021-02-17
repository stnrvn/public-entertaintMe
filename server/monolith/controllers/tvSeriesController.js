const TvShow = require('../models/TvSeries')

class TvSeriesController {
  static async get (req, res) {
    try {
      const tvSeries = await TvShow.get()

      if (!tvSeries) return res.status(400).json({
          message: 'not found!'
      })

      return res.status(200).json(tvSeries)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getById (req, res) {
    try {
      const id = req.params.id

      const tvShow = await TvShow.getById(id)

      res.status(200).json(tvShow)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async create (req, res) {
    try {
      const tvShow = await TvShow.create(req.body)

      return res.status(201).json(tvShow)
    } catch (error) {
      return res.status(401).json(error)
    }
  }

  static async update (req, res) {
    try {
      const id = req.params.id
      const tvShow = await TvShow.update(id, req.body)

      return res.status(201).json(tvShow)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async delete (req, res) {
    try {
      const id = req.params.id

      const tvShow = await TvShow.destroy(id)
      
      if (!tvShow) return res.status(401).json({
        message: 'error not found!'
      })

      return res.status(201).json({
        message: 'Movie success to delete!'
      })
    } catch (error) {
      return res.status(401).json(error)
    }
  }
}

module.exports = TvSeriesController