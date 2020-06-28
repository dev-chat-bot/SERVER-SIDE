const request = require("supertest")
const mongoose = require("mongoose")
const User = require("../model/User")
const app = require("../app")
const userExpression = {
  text: "hello",
}
let token

beforeAll(async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/adepsTest",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.error(err)
      }
    }
  )
  const registerTest = await request(app).post("/register").send({
    email: "kalys100@gmail.com",
    username: "kalys100",
    password: "kalys100",
    confirmPassword: "kalys100",
  })
  token = registerTest.body.access_token
})

afterAll(async () => {
  await User.deleteMany({})
})

describe("Dialogflow Connection Test", () => {
  it("Successfully connected to dialogflow", async () => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .set("token", token)
        .send(userExpression)
      expect(response[0].queryResult).toHaveProperty("queryText")
      expect(response[0].queryResult).toHaveProperty("queryFullfilmentText")
    } catch (error) {
      console.log(error)
    }
  })

  it("failed connect to dialogflow because user is not login", async () => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .set("token", null)
        .send(userExpression)
      expect(response.body.error).toContain("Please Login First")
    } catch (error) {
      console.log(error)
    }
  })
})
