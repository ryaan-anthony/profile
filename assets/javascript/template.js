// Template provides common tools for manipulating the dom
function Template() {}

/**
 * Template.dom
 * Encapsulate dom manipulation logic here.
 */
Template.prototype.dom = {
  /**
   * $template.builder.element
   * type String
   */
  element: function(type) {
    return document.createElement(type);
  },
  /**
   * $template.builder.append
   * key String
   * node Node
   */
  append: function(key, node) {
    document.getElementById(key).appendChild(node);
  },
  /**
   * $template.builder.insert
   * key String
   * value String
   */
  insert: function(key, value) {
    document.getElementById(key).innerHTML = value;
  }
};

// Template.insert
// key String
// value String
Template.prototype.insert = function(key, value) {
  this.dom.insert(key, value);
};

// Template.insert_link
// key String
// url String
// value String
Template.prototype.insert_link = function(key, url, value) {
  var element = this.dom.element('a');
  element.href = url;
  element.innerHTML = value;
  this.dom.append(key, element);
};

// Template.insert_list
// key String
// values Array
Template.prototype.insert_list = function(key, values) {
  for (var i = 0; i < values.length; i++) {
    var element = this.dom.element('li');
    element.innerHTML = values[i];
    this.dom.append(key, element);
  }
};
