import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BaseAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchInput: {
    flexGrow: 1,
    borderRadius: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    background: theme.palette.grey[900],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  lastButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BaseAppBar position="static">
        <Toolbar>
          {searchOpen ? (
            <InputBase
              className={classes.searchInput}
              id="outlined-basic"
              placeholder="Search a movie"
            />
          ) : (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                MovieR
              </Typography>
            </>
          )}

          {searchOpen ? (
            <IconButton
              edge="end"
              className={classes.lastButton}
              color="inherit"
              aria-label="close search"
              onClick={() => setSearchOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              className={classes.lastButton}
              color="inherit"
              aria-label="search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          )}
        </Toolbar>
      </BaseAppBar>
    </div>
  );
}

export default AppBar;
