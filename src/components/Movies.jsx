/* eslint-disable no-unused-vars */
import { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

import MoviesTable from "./moviesTable";

import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [], // we should initialize this properties to [] it's becouse it will get some time to get data from server
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }, // the column to be sorted and the order we want
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; // in genre we only have 3, here we all adding one of all genres then we access it down in our list of genres
    this.setState({ movies: getMovies(), genres }); //calling backend services and this method will be called when the instance of this method is rendered in the DOM
  }

  deleteHandler = (movie) => {
    // we are going to create valiable we pass all the movies we have in state
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
    this.setState({ currentPage: page }); // we are taking current page to page we clicked
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); // sorting using lodash with arg 1st filtered movies and array of property names  and the sort order

    const movies = paginate(sorted, currentPage, pageSize);
    /** We have to make another movie array of each page with allmovieS(9) * currentPage(1)* pageSize(4)*/
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: movieNumber } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, sortColumn } = this.state;

    if (movieNumber === 0)
      return (
        <p className="text-justify text-uppercase font-weight-bold">
          There is no movie in Database
        </p>
      );

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <h2 className="text-justify text-uppercase font-weight-bold">
            Showing {totalCount} movies in the database
          </h2>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.likeHandler}
            onDelete={this.deleteHandler}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount} // total number of filtered
            pageSize={pageSize} // number of data to put on a page
            currentPage={currentPage} // the page we are on now
            onPageChange={this.handlePageChange} // function to change page
          />
        </div>
      </div>
    );
  }
}

export default Movies;
