import React from 'react';
import ReactDOM from 'react-dom/client';
import RSP from './RSP';

// ReactDOM.render(<RSP />, document.querySelector('#root'));
ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RSP />
  </React.StrictMode>
);
