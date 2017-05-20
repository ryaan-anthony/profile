// Template provides common tools for manipulating the dom
function Template() {}

/**
 * Template.dom
 * Encapsulate dom manipulation logic here.
 */
Template.prototype.dom = {
  /**
   * $template.dom.element
   * type String
   */
  element: function(type)
  {
    return document.createElement(type);
  },
  /**
   * $template.dom.append
   * key String
   * node Node
   */
  append: function(key, node)
  {
    document.getElementById(key).appendChild(node);
  },
  /**
   * $template.dom.insert
   * key String
   * value String
   */
  insert: function(key, value)
  {
    document.getElementById(key).innerHTML = value;
  },
  /**
   * $template.dom.link
   * key String
   * value String
   */
  link: function(url, value)
  {
    var element = this.element('a');
    element.href = url;
    element.innerHTML = value;
    return element;
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
  var element = this.dom.link(url, value);
  this.dom.append(key, element);
};

// Template.insert_link_list
// key String
// values Array
Template.prototype.insert_link_list = function(key, values) {
  for (var i = 0; i < values.length; i++) {
    var link_element = this.dom.link(values[i], values[i]);
    var list_container = this.dom.element('li');
    list_container.appendChild(link_element);
    this.dom.append(key, list_container);
  }
};

// Template.insert_list
// key String
// values Array
Template.prototype.insert_list = function(key, values) {
  for (var i = 0; i < values.length; i++) {
    var list_container = this.dom.element('li');
    list_container.innerHTML = values[i];
    this.dom.append(key, list_container);
  }
};
