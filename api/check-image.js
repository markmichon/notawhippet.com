import got from "got"
import dotenv from "dotenv"
dotenv.config()
module.exports = async (req, res) => {
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
        if (res.statusCode === 500) {
          throw new Error(res.body)
        }
        return {
          statusCode: 200,
          body: res.body,
        }
      })
      .catch(err => {
        console.log(err)
        return {
          statusCode: 200,
          body: JSON.stringify({ msg: err }),
        }
      })
  } catch (error) {
    response = error
  }

  return res.json(response)
}
