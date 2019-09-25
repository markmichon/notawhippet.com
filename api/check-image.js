import got from "got"
import dotenv from "dotenv"
dotenv.config()
module.exports = async (req, res) => {
  // console.log(req.body)
  const { file } = req.body
  if (file) console.log("file found")
  let fileBuffer
  try {
    console.log("decoding file")
    fileBuffer = Buffer.from(file, "base64")
  } catch (err) {
    console.log("Decoding Failed:", err)
  }

  let response
  try {
    response = await got
      .post(process.env.AZURE_PREDICTION_URL, {
        headers: {
          "Prediction-key": process.env.AZURE_PREDICTION_KEY,
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      })
      .then(res => {
        console.log("Post complete", res.statusCode)
        let { body, statusCode } = res
        if (statusCode === 200) {
          return {
            statusCode,
            body: JSON.parse(body),
          }
        }
        throw new Error(res.body)
      })
      .catch(err => {
        console.log("Error:", err)
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