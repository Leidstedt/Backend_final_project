
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PersonModel = new Schema({
  project_id: { type: String, required: true, },
  gender: { type: String, required: true, },
  birthyear: { type: Number, required: true, },
  subproject: { type: String, required: true, },
  company: { type: String, required: true, },
  ERP_IT: { type: Number, },
  horizontal_principles: { type: Number, },
  management: { type: Number, },
  business_intelligence: { type: Number, },
  vocational_training: { type: Number, },
  education_hours: { type: Number, required: true, },

})

module.exports = new mongoose.model('Person', PersonModel)