/**
 * JsonClient provides easy access to json documents
 * @author Ryan Tulino rtulino@gmail.com
 * @param url {string}
 * @constructor
 */
function JsonClient(url) {
  this.url = url;
  this.client = new XMLHttpRequest;
}

/**
 * @param callback {Function}
 */
JsonClient.prototype.call = function(callback) {
  this.client.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE) {
      var response = JSON.parse(this.responseText);
      callback(new JsonObject(response));
    }
  };
  this.client.open('GET', this.url);
  this.client.send();
};

/**
 * JsonObject is a basic data model
 * @param data
 * @constructor
 */
function JsonObject(data) {
  for (var key in data) {
    if (data.hasOwnProperty(key) === false) continue;
    var value = data[key];
    if (value instanceof Array || value instanceof Object) value = new JsonObject(value);
    this[key] = value;
  }
}
/**
 * @param callback {Function}
 */
JsonObject.prototype.each = function(callback) {
  for (var i = 0; i < Object.keys(this).length; i++) {
    callback(this[i]);
  }
};
