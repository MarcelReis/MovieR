import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { Movie } from "../../api/types";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  imgContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "133%",
  },
  media: {
    top: "0",
    left: "0",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

type PropsType = {
  movie: Movie;
};

function HomeCard(props: PropsType) {
  const history = useHistory();

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/movie/${props.movie.id}`)}>
        <div className={classes.imgContainer}>
          <CardMedia
            className={classes.media}
            image={props.movie.poster}
            title="Contemplative Reptile"
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="body1" component="h2">
            {props.movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HomeCard;
