const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const urlMovies = 'http://localhost:4001/movies'
const urlSeries = 'http://localhost:4002/series'

class EntertaintmeController{
  static async get (req, res) {
    try {
      const entertaintData = await redis.get('entertaintData:entertaintData')
      if (entertaintData) {
        console.log('data dari redis')
        return res.status(200).json(JSON.parse(entertaintData))
      } else {
        console.log('data belom di cache')

        const dataMovies = await axios.get(urlMovies)
        const dataSeries = await axios.get(urlSeries)
      
        const response = {
          movies: dataMovies.data,
          series: dataSeries.data
        }

        redis.set('entertaintData:entertaintData', JSON.stringify(response))
        return res.status(200).json(response)
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports = EntertaintmeController