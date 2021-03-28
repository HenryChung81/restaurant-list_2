const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurants')

router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLocaleLowerCase()
  Restaurant.find()
    .lean()
    .then((Restaurant) => {
      const searchRestaurant = Restaurant.filter((Restaurant) => {
        return (
          Restaurant.name.toLocaleLowerCase().includes(keyword) ||
          Restaurant.category.toLocaleLowerCase().includes(keyword)
        )
      })
      res.render('index', { restaurants: searchRestaurant, keyword: keyword })
    })
    .catch((error) => console.log(error))
})

module.exports = router
