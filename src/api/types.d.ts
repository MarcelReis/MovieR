export type BasicInfoResult = {
  title: string;
  image: string;
  id: string;
};

export type SearchResult = {
  titles: Array<BasicInfoResult>;
  names: Array<BasicInfoResult>;
  companies: Array<BasicInfoResult>;
};

type MovieCast = {
  actor: string;
  actor_id: string;
  character: string;
};

export type Movie = {
  id: string;
  title: string;
  year: string;
  length: string;
  rating: string;
  rating_votes: string;
  poster: string;
  plot: string;
  trailer: {
    id: string;
    link: string;
  };
  cast: Array<MovieCast>;
  technical_specs: Array<Array<string>>;
};
