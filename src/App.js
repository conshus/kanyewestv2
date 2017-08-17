import React, { Component } from 'react';
import Home from './views/Home';
import Result from './views/Result';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      songTitle: null,
    }
  }
  setResult=(songTitle)=>{
    console.log("in App: ",songTitle);
    this.setState({songTitle: songTitle});

  }
  render() {
    return (
      <div className="App">
        {this.state.songTitle ?
          <Result songTitle={this.state.songTitle} fromApp={this.setResult}/>
          : <Home fromApp={this.setResult}/>
        }
      </div>
    );
  }
}

export default App;
