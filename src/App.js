import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./Header";
import ListView from "./ListView";

const App = () => {
  return (
      <Router>
        <div>
          <Header />
          <div className="wrapper">
            <Switch>
              <Route exact path={"/"} component={ListView} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
