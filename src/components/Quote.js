import React, { Component } from 'react';


class Quote extends Component {
  constructor (props){
  super(props);
  this.state = {
      quote: 'Loading quote...',
    }
  }

  displayGiphy (searchTerm){
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${searchTerm}`)
    .then (function(response) { return response.json(); })
    .then((json)=>{
      this.setState({gotGiphy:json.data.image_original_url})
    })
  }

  render() {
    return (
      <div id="speechBubble">
        {this.state.quote}
      </div>
    );
  }
}

export default Quote;
