const request = require("supertest")
const mongoose = require("mongoose")
const User = require("../model/User")
const app = require("../app")
const userExpression = {
  text: "hello",
}
let token

describe("Dialogflow Connection Test", () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/adepsTest',{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
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
    await mongoose.connection.close()
  })

  it("Successfully connected to dialogflow", async done => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .set("token", token)
        .send(userExpression)
      expect(response.body).toEqual(expect.any(String))
      done()
    } catch (error) {
      done(error)
    }
  })

  it("failed connect to dialogflow because user is not login", async done => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .set("token", null)
        .send(userExpression)
      expect(response.body.error).toContain("Please Login First")
      expect(response.status).toBe(400)
      done()
    } catch (error) {
      done(error)
    }
  })

  it("failed connect to dialogflow because user is not login", async done => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .set("token", token)
        .send({ text: "" })
      expect(response.body).toHaveProperty("error")
      expect(response.status).toBe(500)
      done()
    } catch (error) {
      done(error)
    }
  })
})
