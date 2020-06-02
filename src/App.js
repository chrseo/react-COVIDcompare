import React from "react";
import InfoPage from "./InfoPage.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:countryName" component={InfoPage} />
      </Switch>
    </Router>
  );
}

export default App;
