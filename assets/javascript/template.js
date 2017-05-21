/**
 * Template provides common tools for manipulating the dom
 * @author Ryan Tulino rtulino@gmail.com
 * @param element_id {string}
 * @constructor
 */
function Template(element_id) {
  this.element = document.getElementById(element_id);
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
   * @param value {string}
   */
  html: function(value) {
    this.element.innerHTML = value;
  },

  /**
   * @param value {string}
   */
  text: function(value) {
    var text = this.builder.text(value);
    this.element.appendChild(text);
  },

  /**
   * @param href {string}
   * @param text {string}
   */
  link: function(href, text) {
    var link_element = this.builder.link(href, text);
    this.element.appendChild(link_element);
  },

  /**
   * @param value {string}
   */
  list: function(value) {
    var list_item = this.builder.element('li');
    list_item.innerHTML = value;
    this.element.appendChild(list_item);
  },

  /**
   * @param href {string}
   * @param text {string}
   */
  link_list: function(href, text) {
    var link_element = this.builder.link(href, text);
    var list_item = this.builder.element('li');
    list_item.appendChild(link_element);
    this.element.appendChild(list_item);
  }
};
