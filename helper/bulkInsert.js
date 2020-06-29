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
    keyword: "create mongoose schema",
    data: [
      {
        type: "text",
        content: `
        Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
        `,
      },
      {
        type: "code",
        content: `
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
        `,
      },
    ],
  },
  {
    keyword: "create mongoose connection",
    data: [
      {
        type: "text",
        content: `
          You can connect to MongoDB with the mongoose.connect() method.
          This is the minimum needed to connect the myapp database running locally on the default port (27017). If connecting fails on your machine, try using 127.0.0.1 instead of localhost.
        `,
      },
      {
        type: "code",
        content: `
          mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
        `,
      },
    ],
  },
  {
    keyword: "find mongoose",
    data: [
      {
        type: "text",
        content: `
          Parameters: 
          1. filter «Object|ObjectId»
          2. [projection] «Object|String» optional fields to return, see Query.prototype.select()
          3. [options] «Object» optional see Query.prototype.setOptions()
          4. [callback] «Function»
          Returns:
          «Query»
        `,
      },
      {
        type: "code",
        content: `
          // named john and at least 18
          MyModel.find({ name: 'john', age: { $gte: 18 }});
          
          // executes, passing results to callback
          MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
          
          // executes, name LIKE john and only selecting the "name" and "friends" fields
          MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })
          
          // passing options
          MyModel.find({ name: /john/i }, null, { skip: 10 })
          
          // passing options and executes
          MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});
          
          // executing a query explicitly
          var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
          query.exec(function (err, docs) {});
          
          // using the promise returned from executing a query
          var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
          var promise = query.exec();
          promise.addBack(function (err, docs) {});
        `,
      },
    ],
  },
  {
    keyword: "find by id mongoose",
    data: [
      {
        type: "text",
        content: `
          Parameters:
          1. id «Any» value of _id to query by
          2. [projection] «Object|String» optional fields to return, see Query.prototype.select()
          3. [options] «Object» optional see Query.prototype.setOptions()
          4. [callback] «Function»
          Returns:
          «Query»
        `,
      },
      {
        type: "code",
        content: `
          // find adventure by id and execute
          Adventure.findById(id, function (err, adventure) {});
          
          // same as above
          Adventure.findById(id).exec(callback);
          
          // select only the adventures name and length
          Adventure.findById(id, 'name length', function (err, adventure) {});
          
          // same as above
          Adventure.findById(id, 'name length').exec(callback);
          
          // include all properties except for "length"
          Adventure.findById(id, '-length').exec(function (err, adventure) {});
          
          // passing options (in this case return the raw js objects, not mongoose documents by passing "lean"
          Adventure.findById(id, 'name', { lean: true }, function (err, doc) {});
          
          // same as above
          Adventure.findById(id, 'name').lean().exec(function (err, doc) {});
        `,
      },
    ],
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
