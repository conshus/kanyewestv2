import React, { Component } from 'react';


class Giphy extends Component {
  constructor (props){
  super(props);
  this.state = {
      gotGiphy: null,
    }
  }

  getGiphy (searchTerm){
    this.setState({gotGiphy:'https://media1.giphy.com/media/3o7TKKAGOOwwuFWZJC/giphy.gif'})
  }

  displayGiphy (searchTerm){
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${searchTerm}`)
    .then (function(response) { return response.json(); })
    .then((json)=>this.setState({gotGiphy:json.data.image_original_url}))
  }

  render() {
    console.log('search term:',this.props.searchTerm);
    return (
      <span>
        {this.state.gotGiphy ? <img id="giphy" className="animated zoomInUp" src={this.state.gotGiphy} alt="Kanye Giphy"/>
 : this.displayGiphy(this.props.searchTerm)}
            {/* {this.state.gotGiphy ? this.displayGiphy(this.props.searchTerm) : null} */}
          </span>
    );
  }
}

export default Giphy;
