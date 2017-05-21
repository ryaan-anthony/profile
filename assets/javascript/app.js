var
  /**
   * Helper method for accessing Template objects
   * @param element_id {string}
   * @returns {Template}
   */
  $ = function(element_id) {
    return new Template(element_id)
  },
  /**
   * Build the interface from the json response
   * @param json
   */
  initialize = function(json) {
    $('name').text(json.name);
    $('title').text(json.title);
    $('email').link('mailto:'+json.email, json.email);
    $('introduction').text(json.introduction);
    json.summary.each(function(value){
      $('summary').list(value);
    });
    json.certifications.each(function(value){
      $('certifications').list(value['type'] + ' (' + value['id'] + ') - ' + value['date']);
    });

    // TODO: Experience section

    // TODO: Personal projects section

    json.additional_links.each(function(value){
      $('additional-links').link_list(value, value);
    });
    var elapsed_time = ((performance.now() - start_time) / 1000).toFixed(4);
    $('footnote').html(json.footnote.replace(/%s/g, elapsed_time));
  },
  start_time = performance.now();

new JsonClient('resume.json').call(initialize);
