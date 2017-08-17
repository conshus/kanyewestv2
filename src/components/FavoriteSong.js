import React, { Component } from 'react';
import Giphy from './Giphy'

class FavoriteSong extends Component {
  constructor (props){
  super(props);
  this.state = {
      placeholder: 'speak or type song',
      listening: false,
      webSpeechError: false,
    }
  }

  toHome(){
    this.props.fromHome(this.songInput.value);
  }

  textInputBtnPressed = () =>{
    console.log('input text:', this.songInput.value);
  }
  speechInputBtnPressed = () =>{
    // Start Speech Recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window) ) {
      console.log('no speech recognition');
      this.setState({webSpeechError:true})
    } else {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        // var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
        // var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent
        let recognition = new SpeechRecognition();
        // let speechRecognitionList = new SpeechGrammarList();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        this.setState({placeholder:'Listening...', listening:true})
        console.log('listening:', this.state.listening);

        recognition.onresult = (event) => {
          // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
          // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
          // It has a getter so it can be accessed like an array
          // The [last] returns the SpeechRecognitionResult at the last position.
          // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
          // These also have getters so they can be accessed like arrays.
          // The [0] returns the SpeechRecognitionAlternative at position 0.
          // We then return the transcript property of the SpeechRecognitionAlternative object

          var last = event.results.length - 1;
          var song = event.results[last][0].transcript;

          //remove spaces if any
          //color = color.toLowerCase().replace(/\s/gi,'');
          //this.setState({placeholder:song})
          this.songInput.value = song;
          console.log('text: ' + song);

          console.log('Confidence: ' + event.results[0][0].confidence);
          this.toHome();
        }

        recognition.onspeechend = () => {
          recognition.stop();
          this.setState({listening:false})

        }

        recognition.onerror = function(event) {
          this.songInput.value = 'Error occurred in recognition: ' + event.error;
        }
    }
  }

  render(){
    console.log('listening:', this.state.listening);
    return (
      <section id="favoriteSong">
        {this.state.webSpeechError ? <div id="giphyOhNoSpace">
          <div onClick={() => this.setState({webSpeechError: false})}>x close</div>
          <Giphy giphyId="giphyOhNo" searchTerm="oh+no" />
          {/* <h1>OH NO!</h1> */}
          Sorry, your browser doesn't support the Web Speech API. You can type in the name of the song, or try Chrome.
        </div> : null}
        <div id="question">Favorite Kanye Song?</div>
        <span id="speechInputBtn" className={this.state.listening ? "btn-floating btn-large red pulse" : "btn-floating btn-large red"} onClick={this.speechInputBtnPressed.bind(this)}>
          <i className="material-icons">mic</i>
        </span>
        <input id="songInput" placeholder={this.state.placeholder} type="text" ref={(input) => { this.songInput = input; }}/>
        {/* <span id="textInputBtn" className="btn-floating btn-large red" onClick={this.textInputBtnPressed.bind(this)}> */}
        <span id="textInputBtn" className="btn-floating btn-large red" onClick={this.toHome.bind(this)}>
          enter
        </span>
      </section>
    )
  }
}

export default FavoriteSong;
