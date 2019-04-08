// Parse prediction response
export function parsePrediction(predictions) {
  // Iterate over predictions and return only the prediction with the highest probability
  return predictions.reduce((winner, current) =>
    current.probability > winner.probability ? current : winner
  )
}
export function buildPredictionString({ tagName, probability }) {
  if (tagName != "Negative")
    return `We are ${Math.floor(
      probability * 100
    )}% confident that the image is of a ${tagName}.`
  return `Are you sure that's a dog? We are ${Math.floor(
    probability * 100
  )}% sure that the image isn't of an Italian Greyhound, Whippet, or Greyhound.`
}
