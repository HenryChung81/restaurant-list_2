const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurants')

// create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  if (req.body.image.length === 0) {
    req.body.image =
      'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png'
  }

  // const {
  //   name,
  //   name_en,
  //   category,
  //   image,
  //   location,
  //   phone,
  //   google_map,
  //   rating,
  //   description,
  // } = req.body
  // return Restaurant.create({
  //   name,
  //   name_en,
  //   category,
  //   image,
  //   location,
  //   phone,
  //   google_map,
  //   rating,
  //   description,
  // })
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// show
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  // const {
  //   name,
  //   name_en,
  //   category,
  //   image,
  //   location,
  //   phone,
  //   google_map,
  //   rating,
  //   description,
  // } = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      // restaurant.name = name
      // restaurant.name_en = name_en
      // restaurant.category = category
      // restaurant.image = image
      // restaurant.location = location
      // restaurant.phone = phone
      // restaurant.google_map = google_map
      // restaurant.rating = rating
      // restaurant.description = description
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
