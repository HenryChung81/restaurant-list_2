const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const restaurantDB = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < restaurantDB.length; i++) {
    Restaurant.create(restaurantDB[i])

    console.log('done!')
  }
})
