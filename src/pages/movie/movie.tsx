import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import StarIcon from "@material-ui/icons/Star";

import imdbAPI from "../../api";
import { Movie } from "../../api/types";
import ReviewMovie from "../../components/reviewMovie";

const useStyles = makeStyles((theme) => ({
  accordion: {
    flexGrow: 1,
  },
}));

const MoviePage = () => {
  const { movieSlug } = useParams<{ movieSlug: string }>();
  const [movie, setMovie] = useState<Movie | null>();
  const [loading, setLoading] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    imdbAPI
      .getMovie(movieSlug)
      .then((movie) => {
        setMovie(movie);
      })
      .finally(() => setLoading(false));
  }, [movieSlug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="25%" />
      </Box>
    );
  }

  if (!movie || !movie.title) {
    return (
      <Typography variant="h6" component="h1">
        Error
      </Typography>
    );
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" paddingY=".5rem">
        <Box display="flex" alignContent="center">
          <Typography component={"h1"} variant="h5">
            {movie.title}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Box paddingRight="0.75rem">
            <StarIcon color="primary" />
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              {movie.rating}
              <Typography variant="caption" color="textSecondary">
                /10
              </Typography>
            </Typography>
            <Typography
              component="p"
              variant="caption"
              color="textSecondary"
              align="center"
            >
              {movie.rating_votes}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img src={movie.poster} width="100%" alt="" />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" color="textPrimary">
            {movie.plot}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item sm={12} md={6}>
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
        </Grid>

        <Grid container item sm={12} md={6}>
          <ReviewMovie
            movie={movie}
            isOpen={openReview}
            toggle={() => setOpenReview((s) => !s)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MoviePage;
