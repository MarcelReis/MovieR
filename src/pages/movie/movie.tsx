import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import CreateIcon from "@material-ui/icons/Create";

import imdbAPI from "../../api";
import { Movie } from "../../api/types";

const useStyles = makeStyles((theme) => ({
  accordion: {
    flexGrow: 1,
  },
}));

const MoviePage = () => {
  const [movie, setMovie] = useState<Movie | null>();
  const { movieSlug } = useParams<{ movieSlug: string }>();

  const classes = useStyles();

  useEffect(() => {
    imdbAPI.getMovie(movieSlug).then((movie) => setMovie(movie));
  }, [movieSlug]);

  if (!movie) {
    return null;
  }

  console.log("movie :>> ", movie);

  return (
    <div>
      <Typography component={"h1"} variant="h6">
        {movie.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img src={movie.poster} width="100%" alt="" />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" color="textSecondary">
            {movie.plot}
          </Typography>
        </Grid>
      </Grid>

      <Box paddingY="2rem">
        {movie.cast.length > 0 ? (
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="cast-content"
              id="cast-header"
            >
              <Typography>Cast</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {movie.cast.map((star, index) => (
                  <React.Fragment key={star.actor_id}>
                    <ListItem>
                      <ListItemText
                        primary={`${star.actor} - ${star.character}`}
                      />
                    </ListItem>
                    {index === movie.cast.length - 1 ? null : (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : null}

        {movie.technical_specs.length > 0 ? (
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="cast-content"
              id="cast-header"
            >
              <Typography>Technical Specifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {movie.technical_specs.map((spec, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={spec.join(" - ")} />
                    </ListItem>
                    {index === movie.technical_specs.length - 1 ? null : (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : null}
      </Box>

      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        startIcon={<CreateIcon />}
      >
        <Box flexGrow={1}>Write a review</Box>
      </Button>
    </div>
  );
};

export default MoviePage;
