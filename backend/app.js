const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/123', (req, res) => {
    res.send('Hello World! 123')
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})