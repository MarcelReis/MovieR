import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { theme } from "./theme";

import MoviePage from "./pages/movie";
import HomePage from "./pages/home";

import AppBar from "./components/appbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <AppBar />

          <Container maxWidth="md">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/movie/:movieSlug" exact>
                <MoviePage />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Container>
          <div style={{ marginBottom: "16px" }} />
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
