const express = require('express')
const path = require('path')
const cool = require('cool-ascii-faces')

const port = process.env.PORT || 5006

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log(`Rendering 'pages/index' for route '/'`)
  res.render('pages/index')
})

app.get('/cool', (req, res) => {
  console.log(`Rendering a cool ascii face for route '/cool'`)
  res.send(cool())
})

app.get('/times', (req, res) => {
    const times = process.env.TIMES || 5
    console.log(`Rendering a count from 1 to ${times} for route '/times'`)
    let result = ''
    for (let i = 1; i<= times; i++) {
        result += i + ' '
    }
    res.send(result)
})

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: gracefully shutting down')
  if (server) {
    server.close(() => {
      console.log('HTTP server closed')
    })
  }
})
