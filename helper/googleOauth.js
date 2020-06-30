/* istanbul ignore next */
function verificationToken(token) {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);
  
    return new Promise((resolve, reject) => {
      async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        resolve(payload);
      }
      verify().catch(reject);
    });  
}

module.exports = verificationToken