import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "@material-ui/core/utils/debounce";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

import imdbAPI from "../../api";
import { BasicInfoResult } from "../../api/types";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "0",
    transform: "translateY(100%)",
    width: "100%",
  },
  avatar: {
    backgroundColor: theme.palette.grey[500],
    borderRadius: theme.spacing(1),
  },
  text: {
    color: theme.palette.primary.main,
  },
}));

const debounceSearch = debounce(
  async (
    search: string,
    setState: (result: BasicInfoResult[] | null) => void
  ) => {
    const res = await imdbAPI.search(search);

    setState(res);
  },
  1000
);

type PropsType = {
  open: boolean;
  searchString: string;
};

function SearchList(props: PropsType) {
  const [results, setResults] = useState<BasicInfoResult[] | null>([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (props.searchString === "") {
      debounceSearch.clear();
      setResults(null);
      setLoading(false);
    } else {
      setLoading(true);
      debounceSearch(props.searchString, (result: BasicInfoResult[] | null) => {
        setResults(result);
        setLoading(false);
      });
    }
  }, [props.searchString]);

  useEffect(() => {
    debounceSearch.clear();
  }, []);

  if (loading) {
    return (
      <Paper className={classes.root} elevation={0}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circle" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
              <Skeleton variant="text" />
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circle" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
              <Skeleton variant="text" />
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circle" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
              <Skeleton variant="text" />
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    );
  }

  return results ? (
    <Paper className={classes.root} elevation={0}>
      <List>
        {results?.map((movie, index) => (
          <React.Fragment key={movie.id}>
            <ListItem
              color="primary"
              component={RouterLink}
              to={`/movie/${encodeURI(movie.id)}`}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar} alt="" src={movie.image} />
              </ListItemAvatar>
              <ListItemText className={classes.text} primary={movie.title} />
            </ListItem>
            {index === results.length - 1 ? null : (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  ) : null;
}

export default SearchList;
