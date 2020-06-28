const mongoose = require("mongoose")

const documentationSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true],
  },
  data: {
    type: String,
    required: [true],
  },
})

module.exports = mongoose.model("Documentation", documentationSchema)
