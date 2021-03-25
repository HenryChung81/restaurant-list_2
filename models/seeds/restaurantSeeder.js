const Restaurant = require('../restaurants')
const restaurantDB = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < restaurantDB.length; i++) {
    Restaurant.create(restaurantDB[i])

    console.log('done!')
  }
})
