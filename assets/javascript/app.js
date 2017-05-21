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
   * @param type {string}
   * @returns {*|Element}
   */
  $element = function(type) {
    return $('').builder.element(type);
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
    json.summary.each(function(value) {
      $('summary').element('li', value);
    });
    json.certifications.each(function(value) {
      $('certifications').element('li', value['type'] + ' (' + value['id'] + ') - ' + value['date']);
    });
    json.experience.each(function(value) {
      $('experience').element('div', '<u>' + value.role + '</u> (' + value.start_date + ' to ' + value.end_date + ')');
      $('experience').element('div', value.company + ' ' + value.location);
      $('experience').element('br', '');
      value.projects.each(function(project) {
        $('experience').element('div', project.title);
        if (project.homepage) $('experience').link(project.homepage, project.homepage);
        $('experience').element('div', project.description);
        $('experience').element('p', 'Responsibilities:');
        var container = $element('ul');
        project.responsibilities.each(function(responsibility) {
          $(container).element('li', responsibility);
        });
        $('experience').append(container);
      });
    });
    json.additional_links.each(function(value) {
      $('additional-links').link_list(value, value);
    });
    var elapsed_time = (performance.now() - start_time).toFixed(2);
    $('footnote').html(json.footnote.replace(/%s/g, elapsed_time));
  },
  start_time = performance.now();

new JsonClient('resume.json').call(initialize);
