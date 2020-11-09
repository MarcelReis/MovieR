import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import StarIcon from "@material-ui/icons/Star";
import CreateIcon from "@material-ui/icons/Create";

import { Movie } from "../../api/types";
import imdbAPI from "../../api";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    height: "fit-content",
    width: "100%",
  },
  ratingTitle: {
    marginBottom: "0.25rem",
  },
  rating: {
    display: "flex",
    justifyContent: "space-around",
  },
  rated: {
    width: "100%",
    height: "fit-content",
  },
  submit: {
    flexGrow: 1,
  },
}));

type PropsType = {
  movie?: Movie;
  isOpen: boolean;
  toggle: () => void;
};

const initalState: {
  poster: number;
  special_effect: number;
  cast: number;
  script: number;
} = {
  poster: 0,
  special_effect: 0,
  cast: 0,
  script: 0,
};

let ratings = JSON.parse(localStorage.getItem("sentRatings") || "[]");

const ratingItems: Array<{
  name: string;
  key: "poster" | "special_effect" | "cast" | "script";
}> = [
  { name: "Poster", key: "poster" },
  { name: "Special Effects", key: "special_effect" },
  { name: "Cast", key: "cast" },
  { name: "Script", key: "script" },
];

function ReviewMovie(props: PropsType) {
  const [review, setReview] = useState(initalState);
  const [submited, setSubmited] = useState(ratings.includes(props.movie?.id));

  const classes = useStyles();

  const updateRating = (name: string, value: number) => {
    setReview((review) => {
      const newReview: { [key: string]: number } = {};
      newReview[name] = value;
      return { ...review, ...newReview };
    });
  };

  const closeHandler = () => {
    setReview(initalState);
    props.toggle();
  };

  const submitHandler = () => {
    imdbAPI.sendRating(review).then(() => {
      ratings = Array.from(new Set([...ratings, props.movie?.id]));

      localStorage.setItem("sentRatings", JSON.stringify(ratings));

      setSubmited(true);
      props.toggle();
    });
  };

  if (submited) {
    return (
      <Paper className={classes.rated}>
        <Box padding={2}>
          <Typography>You already rated this show</Typography>
        </Box>
      </Paper>
    );
  }

  if (!submited && !props.isOpen) {
    return (
      <Box width="100%">
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<CreateIcon />}
          onClick={props.toggle}
        >
          <Box flexGrow={1}>Write a review</Box>
        </Button>
      </Box>
    );
  }

  return props.isOpen ? (
    <Paper className={classes.root}>
      <Box mb={2}>
        <Typography component="h2" variant="h5" align="center">
          New Rating
        </Typography>
      </Box>

      {ratingItems.map((item) => {
        return (
          <Box key={item.key} mb={3}>
            <Typography
              className={classes.ratingTitle}
              component="div"
              variant="h6"
            >
              {item.name}
            </Typography>
            <Rating
              className={classes.rating}
              name={`rating-${item.key}`}
              value={review[item.key]}
              onChange={(_, newValue) => updateRating(item.key, newValue || 1)}
              icon={<StarIcon fontSize="large" />}
            />
          </Box>
        );
      })}

      <ButtonGroup fullWidth size="large" variant="contained">
        <Button onClick={closeHandler}>Cancel</Button>
        <Button
          onClick={submitHandler}
          className={classes.submit}
          color="primary"
        >
          Send Rating
        </Button>
      </ButtonGroup>
    </Paper>
  ) : null;
}

export default ReviewMovie;
