const React = require('react');
const PropTypes = require('prop-types');
const API = require('../Utilities/API');
const Loading = require('./Loading');

function QuoteDisplay(props) {
  return (
    <div className='quote-home'>
      <div className='quote fade-in'>
        { props.quote }
      </div>
      <div className='author fade-in-2'>
        { props.author }
      </div>
    </div>
  )
}

QuoteDisplay.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

function Buttons(props) {
  return (
    <div className='button-row'>
      { props.waiting
        ? <div className='button button-loading'>
            Loading
          </div>
        : <div className='button'
            onClick={ props.getNewQuote }>
            New Quote
          </div> }
      <div
        className='button'
        onClick={ props.tweet }>
        Tweet This
      </div>
    </div>
  )
}

Buttons.propTypes = {
  getNewQuote: PropTypes.func.isRequired,
  tweet: PropTypes.func.isRequired
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      quote: 'Random Quote Machine',
      waiting: false
    }

    this.getNewQuote = this.getNewQuote.bind(this);
    this.sendTweet = this.sendTweet.bind(this);
  }

  getNewQuote() {
    this.setState({ waiting: true });

    API.getQuote()
      .then( (data) => {
        this.setState({
          author: '--' + data.who,
          quote: data.what,
          waiting: false
        });
      });
  }

  sendTweet() {
    let tweetContent = this.state.quote + ' --' + this.state.author;
    let tweet = '';

    if (tweetContent.length > 140) {
      tweet = tweetContent.substring(0, 137);
      tweet += '...';
    } else {
      tweet = tweetContent;
    }

    window.open("https://www.twitter.com/intent/tweet?text=" + tweet);
  }

  render() {
    return (
      <div className='home'>
        { this.state.waiting
            ? <Loading />
            : <QuoteDisplay
                quote={ this.state.quote }
                author={ this.state.author } /> }
        <Buttons
          getNewQuote={ this.getNewQuote }
          tweet={ this.sendTweet }
          waiting={ this.state.waiting } />
      </div>
    )
  }
}

module.exports = Home;
