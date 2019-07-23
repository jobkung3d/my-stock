import React, { Component } from 'react';
import Home from './page';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component{
  renderRouter(){
    return (
      <Switch>
        <Route exact path="/"  component={Home} />
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
