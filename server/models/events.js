const mongoose = require('mongoose')

const Schema = mongoose.Schema
const eventsSchema = new Schema ({
    name: String,
    description: String,
    location: String,
    eStart: Date,
    eEnd: Date,
    eDate: Date,
    image: String
})
module.exports = mongoose.model('events', eventsSchema, 'events')

