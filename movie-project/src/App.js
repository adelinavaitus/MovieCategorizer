import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieListComponent';
import './App.css';
import Favorites from './components/FavoritesComponent';
import Menu from './components/MenuComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      genres: []
    }
  }

  // Fetch genres from the API when the component mounts
  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

    fetch(GENRE_URL)
      .then(response => response.json())
      .then(data => {
        // update the state with the fetched genres
        this.setState({ genres: data.genres });
      })
      .catch(error => {
        console.error('Error fetching genres from API:', error);
      });
  }

  // Add a movie to the favorites list, but first we verify if it is already in the list. if not, we add it
  addToFavorite = (movie) => {
    const isAlreadyFavorite = this.state.favoriteMovies.some(favMovie => favMovie.id === movie.id);
    if (!isAlreadyFavorite) {
      this.setState(prevState => ({
        favoriteMovies: [...prevState.favoriteMovies, movie]
      }));
    }
  }

  // Remove a movie from the favorites list
  removeFromFavorites = (movie) => {
    const updatedFavoriteMovies = this.state.favoriteMovies.filter(
      favMovie => favMovie.id !== movie.id
    );

    this.setState({
      favoriteMovies: updatedFavoriteMovies
    });
  }

  render() {
    return (
      <Router>
        <div>
          {/* Render the Menu component */}
          <Menu />
          {/* Define routes for different components */}
          <Routes>
            {/* Route for the MovieList component */}
            <Route path="/" element={<MovieList favoriteMovies={this.state.favoriteMovies}
              addToFavorite={this.addToFavorite}
              removeFromFavorites={this.removeFromFavorites}
              genres={this.state.genres} />} />
              
            {/* Route for the Favorites component */}
            <Route path="/favorites" element={<Favorites favoriteMovies={this.state.favoriteMovies}
              addToFavorite={this.addToFavorite}
              removeFromFavorites={this.removeFromFavorites}
              genres={this.state.genres} />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
