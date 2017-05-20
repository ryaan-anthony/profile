// Template provides common tools for manipulating the dom
// document_object Object
function Template(document_object) {
  this.document = document_object;
}

// Template.create
// type String element tag
Template.prototype.create = function(type) {
  return this.document.createElement(type);
};

// Template.append
// key String
// node Node
Template.prototype.append = function(key, node) {
  this.document.getElementById(key).appendChild(node);
};

// Template.set
// key String
// value String
Template.prototype.set = function(key, value) {
  this.document.getElementById(key).innerHTML = value;
};

// Template.set_link
// key String
// url String
// value String
Template.prototype.create_link = function(key, url, value) {
  var element = this.create('a');
  element.href = url;
  element.innerHTML = value;
  this.append(key, element);
};
