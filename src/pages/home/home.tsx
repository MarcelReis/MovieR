import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import imdbAPI from "../../api";
import { Movie } from "../../api/types";
import HomeCard from "../../components/homeCard";

const recommendations = [
  "tt8962124",
  "tt10423460",
  "tt2085059",
  "tt9170638",
  "tt1856010",
  "tt4277922",
  "tt5820976",
  "tt5727208",
  "tt0475784",
  "tt4922804",
  "tt0108778",
  "tt9170386",
];

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    recommendations.forEach((rec) => {
      if (movies.findIndex((movie) => movie.id === rec) !== -1) {
        return;
      }

      imdbAPI
        .getMovie(rec)
        .then((res) => res && setMovies((state) => [...state, res]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box mb={2}>
        <Typography variant="h4" component="h2">
          Recommendations
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.id} container item xs={6} sm={4} md={3}>
            <HomeCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
