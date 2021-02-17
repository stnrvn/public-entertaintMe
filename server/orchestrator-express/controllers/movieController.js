const axios = require('axios')
const url = 'http://localhost:4001/movies'
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static async get (req, res) {
    try {
      const moviesData = await redis.get('movies:data')
      if (moviesData) {
        console.log('data dari redis') 
        return res.status(200).json(JSON.parse(moviesData))
      } else {
        console.log('data belom di cache')
        axios.get(url)
        .then(response => {
          redis.set('movies:data', JSON.stringify(response.data))
          return res.status(200).json(response.data)
        })
        .catch(err => {
          return res.status(500).json(err)
        })
      }
    } catch (error) {
      return res.status(500).json(err)
    }
  }

  static async getById (req, res) {
    try {
      const id = req.params.id
      const movieById = await redis.get('movieById:dataById')

      if (movieById) {
        return res.status(200).json(JSON.parse(movieById))
      } else {
        axios.get(`${url}/${id}`)
        .then(response => {
          redis.set('movieById:dataById', JSON.stringify(response.data))
          return res.status(200).json(response.data)
        })
        .catch(err => {
          return res.status(500).json(err)
        })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async create (req, res) {
    try {
      await redis.del('movies:data')

      const response = await axios.post(url ,{
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      })

      return res.status(201).json(response.data.ops)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async update (req, res) {
    try {
      await redis.del('movies:data')

      const id = req.params.id
      const opt = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }

      const response = await axios.put(`${url}/${id}`, opt)

      return res.status(201).json(response.data)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async delete (req, res) {
    try {
      await redis.del('movies:data')
      const id = req.params.id
      
      await axios.delete(`${url}/${id}`)

      return res.status(201).json('movies success to delete')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports = MovieController