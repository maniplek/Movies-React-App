import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  deleteHandler = (movie) => {
    // we are going to create valiable we pass all the movies we have in state except movie we have passed
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }); //we are wrapping our state with new obj
  };
  render() {
    const { length: movieNumber } = this.state.movies;
    if (movieNumber === 0)
      return (
        <p className="text-justify text-uppercase font-weight-bold">
          There is no movie in Database
        </p>
      );
    return (
      <div>
        <h2 className="text-justify text-uppercase font-weight-bold">
          Showing {movieNumber} movies in the database
        </h2>

        <table className="table">
          <thead>
            <tr>
              <th>Tittle</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.deleteHandler(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
