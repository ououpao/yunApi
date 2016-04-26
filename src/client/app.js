import 'codemirror/lib/codemirror.css';
import 'antd/lib/index.css';
require('./sass/app.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Router from './router';

class App {

  constructor(options) {
  }

  render (element) {
    var appRootElement = React.createElement(Router);

    if (element) {
      ReactDOM.render(appRootElement, element);
      return;
    }

    return ReactDOMServer.renderToString(appRootElement);
  }

  renderToDOM(element) {
    if (!element) {
      throw new Error('App.renderToDOM: element is required!');
    }
    this.render(element);
  }

  renderToString() {
    return this.render();
  }
}

var attachElement = document.getElementById('react-app');
var app= new App();

app.renderToDOM(attachElement);
