import React, { useEffect, useState } from "react";
import { Form } from "./pages/form";
import { Submissions } from "./pages/submissions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/submissions`}>
            <Submissions />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Form />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
