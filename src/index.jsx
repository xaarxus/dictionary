import React from 'react';
import './styles/light/index.sass';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import App from './components/App';

const store = createStore(reducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);