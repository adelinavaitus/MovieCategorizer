import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieListComponent';
import './App.css';
import Favorites from './components/FavoritesComponent';
import MenuPage from './components/MenuComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      genres: []
    }
  }

  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

    fetch(GENRE_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ genres: data.genres });
      })
      .catch(error => {
        console.error('Error fetching genres from API:', error);
      });
  }

  addToFavorite = (movie) => {
    const isAlreadyFavorite = this.state.favoriteMovies.some(favMovie => favMovie.id === movie.id);
    if (!isAlreadyFavorite) {
      this.setState(prevState => ({
        favoriteMovies: [...prevState.favoriteMovies, movie]
      }));
    }
  }

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
          <MenuPage />
          <Routes>
            <Route path="/" element={<MovieList favoriteMovies={this.state.favoriteMovies}
              addToFavorite={this.addToFavorite}
              removeFromFavorites={this.removeFromFavorites}
              genres={this.state.genres} />} />
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
