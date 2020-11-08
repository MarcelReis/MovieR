import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import MoviePage from "./pages/movie";
import HomePage from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movie/:movieSlug" exact>
          <MoviePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
