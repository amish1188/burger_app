import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import ingredientsReducer from './store/reducers/ingredients';
import orderReducer from './store/reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: ingredientsReducer,
  order: orderReducer
})

const logger = store => {
  return next => {
      return action => {
          const result = next(action);
          return result;
      }
  }
}

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)

));

const app = (
  <Provider store={store}> {/* provider always wraps everything*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);

