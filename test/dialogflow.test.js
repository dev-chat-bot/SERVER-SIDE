const request = require("supertest")
const app = require("../app")
const userExpression = {
  text: "hello",
}

describe("Dialogflow Connection Test", () => {
  it("Successfully connected to dialogflow", async () => {
    try {
      const response = await request(app)
        .post("/dialogflow")
        .send(userExpression)
      expect(response[0].queryResult).toHaveProperty("queryText")
      expect(response[0].queryResult).toHaveProperty("queryFullfilmentText")
    } catch (error) {
      console.log(error)
    }
  })
})
