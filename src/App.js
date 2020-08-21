import React, { useEffect, useState } from "react";
import { Form } from "./pages/form";
import { Submissions } from "./pages/submissions";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router basename="/">
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Route exact path={`/`} component={Form}></Route>
        <Route path={`/submissions`} component={Submissions}></Route>
      </div>
    </Router>
  );
}

export default App;
