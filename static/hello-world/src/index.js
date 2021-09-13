import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

import '@atlaskit/css-reset';
import ImageFetcherComponents from './Image_fetcher_components';
import RenderStoredImages from './DisplayImages';

ReactDOM.render(
  <React.StrictMode>
    
    <RenderStoredImages/>
  </React.StrictMode>,
  document.getElementById('root')
);
