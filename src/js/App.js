import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import 'antd/dist/antd.min.css';

import RootComponent from './components/RootComponent';

const store = configureStore();

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
          <RootComponent />
      </Provider>
    );
  }
  
}