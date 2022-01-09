import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const WidgetDivs = document.querySelectorAll('.stacksboard_widget');

// Inject our React App into each
WidgetDivs.forEach((Div) => {
  ReactDOM.render(
    <React.StrictMode>
      <App domElement={Div} />
    </React.StrictMode>,
    Div,
  );
});

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
