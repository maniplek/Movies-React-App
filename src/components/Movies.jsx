import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

  deleteHandler = (movie) => {
    // we are going to create valiable we pass all the movies we have in state except movie we have passed
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }); //we are wrapping our state with new obj
  };

  likeHandler = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // console.log("page......", page)
    this.setState({ currentPage: page }); // we are taking current page to page we clicked
  };

  render() {
    const { length: movieNumber } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (movieNumber === 0)
      return (
        <p className="text-justify text-uppercase font-weight-bold">
          There is no movie in Database
        </p>
      );

    const movies = paginate(allMovies, currentPage, pageSize);
    /** We have to make another movie array of each page with allmovieS(9)
     * currentPage(1)
     * pageSize(4)
     */

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
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onToggleLike={() => this.likeHandler(movie)}
                  />
                </td>
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

        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;
