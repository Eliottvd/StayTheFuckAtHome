import React from 'react';
import './App.css';
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";


const App = (props)  => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
