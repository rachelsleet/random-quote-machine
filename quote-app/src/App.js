import React from 'react';
import './App.css';

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Blank",
      author: "Blank"
    }
    this.getNewQuote = this.getNewQuote.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
  };
  getNewQuote() {
    fetch("http://quotes.rest/qod.json",{
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
      quote: quote.contents.quotes[0].quote,//quote.quote,
      author: quote.contents.quotes[0].author//quote.author
    });
  }

  render() {
    return <div id="quote-box">
            <p id="text">{this.state.quote}</p>
            <div id="author">{this.state.author}</div>
            <div><button id="new-quote" onClick={this.getNewQuote}>Click for Wisdom</button></div>
            <div><button id="tweet-quote">Tweet</button></div>
          </div> ;
  }
}

export default QuoteMachine;
