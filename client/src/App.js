import React, { Component } from 'react';
import Home from './page';
import ProductList from './page/products/list';
import ProductAdd from './page/products/add';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component{
  renderRouter(){
    return (
      <Switch>
        <Route exact path="/"  component={Home} /> 
        <Route exact path="/products"  component={ProductList} /> 
        <Route exact path="/products/Add"  component={ProductAdd} /> 
      </Switch>
    )
  }

  render(){
    return (
      <BrowserRouter>{this.renderRouter()}</BrowserRouter>
    );
  }
}

export default App
