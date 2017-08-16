import React, { Component } from 'react';
import './Home.css';
import Giphy from '../components/Giphy'
import FavoriteSong from '../components/FavoriteSong'
import Quote from '../components/Quote'

class Home extends Component {
  render() {
    return (
      <section className="Home">
        <Quote />
        <div id="kanyeHead">
          <div id="giphyKanyeHeadSpace">
            <Giphy giphyId="giphyKanye" searchTerm="kanye+west" />
          </div>
        </div>
        <FavoriteSong />
      </section>
    );
  }
}

export default Home;
