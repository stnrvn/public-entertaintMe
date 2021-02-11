const { MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri, { useUnifiedTopology: true })

    await client.connect()

    const db = client.db('entertaint-me')

    database = db

    return db
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  connect,
  getDatabase() {
    return database
  }
}
  