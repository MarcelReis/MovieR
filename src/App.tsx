import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";

import MoviePage from "./pages/movie";
import HomePage from "./pages/home";
import imdbAPI from "./api";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: amber,
  },
});

function App() {
  useEffect(() => {
    imdbAPI.search("gems").then((movies) => {
      console.log("movies :>> ", movies);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
