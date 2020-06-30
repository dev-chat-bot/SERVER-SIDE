const request = require("supertest")
const mongoose = require("mongoose")
const User = require("../model/User")
const app = require("../app")
const { response } = require("express")
const userExpression = {
  text: "hello",
}
const newIntentData = {
  displayName: "create express",
  trainingPhrasesParts: [
    "configure express",
    "setup express",
    "create hello world in express",
    "build express",
  ],
  messageTexts: ["create express"],
}
let token
let id

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
      expect(response.body).toHaveProperty("queryText")
      expect(response.body).toHaveProperty("fulfillmentText")
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
      expect(response.status).toBe(400)
    } catch (error) {
      console.log(error)
    }
  })

  it("failed connect to dialogflow because user is not login", async () => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .set("token", token)
        .send({ text: "" })
      expect(response.body).toHaveProperty("error")
      expect(response.status).toBe(500)
    } catch (error) {
      console.log(error)
    }
  })
})

describe("Create New Intent Through Backend API", () => {
  it("Successfully created new intent", async () => {
    try {
      const response = await request(app)
        .post("/dialogflow/intents")
        .set("token", token)
        .send(newIntentData)
      const tempArray = response.body.name.split("/")
      id = tempArray[tempArray.length - 1]
      expect(response.body).toHaveProperty("displayName")
      expect(response.body).toHaveProperty("name")
    } catch (error) {
      console.log(error)
    }
  })
})

describe("Get List of ALL Intents in Dialogflow", () => {
  it("Successfully get all intents list", async () => {
    try {
      const response = await request(app)
        .get("/dialogflow/intents")
        .set("token", token)
      expect(response.body[0]).toHaveProperty("name")
    } catch (error) {
      console.log(error)
    }
  })
})

describe("Delete Selected Intent in Dialogflow", () => {
  it("Successfully delete intent", async () => {
    try {
      const response = await request(app)
        .delete(`/dialogflow/intents/${id}`)
        .set("token", token)
      expect(response.body.toContain("deleted"))
    } catch (error) {
      console.log(error)
    }
  })
})
