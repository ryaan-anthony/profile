// JsonClient provides easy access to json documents
// url String
function JsonClient(url) {
  this.url = url;
  this.client = new XMLHttpRequest;
}

// JsonClient.call
// callback Function to handle the response
JsonClient.prototype.call = function(callback) {
  this.client.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      var response = JSON.parse(this.responseText);
      callback(response);
    }
  };
  this.client.open('GET', this.url);
  this.client.send();
};
