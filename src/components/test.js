import React, { Component } from "react"

export default class Test extends Component {
  handleClick = evt => {
    fetch(`/.netlify/functions/check-image`)
      .then(res => res.json())
      .then(console.log)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}
