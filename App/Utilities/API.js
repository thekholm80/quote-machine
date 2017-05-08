const axios = require('axios');

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  getQuote: function() {
    const url = 'https://crossorigin.me/http://rickandmortyquotes.eu-central-1.elasticbeanstalk.com/';

    return axios.get(url)
      .then(function(response) {
        
        return response.data;
      })
      .catch(handleError)
  }
}
