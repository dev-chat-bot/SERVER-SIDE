const mongoose = require("mongoose")
const Documentation = require("../model/Documentation")
const documentationDataFromJson = require("../db.json")

mongoose.connect("mongodb://localhost:27017/adeps", { useNewUrlParser: true })

documentationDataFromJson.forEach(async (element) => {
  const documentation = new Documentation({
    keyword: element.keyword,
    data: element.data,
  })

  try {
    const newDocumentation = await documentation.save()
    console.log(newDocumentation)
  } catch (error) {
    console.log(error)
  }
})
