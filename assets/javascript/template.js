/**
 * Template provides common tools for manipulating the dom
 */
function Template() {}

/**
 * $template.dom
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

/**
 * $template.insert
 * @param key String
 * @param value String
 */
Template.prototype.insert = function(key, value) {
  this.dom.insert(key, value);
};

/**
 * $template.insert_link
 * @param key String
 * @param url String
 * @param value String
 */
Template.prototype.insert_link = function(key, url, value) {
  var element = this.dom.link(url, value);
  this.dom.append(key, element);
};

/**
 * $template.insert_link_list
 * @param key String
 * @param values Array
 */
Template.prototype.insert_link_list = function(key, values) {
  for (var i = 0; i < values.length; i++) {
    var link_element = this.dom.link(values[i], values[i]);
    var list_container = this.dom.element('li');
    list_container.appendChild(link_element);
    this.dom.append(key, list_container);
  }
};

/**
 * $template.insert_list
 * @param key String
 * @param values Array
 */
Template.prototype.insert_list = function(key, values) {
  for (var i = 0; i < values.length; i++) {
    var list_container = this.dom.element('li');
    list_container.innerHTML = values[i];
    this.dom.append(key, list_container);
  }
};
