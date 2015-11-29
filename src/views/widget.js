import hbs from 'express-hbs',
import express from 'express';

hbs.register(footer, function(){
  var html = '';
  html += '<footer>';
  html += '<div id="footer-inner"><ul>';
	html += '< a href = "/"> About US </a><li>'
	html += '< a href = "/"> Who Are We</a></li><li>'
	html += '< a href = "/"> Who Are We</a></li><li>'
	html += '< a href = "/"> Who Are We</a></li><li >'
	html += '< a href = "/"> Who Are We</a></li></ul>';
  html += '</div><div id="footer-end"></div></footer>';

  return html;
});

export function widget(){
  return "hello";
};
