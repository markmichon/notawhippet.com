import React, { useState, useCallback } from "react"
import ky from "ky"
import { parsePrediction, buildPredictionString } from "../utils"
import { useDropzone } from "react-dropzone"
import compress from "image-file-compress"
import DogIcon from "./DogIcon"
import styled from "styled-components"

const Container = styled.div`
  border-width: 2px;
  border-color: #ccc;
  border-style: dashed;

  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  text-align: center;
`

const Button = styled.button`
  border: none;
  display: block;
  background-color: grey;
  border-radius: 0.25rem;
  width: 100%;
  padding: 0.25rem 1rem;
`

const Highlight = styled.em`
  font-weight: bold;
  font-style: normal;
  color: hsl(344, 65%, 51%);
`

const Image = styled.img`
  border-radius: 8px;
  max-width: 100%;
`

const Retry = styled.button`
  display: block;
  border-radius: 4px;
  border: none;
  background-color: #d32f5a;
  color: white;
  padding: 8px 16px;
  margin: 8px 0;
`

//TODO
// limit filesize to 4mb
// limit to jpg, png, bmp

function Uploader(props) {
  const [image, setImage] = useState(null)
  const [prediction, setPrediction] = useState(null)

  const onDrop = useCallback(async acceptedFiles => {
    console.log("---Dropped---")
    if (acceptedFiles[0]) {
      const { path } = await compress(acceptedFiles[0], {
        rotate: true,
        max_width: 800,
      })
      setImage(path)
      let datauri = path.split(",")[1]
      // fetch(`/.netlify/functions/check-image`, {
      //   method: "POST",
      //   body: JSON.stringify({ file: datauri }),
      // })
      //   // PERFORM STATUS CODE CHECK, then retry if needed
      //   .then(res => {
      //     console.log(res)
      //     if (!res.ok) {
      //       throw new Error(res.statusText)
      //     }
      //     return res.json()
      //   })
      //   .then(data => {
      //     console.log(data)
      //     let predictionResponse = parsePrediction(data.predictions)
      //     setPrediction(predictionResponse)
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })

      try {
        const parsed = await ky
          .post(`/.netlify/functions/check-image`, {
            retry: 2,
            json: { file: datauri },
          })
          .json()
        let predictionResponse = parsePrediction(parsed.predictions)
        setPrediction(predictionResponse)
      } catch (error) {
        // do error
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["image/jpeg", "image/png", "image/bmp"],
  })

  return (
    <>
      {!image ? (
        <Container {...getRootProps({ isDragActive })}>
          <input id="upload" {...getInputProps()} />
          <DogIcon color="hsl(264, 8%, 12%)" />
          <label htmlFor="upload">
            <Highlight>Browse</Highlight> or drag and drop it here.
          </label>
        </Container>
      ) : (
        <div>
          <Image src={image} />
          {!prediction ? <p>Loading...</p> : buildPredictionString(prediction)}
          <Retry
            onClick={e => {
              setImage(null)
              setPrediction(null)
            }}
          >
            Try another image
          </Retry>
        </div>
      )}
    </>
  )
}

export default Uploader
