const Movie = require('../models/Movies')

class MovieController {
  static async get (req, res) {
    try {
      const movies = await Movie.get()

      if (!movies) return res.status(400).json({
          message: 'not found!'
      })

      console.log(movies, 'get')
      return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getById (req, res) {
    try {
      const id = req.params.id

      const movie = await Movie.getById(id)

      res.status(200).json(movie)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async create (req, res) {
    try {
      const movie = await Movie.create(req.body)

      return res.status(201).json(movie)
    } catch (error) {
      return res.status(401).json(error)
    }
  }

  static async update (req, res) {
    try {
      const id = req.params.id
      const updatedData = await Movie.getById(id)

      const movie = await Movie.update(id, req.body)

      return res.status(201).json(updatedData)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async delete (req, res) {
    try {
      const id = req.params.id

      const deletedData = await Movie.getById(id)
  
      const movie = await Movie.destroy(id)
      
      if (!movie) return res.status(401).json({
        message: 'error not found!'
      })

      return res.status(201).json(deletedData[0])
    } catch (error) {
      return res.status(401).json(error)
    }
  }
}

module.exports = MovieController