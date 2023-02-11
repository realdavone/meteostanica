import mongoose from 'mongoose'
const { Schema } = mongoose

const RecordSchema = new Schema({
  temperature: {
    type: String,
    required: true
  },
  humidity: {
    type: String,
    required: true
  },
  pressure: {
    type: String,
    required: true
  },
  gasResistance: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  }
}, { collection: 'records' })

export default mongoose.model('Recrod', RecordSchema)