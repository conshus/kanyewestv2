import React, { Component } from 'react';


class Giphy extends Component {
  constructor (props){
  super(props);
  this.state = {
      gotGiphy: null,
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
    console.log('search term:',this.props.searchTerm);
    return (
      // <div id="giphySpace">
      <div>
        {this.state.gotGiphy ? <img id={this.props.giphyId} className="" src={this.state.gotGiphy} alt="Giphy Pic"/>
 : this.displayGiphy(this.props.searchTerm)}
     </div>
      //</div>
    );
  }
}

export default Giphy;
