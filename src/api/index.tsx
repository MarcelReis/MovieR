import { BasicInfoResult, Movie, SearchResult } from "./types";

class IMDB_API {
  private URL =
    "https://imdb-internet-movie-database-unofficial.p.rapidapi.com";

  private Headers = new Headers({
    "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAKUTEN_API_KEY as string,
  });

  public async search(search: string): Promise<BasicInfoResult[] | null> {
    try {
      const res = await fetch(`${this.URL}/search/${encodeURI(search)}`, {
        headers: this.Headers,
      });

      const { titles } = (await res.json()) as SearchResult;

      return titles;
    } catch {
      return null;
    }
  }

  public async getMovie(movieID: string): Promise<Movie | null> {
    try {
      const res = await fetch(`${this.URL}/filme/${encodeURI(movieID)}`, {
        headers: this.Headers,
      });

      const movie = (await res.json()) as Movie;

      return movie;
    } catch {
      return null;
    }
  }
}

const imdbAPI = new IMDB_API();

export default imdbAPI;
