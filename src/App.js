import React from 'react';
import './App.css';

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      direction: "bounceIn"
    }
    this.getNewQuote = this.getNewQuote.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
  };
  getNewQuote() {
    fetch("https://quota.glitch.me/random",{
      crossDomain:true,
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    })
      .then(results => {return results.json()})
      .then(data => this.updateQuote(data))

  }
  /*
  *  quote : { quote: string, author: string }
  */
  updateQuote(quote) {
    console.log('Quote fetched');
    this.setState({
      direction: "bounceOut"
    }, () => {
    setTimeout(() => {
      this.setState({
        direction: "bounceIn",
        quote: quote.quoteText, //quote.quote,
        author: quote.quoteAuthor //quote.author
      });
    }, 500)
    });
  }

  render() {
    return <div id="quote-box" >
            <p id="text" className={'bounce', this.state.direction}>{this.state.quote}</p>
            <div id="author" className={'bounce', this.state.direction}>{this.state.author}</div>
            <div className="buttons">
              <button id="new-quote" onClick={this.getNewQuote}><b>Wisdom Here</b></button>
              <div><a href="https://twitter.com/share?ref_src=twsrc%5Etfw" id="tweet-quote"><i className="fab fa-twitter-square fa-3x"></i></a></div>
            </div>
          </div> ;
  }
}

export default QuoteMachine;
