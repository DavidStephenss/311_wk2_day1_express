
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const { users } = require('./state')
let counter = users.length+1

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





/* BEGIN - create routes here */
app.get('/users',(req, res) => {
 res.json(users)
})

app.get('/users/1', (req, res) => {
 res.json(users[0])
}) 

app.get('/users/5', (req, res) => {
 res.json(users[4])
}) 

app.post('/users', (req, res) => {
   console.log(req.body)
   users.push({_id: counter++, ...req.body})
   res.json(users[users.length-1])
})

app.put('/users', (req, res) => {
  users[0].name = "David Stephens"
  res.json(users[0])
})

app.post('/users', (req, res) => {
  users.push(req.body)
})

app.delete('/users', (req, res) => {
  users.unshift()
 res.send('deleted')
})

//Path vars
app.get('/users/:userId', (req, res) => {
  res.json(users[req.params.userId-1])
//   app.get('/users/:userId', (req, res) => {
//   let id = parseInt(req.params.userId)
//   for (let i = 0; i < users.length; i++) {
//     if (users[i]._id === id) {
//       res.json(users[i])
//     }
//   }
// })
})

app.put('/users/:userId', (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.paramsuserId)))
  let user = foundUser[0]
  user.name = req.body.name ? req.body.name : user.name
  user.avatar = req.body.avatar ? req.body.avatar : user.avatar
  user.occupation = req.body.occupation ? req.body.occupation : useroccupation
  res.json(user)
})

app.delete('/users/:userId', (req, res) => {
   let foundUser = (users.filter( user => user._id === parseInt(req.params.userId)))
  let user = foundUser[0]
  if (user) {
    user.isActive = false
    res.send("The deed is done")
  } else {
      res.status(400).json({ message: `No member with the id of ${req.params.userId}`})
    }
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`My app is listening on port ${port} at ${new Date}!`))