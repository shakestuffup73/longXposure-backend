import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  reviewer: { type: Schema.Types.ObjectId, ref: "Profile" },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
}, {
  timestamps: true,
})

const photoSchema = new Schema({
  title: {type: String, required: true},
  cameraBody: {type: String, default: "SonyA7RII"},
  lens: {type: String, required: true},
  aperture: {type: Number, required: true},
  iso: {type: Number, required: true},
  shutterSpeed: {type: String, required: true},
  location: {type: String, required: true},
  comments: [commentSchema],
}, {
  timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema)

export {
  Photo
}