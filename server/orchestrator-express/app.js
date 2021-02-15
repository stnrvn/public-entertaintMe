const express = require('express')
const router = require('./routes/index')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`entertaintme app listening at http://localhost:${port}`)
})