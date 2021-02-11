const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Movie {
  static get() {
    return getDatabase().collection('movies').find().toArray()
  }
  static getById(id) {
    return getDatabase().collection('movies').find({"_id": ObjectId(id)}).toArray()
  }
  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }
  static update(id, data) {
    return getDatabase().collection('movies').updateOne(
      {"_id": ObjectId(id)},
      {$set: {
        "title": data.title,
        "overview": data.overview,
        "poster_path": data.poster_path,
        "popularity": data.popularity,
        "tags": data.tags
      }}
    )
  }
  static destroy(id) {
    return getDatabase().collection('movies').deleteOne({"_id": ObjectId(id)})
  }
}

module.exports = Movie