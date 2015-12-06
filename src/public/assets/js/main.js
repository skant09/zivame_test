requirejs.config({
  paths: {
    $: '../foundation/js/vendor/jquery',
    fastclick: '../foundation/js/vendor/fastclick',
    modernizr: '../foundation/js/vendor/modernizr',
    foundation: '../foundation/js/foundation.min'
  }
});

define([
  // Load our app module and pass it to our definition function
  '$',
  'home'
], ($, home) => {
  home.init();
});
