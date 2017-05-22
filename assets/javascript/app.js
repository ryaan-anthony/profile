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

    $('header').element('span', json.name)
      .element('strong', json.title)
      .element('right', function(el) {
        $(el).link('mailto:'+json.email, json.email)
      }).element('hr', null);

    $('introduction').text(json.introduction);

    $('summary').list(function(ul){
      json.summary.each(function(value){ $(ul).element('li', value) });
    });

    $('certifications').list(function(ul){
      json.certifications.each(function(certification){
        $(ul).element('li', certification['type'] + ' (' + certification['id'] + ') - ' + certification['date'])
      });
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

        $('experience').list(function(ul){
          project.responsibilities.each(function(responsibility){
            $(ul).element('li', responsibility)
          });
        });
      });
    });


    $('footer').list(function(ul){
      json.additional_links.each(function(value){
        $(ul).element('li', function(li) {
          $(li).link(value, value);
        });
      });
    }).element('center', function(el) {
      var elapsed_time = performance.now() - start_time;
      var html_string = json.footnote.replace(/%s/g, elapsed_time.toFixed(2));
      $(el).html(html_string);
    });
  },
  start_time = performance.now();

new JsonClient('resume.json').call(initialize);
