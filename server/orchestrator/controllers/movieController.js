const axios = require('axios')
const url = 'http://localhost:4001'

class MovieController {
  static async get (req, res) {
    try {
      axios.get(`${url}/movies`)
        .then(response => {
          return res.status(200).json(response.data)
        })
        .catch(err => {
          return res.status(500).json(err)
        })
    } catch (error) {
        
    }
  }

  static async getById (req, res) {
    try {
        
    } catch (error) {
        
    }
  }

  static async create (req, res) {
    try {
        
    } catch (error) {
        
    }
  }

  static async update (req, res) {
    try {
        
    } catch (error) {
        
    }
  }

  static async delete (req, res) {
    try {
        
    } catch (error) {
        
    }
  }
}

module.exports = MovieController