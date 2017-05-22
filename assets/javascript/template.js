/**
 * Template provides common tools for manipulating the dom
 * @author Ryan Tulino rtulino@gmail.com
 * @param element {string|Element}
 * @constructor
 */
function Template(element) {
  this.container = element instanceof Element ? element : document.getElementById(element);
}

Template.prototype = {
  builder: {
    /**
     * @param type {string}
     * @returns {Element}
     */
    element: function(type) {
      return document.createElement(type);
    },

    /**
     * @param url {string}
     * @param value {string}
     * @returns {*|Element}
     */
    link: function(url, value) {
      var element = this.element('a');
      element.href = url;
      element.innerHTML = value;
      return element;
    },

    /**
     * @param value {string}
     * @returns {Text}
     */
    text: function(value) {
      return document.createTextNode(value);
    }
  },

  /**
   * @param child {Element}
   */
  append: function(child) {
    this.container.appendChild(child);
    return this;
  },

  /**
   * @param type {string}
   * @param value {string|Function}
   */
  element: function(type, value) {
    var element = this.builder.element(type);
    if (typeof value === 'function') {
      value(element);
    } else {
      element.innerHTML = value;
    }
    return this.append(element);
  },

  /**
   * @param value {string}
   */
  html: function(value) {
    this.container.innerHTML = value;
    return this;
  },

  /**
   * @param href {string}
   * @param text {string}
   */
  link: function(href, text) {
    var link_element = this.builder.link(href, text);
    return this.append(link_element);
  },

  /**
   * @param callback {Function}
   */
  list: function(callback) {
    var list = this.builder.element('ul');
    callback(list);
    return this.append(list);
  },

  /**
   * @param value {string}
   */
  text: function(value) {
    var text = this.builder.text(value);
    return this.append(text);
  }
};
