import React, { Component } from 'react';
import './Home.css';
import Giphy from '../components/Giphy'
import FavoriteSong from '../components/FavoriteSong'
import Quote from '../components/Quote'

class Home extends Component {
  toApp=(songTitle)=>{
    console.log("in Home: ",songTitle);
    this.props.fromApp(songTitle);
  }
  render() {
    return (
      <section className="Home">
        <Quote />
        <div id="kanyeHead">
          <div id="giphyKanyeHeadSpace">
            <Giphy giphyId="giphyKanye" searchTerm="kanye+west" />
          </div>
        </div>
        <FavoriteSong fromHome={this.toApp}/>
      </section>
    );
  }
}

export default Home;
