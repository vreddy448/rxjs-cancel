import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import Header from "./components/header";
import Container from "./components/container";
import './App.css';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store} >
      <Header />
      <Container />
    </Provider>
) 
}

export default App;
