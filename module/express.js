const express = require('express')
const path = require('path');

module.exports = (g) => {
//gives index.html
g.app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})
//makes website public folder public
g.app.use('/Public',express.static('./src/public/'))
//starts website
g.app.listen(g.port, () => {
  console.log(`Wiki listening at http://localhost:${g.port}`)
})
}