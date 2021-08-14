import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import App from './components/App';
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

const store = createStore(reducers, composeWithDevTools());

const themes = {
    light: '',
    dark: ''
};

render(
    <Provider store={store}>
        <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
            <App />
        </ThemeSwitcherProvider>
    </Provider>,
    document.getElementById('root')
);