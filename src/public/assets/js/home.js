define(function(require) {
  // var $ = require('jquery');
  var fastclick = require('fastclick');
  var foundation = require('foundation');
  var modernizr = require('modernizr');
  $ = jQuery;

  var init = () => {
    //  initialize foundation js
    $(document).foundation();
    // splashscreen function
    setTimeout(() => {
      document.getElementById('splashscreen').style.display = 'none'
    }, 3000);

    //  handling footer accordion
    const accordionContentElement = document.querySelectorAll('.accordion');
    Object.keys(accordionContentElement).forEach((keys) => {
      const element = accordionContentElement[keys];
      if (document.documentElement.clientWidth > 640) {
        element.querySelector('a').style['pointer-events'] = 'none';
        element.querySelector('a').style.cursor = 'default';
        element.querySelector('.content').className += ' active';
      }
    });

  };

  return {
    init: init
  };
  
});
