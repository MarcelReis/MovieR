import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import imdbAPI from "./api";
import { theme } from "./theme";

import MoviePage from "./pages/movie";
import HomePage from "./pages/home";

import AppBar from "./components/appbar";

function App() {
  useEffect(() => {
    imdbAPI.search("gems").then((movies) => {
      console.log("movies :>> ", movies);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <AppBar />

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
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
