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

    $('page-title').text(json.page_title);

    $('header').element('span', json.name)
      .element('strong', json.title)
      .element('right', function(right) {
        $(right).link('mailto:'+json.email, json.email)
      }).element('hr', null);

    $('introduction').text(json.introduction);

    $('summary').element('ul', function(ul){
      json.summary.each(function(value){ $(ul).element('li', value) });
    });

    $('certifications').element('ul', function(ul){
      json.certifications.each(function(certification){
        $(ul).element('li', certification['type'] + ' (' + certification['id'] + ') - ' + certification['date'])
      });
    });

    json.companies.each(function(company) {
      $('experience').element('dl', function(dl) {

        $(dl).element('dt', function(dt) {
          $(dt).element('u', company.role)
            .element('span', ' (' + company.start_date + ' to ' + company.end_date + ')')
            .element('div', company.name + ' ' + company.location)
            .element('br', null);
        });

        company.projects.each(function(project) {
          $(dl).element('dt', function(dt) {
            $(dt).element('div', project.title);
            if (project.homepage) $(dt).link(project.homepage, project.homepage);
            $(dt).element('div', project.description)
              .element('p', 'Responsibilities:')
              .element('ul', function (ul) {
                project.responsibilities.each(function (responsibility) {
                  $(ul).element('li', responsibility)
                });
              });
          });
        });
      });
    });

    $('footer').element('ul', function(ul){
      json.additional_links.each(function(value){
        $(ul).element('li', function(li) { $(li).link(value, value) });
      });
    }).element('center', function(el) {
      var elapsed_time = performance.now() - start_time;
      var html_string = json.footnote.replace(/%s/g, elapsed_time.toFixed(2));
      $(el).html(html_string);
    });
  },
  start_time = performance.now();

new JsonClient('resume.json').call(initialize);
