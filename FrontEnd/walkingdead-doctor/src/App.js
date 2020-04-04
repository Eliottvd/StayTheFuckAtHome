import React from 'react';
import './App.css';
import Home from "./pages/Home";
import MyMap from "./pages/Map";
import { BrowserRouter, Route, Switch } from "react-router-dom";


const App = (props)  => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/map" component={MyMap}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
