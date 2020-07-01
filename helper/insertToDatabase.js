const Documentation = require("../model/Documentation")

module.exports = {
  insertDocumentation: async (guide, snippet, messageTexts) => {
    console.log(guide, snippet, "dalam function")
    if (guide) {
      if (snippet) {
        console.log("snippet", snippet)
        const newData = {
          keyword: messageTexts[0],
          data: [
            {
              type: "text",
              content: guide,
            },
            {
              type: "code",
              content: snippet,
            },
          ],
        }

        const documentation = new Documentation(newData)
        const newDocumentation = await documentation.save()
        console.log(newDocumentation)
      } else {
        /* istanbul ignore next */
        const newData = {
          keyword: messageTexts[0],
          data: [
            {
              type: "text",
              content: guide,
            },
          ],
        }
        /* istanbul ignore next */
        const documentation = new Documentation(newData)
        /* istanbul ignore next */
        const newDocumentation = await documentation.save()
      }
    }
  },
}
