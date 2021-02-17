const express = require('express')
const { connect } = require('./config/mongodb')
const router = require('./routes/index')

const app = express()
const port = process.env.PORT || 4002

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

connect().then(async () => {
  console.log('mongo berhasil connect!')
  
  app.use('/', router)

  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  })
})