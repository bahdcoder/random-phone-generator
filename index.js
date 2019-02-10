const path = require('path')
let DB = require('./utils/db')
const Express = require('express')

const app = new Express()

DB = new DB()

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/phone-numbers', async (req, res) => {
  res.json(DB.getPhoneNumbers(req.query.descending))
})

app.post('/phone-numbers', async (req, res) => {
  res.json(DB.savePhoneNumbers())
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`> App listening on http://localhost:${process.env.PORT || 8080}`)
})
