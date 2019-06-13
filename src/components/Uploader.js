import React, { useState, useCallback, useEffect } from "react"
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

// Recursive fetch to retry on 500 error
// (hacky workaround to an occasional lambda first-run issue)

const fetchPlus = (url, options, retry) =>
  fetch(url, options).then(res => {
    if (res.ok) {
      return res.json()
    }
    if (retry > 0 && res.status === 500) {
      console.log("Retrying...")
      return fetchPlus(url, options, retry - 1)
    }
    return Promise.reject({
      status: res.status,
      statusText: res.statusText,
    })
  })

//TODO
// limit filesize to 4mb
// limit to jpg, png, bmp

function Uploader(props) {
  const [image, setImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState(null)

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    let datauri = null
    let path = null
    if (acceptedFiles.length > 0) {
      try {
        const data = await compress(acceptedFiles[0], {
          rotate: true,
          max_width: 800,
          output_type: "image/jpg",
        })
        path = data.path
      } catch (err) {
        setError("Something went wrong processing the image. Please try again.")
      }
      if (path) {
        setImage(path)
        datauri = path.split(",")[1]
        try {
          let parsed = await fetchPlus(
            `/.netlify/functions/check-image`,
            {
              method: "POST",
              body: JSON.stringify({ file: datauri }),
              headers: {
                "content-type": "application/json",
              },
            },
            1
          )
          let predictionResponse = parsePrediction(parsed.predictions)
          setPrediction(predictionResponse)
        } catch (error) {
          console.log(error)
          setError("Server failed to response, try again")
        }
      } else {
        console.log("path not set")
        // setError("File was not the correct type")
      }
    } else {
      setError("File type not accepted, try an image")
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["image/jpeg", "image/png", "image/bmp"],
  })

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Retry
          onClick={e => {
            setImage(null)
            setPrediction(null)
            setError(null)
          }}
        >
          Try another image
        </Retry>
      </div>
    )
  }
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
