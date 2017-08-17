import React, { Component } from 'react';
var $ = window.jQuery
let counter=1;

class Quote extends Component {
  constructor (props){
  super(props);
  this.state = {
      quote: 'Loading quote...',
      quoteLoaded: false,
    }
  }

  getQuote(sectionIndex, success, error){
    let quoteArray=[];
    console.log('get Quote');
    $.get({
        url: "https://en.wikiquote.org/w/api.php",
        dataType: "jsonp",
        data: {
            format: "json",
            action: "parse",
            noimages: "",
            pageid: 4649,
            section: 1
        },

        success: (result, status)=>{
            var quotes = result.parse.text["*"];
            // var quoteArray = []
            // console.log(quotes)
            // Find top level <li> only
            var $lis = $(quotes).find('li:not(li li)');
            $lis.each(function() {
                // Remove all children that aren't <b>
                $(this).children().remove(':not(b)');
                // var $bolds = $(this).find('b');
                quoteArray.push($(this).html());
                // If the section has bold text, use it.  Otherwise pull the plain text.
                // if($bolds.length > 0) {
                //     quoteArray.push($bolds.html());
                // } else {
                //     quoteArray.push($(this).html());
                // }
            });
            //success({ titles: result.parse.title, quotes: quoteArray });
          //console.log(quoteArray)
          counter++;
          if (counter < 16)
          {
            this.getQuote(counter);
          } else{
            this.setState({quote:quoteArray[Math.floor(Math.random() * (quoteArray.length))], quoteLoaded: true});
          }
        },
        error: function(xhr, result, status){
            error("Error getting quotes");
        }
    });

  }

  componentDidMount(){
    console.log('componentDidMount');
    this.getQuote(1);
  }

  render() {
    return (
      <div id="speechBubbleSpace" className={this.state.quoteLoaded ? "zoomIn" : "null"}>
        <div id="speechBubble">
          {/* <span className="talkTriangle"></span> */}
          <div className="quote">
            {this.state.quote}
          </div>
        </div>
        <div id="speechBubbleTriangle"></div>
      </div>
    );
  }
}

export default Quote;
