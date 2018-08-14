import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers/';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const middleware = applyMiddleware(promise(), thunk);

const store = createStore(allReducers, middleware);

ReactDOM.render(
	<LocaleProvider locale={enUS}>
		<Provider store={store}>
			<App />
		</Provider>
	</LocaleProvider>,
	document.getElementById('root')
);
