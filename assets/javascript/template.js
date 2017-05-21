/**
 * Template provides common tools for manipulating the dom
 * @author Ryan Tulino rtulino@gmail.com
 * @param element_id {string}
 * @constructor
 */
function Template(element_id) {
  this.container = element_id instanceof Object ? element_id : document.getElementById(element_id);
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
  },

  /**
   * @param type {string}
   * @param value {string}
   */
  element: function(type, value) {
    var element = this.builder.element(type);
    element.innerHTML = value;
    this.append(element);
  },

  /**
   * @param value {string}
   */
  html: function(value) {
    this.container.innerHTML = value;
  },

  /**
   * @param value {string}
   */
  text: function(value) {
    var text = this.builder.text(value);
    this.append(text);
  },

  /**
   * @param href {string}
   * @param text {string}
   */
  link: function(href, text) {
    var link_element = this.builder.link(href, text);
    this.append(link_element);
  },

  /**
   * @param href {string}
   * @param text {string}
   */
  link_list: function(href, text) {
    var link_element = this.builder.link(href, text);
    var list_item = this.builder.element('li');
    list_item.appendChild(link_element);
    this.append(list_item);
  }
};
