import React from 'react';
import { renderToString } from 'react-dom/server';
import { InMemory } from 'hickory';
import createConfig from 'curi';
import { Navigator } from 'curi-react';
import routes from './src/routes';
import renderFunction from './src/renderFunction';

export default function(req, res) {
  const history = InMemory({ locations: [ req.url ]})
  const config = createConfig(history, routes);
  config.ready()
    .then((response) => {
      const markup = renderToString(
        <Navigator response={response} config={config} children={renderFunction} />
      );
      res.send(renderFullPage(markup));
    })
    .catch(err => {
      console.log('uh oh', err);
    })
}

function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 
        <title>Curi Server Rendering</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="https://unpkg.com/react@15.5.3/dist/react.min.js"></script>
        <script src="https://unpkg.com/react-dom@15.5.3/dist/react-dom.min.js"></script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
  `;
}
