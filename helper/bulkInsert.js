const mongoose = require("mongoose")
const Documentation = require("../model/Documentation")

mongoose.connect("mongodb://localhost:27017/adeps", { useNewUrlParser: true })

const code = `
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
`
documentationRaw = [
  {
    keyword: "apollo client initialization",
    data: "This is how to setup apollo client initialization",
  },
  {
    keyword: "apollo client mutation",
    data: "This is how to setup apollo client mutation",
  },
  {
    keyword: "mongoose configuration",
    data: code,
  },
]

documentationRaw.forEach(async (element) => {
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
