import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import StoreConfig from './Redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = StoreConfig();

const jsx = (
    <Provider store= {store}>
        <App />
    </Provider>
);

ReactDOM.render(
    (jsx),document.getElementById('root'));
registerServiceWorker();
