const dialogflow = require("dialogflow")
const projectId = process.env.PROJECT_ID
const sessionId = process.env.SESSION_ID
const languageCode = process.env.LANGUAGE_CODE
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

class DocumentationController {
  static async talkToDialogflow(req, res) {
    const { text } = req.body

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: languageCode,
        },
      },
    }

    const responses = await sessionClient.detectIntent(request)
    console.log("Detected intent")
    const result = responses[0].queryResult
    console.log("query:", result.queryText)
    console.log("response:", result.fulfillmentText)
    console.log
    res.json(result)
  }
}

module.exports = DocumentationController
