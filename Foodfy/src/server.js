const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const data = require('./data')

server.use(express.static('./src/public'))
server.set("view engine", "njk")

nunjucks.configure("./src/views", {
  express:server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res) => {
  const cards = data.map(card => ({
      image: card.image,
      title: card.title,
      author: card.author
    }))

    console.log(cards)
  
  return res.render('home', { cards })
})

server.get('/recipes', (req, res) => {
  const cards = data.map(card => ({
    image: card.image,
    title: card.title,
    author: card.author
  }))

  return res.render('recipes', { recipes:true, cards })
})

server.get('/about', (req, res) => {

  return res.render('about', { about:true })
})

server.get('/recipes/:id', (req, res) => {
  const { id } = req.params

  const recipe = data[id-1]

  return res.render('recipe', { recipes:true, recipe })
})

server.listen(5000, () => {
  console.log("server is running")
})