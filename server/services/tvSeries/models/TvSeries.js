const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class TvShow {
  static get() {
    return getDatabase().collection('tv-series').find().toArray()
  }
  static getById(id) {
    return getDatabase().collection('tv-series').find({"_id": ObjectId(id)}).toArray()
  }
  static create(tvShow) {
    return getDatabase().collection('tv-series').insertOne(tvShow)
  }
  static update(id, data) {
    return getDatabase().collection('tv-series').updateOne(
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
    return getDatabase().collection('tv-series').deleteOne({"_id": ObjectId(id)})
  }
}

module.exports = TvShow