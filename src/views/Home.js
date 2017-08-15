import React, { Component } from 'react';
import './Home.css';
import Giphy from '../components/Giphy'

class Home extends Component {
  render() {
    return (
      <section className="Home">
        <div id="speechBubble"></div>
        <div id="kanyeHead">
          <div id="giphySpace">
            <Giphy searchTerm="kanye+west" />
          </div>
        </div>
        <div id="favoriteSong">
          <div id="question">Favorite Kanye Song?</div>
          <button id="speechInputBtn">Speak</button>
          <input id="songInput" placeholder="speak or type song" type="text"/>
          <button id="textInputBtn">Enter</button>
        </div>
      </section>
    );
  }
}

export default Home;
