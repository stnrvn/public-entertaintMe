const axios = require('axios')
const url = 'http://localhost:4002/series'
const Redis = require('ioredis')
const redis = new Redis()

class TvSeriesController {
  static async get (req, res) {
    try {
      const seriesData = await redis.get('series:dataSeries')
      if (seriesData) {
        console.log('data dari redis')
        return res.status(200).json(JSON.parse(seriesData))
      } else {
        console.log('data belom di cache')
        axios.get(url)
        .then(response => {
          redis.set('series:dataSeries', JSON.stringify(response.data))
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
      await redis.del('movies:data')

      const id = req.params.id
      const seriesById = await redis.get('seriesById:seriesById')

      if (seriesById) {
        console.log('data dari redis')
        return res.status(200).json(JSON.parse(seriesById))
      } else {
        console.log('data belom di cache')
        axios.get(`${url}/${id}`)
        .then(response => {
          redis.set('seriesById:seriesById', JSON.stringify(response.data))
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
      await redis.del('series:dataSeries')

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
      await redis.del('series:dataSeries')

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
      await redis.del('series:dataSeries')
      const id = req.params.id
      
      await axios.delete(`${url}/${id}`)

      return res.status(201).json('series success to delete')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports = TvSeriesController