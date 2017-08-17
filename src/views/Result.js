import React, { Component } from 'react';
import './Result.css';
var $ = window.jQuery;

class Result extends Component {
  constructor (props){
    super(props);
    this.state = {
      songTitle: null,
      video: null,
      songBlurb: null,
      albumCover: null,
      albumTitle:null,
      albumReleaseDate: null,
    }
  }

  componentDidMount(){
    this.getKanyeTrackId();
  }
  toApp=(songTitle)=>{
    console.log("in Home: ",songTitle);
    this.props.fromApp('');
  }

  findAlternateVideo=(videoId)=>{
    $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyD-ywR2ZNBmGT9MtYinLBPq1PuGi4OTOB4&q=kanye%20west%20"+this.props.songTitle+"&relatedToVideoId="+videoId,
    ( data )=>{
      console.log(data);
      console.log(data.items[0].id.videoId);
      this.setState({video: "https://www.youtube.com/embed/"+videoId})
    })
  }

  youtubeCheck=(videoId)=>{
    console.log(videoId);
    $.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=AIzaSyD-ywR2ZNBmGT9MtYinLBPq1PuGi4OTOB4&id="+videoId,
    ( data )=>{
      console.log(data);
      //console.log(data.items[0].contentDetails.hasOwnProperty('regionRestriction'))
      if ( data.items[0].contentDetails.hasOwnProperty('regionRestriction') ){
        console.log(Object.entries(data.items[0].contentDetails.regionRestriction))
        let allowedOrBlocked = Object.entries(data.items[0].contentDetails.regionRestriction);
        console.log(allowedOrBlocked[0][0]);
        if (allowedOrBlocked[0][0] === "blocked"){
          console.log('video blocked');
          this.findAlternateVideo(videoId)
        } else {
          console.log('allowed')
          this.setState({video: "https://www.youtube.com/embed/"+videoId})
        }
      } else {
        console.log('video not blocked');
        this.setState({video: "https://www.youtube.com/embed/"+videoId})
      }
    })
  }

  getGeniusInfo=(kanyeTrackId)=>{
    var i;
    $.getJSON( "https://api.genius.com/songs/"+kanyeTrackId+"?access_token=cnXaH5W-ZkVrKrzs39tsbqfG7juReC6Ez8qTP5fxmdhpeOtIPZznQPr0sJmbrK0u",
      ( data ) => {
      console.log( data );
      console.log( data.response.song.title );
      console.log( data.response.song.album.name );
      console.log( data.response.song.album.cover_art_url );
      console.log( data.response.song.media );
      this.setState({
        songTitle: data.response.song.title,
        albumTitle: data.response.song.album.name,
        albumCover: data.response.song.album.cover_art_url,
        albumReleaseDate: data.response.song.release_date
      })
      for (i=0; i < data.response.song.media.length; i++){
        console.log(data.response.song.media[i].provider)
        if (data.response.song.media[i].provider.toLowerCase() === "youtube"){
          console.log(i);
          let youtubeVideoId = data.response.song.media[i].url.split("v=");
          console.log(youtubeVideoId);
          this.youtubeCheck(youtubeVideoId[1]);
        }
      }
    });
  }
  getKanyeTrackId=()=>{
    $.getJSON( "https://api.genius.com/search?q=kanye%20west%20"+this.props.songTitle+"&access_token=cnXaH5W-ZkVrKrzs39tsbqfG7juReC6Ez8qTP5fxmdhpeOtIPZznQPr0sJmbrK0u",
      ( data ) => {
      this.getGeniusInfo(data.response.hits[0].result.id);
    });
  }
  render() {
    return (
      <section className="Result">
        <div id="songTitle">{this.state.songTitle}</div>
        <div id="video" className="video-container">
          <iframe width="560" height="315" src={this.state.video} frameborder="0" allowfullscreen> </iframe>
        </div>
        <div id="albumCover"><img src={this.state.albumCover} className="responsive-img" /></div>
        <div id="albumInfo">
          <h2>{this.state.albumTitle}</h2>
          released
          <h2>{this.state.albumReleaseDate}</h2>
        </div>
        <button onClick={this.toApp.bind(this)}>redo</button>
      </section>
    )
  }
}

export default Result;
