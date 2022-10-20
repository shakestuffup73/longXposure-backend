import { Photo } from '../models/photo.js'
import { Profile } from '../models/profile.js'

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Photo.create(req.body)
  .then(photo => {
    res.json(photo)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function show(req, res) {
  Photo.findById(req.params.id)
  .then(photo => {
    res.json(photo)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function index(req, res) {
  Photo.find({})
  .then(photos => {
    res.json(photos)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function deletePhoto(req, res) {
  Photo.findByIdAndDelete(req.params.id)
  .then(deletedPhoto => {
    res.json(deletedPhoto)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

function updatePhoto(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Photo.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedPhoto => {
    res.json(updatedPhoto)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
}

const createComment = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const photo = await Photo.findById(req.params.id)
    photo.comments.push(req.body)
    await photo.save()

    // Find the newly created comment:
    const newComment = photo.comments[photo.comments.length - 1]

    // Temporarily append profile object to newComment.author:
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile

		// Respond with the newComment:
    res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
  show,
  index,
  deletePhoto as delete,
  updatePhoto as update,
  createComment
}