const got = require("got")
export async function handler(event, context, callback) {
  const body = JSON.parse(event.body)
  const fileBuffer = Buffer.from(body["file"], "base64")
  let response
  try {
    response = await got
      .post(process.env.AZURE_PREDICTION_URL, {
        headers: {
          "Prediction-key": process.env.AZURE_PREDICTION_KEY,
        },
        body: fileBuffer,
      })
      .then(res => {
        console.log(res)
        if (res.statusCode === 500) {
          throw new Error(res.body)
        }
        return {
          statusCode: 200,
          body: res.body,
        }
      })
      .catch(err => {
        return {
          statusCode: 200,
          body: err,
        }
      })
  } catch (error) {
    // console.log(error)
    response = error
  }

  return response
}
