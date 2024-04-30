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
      favoriteMovies: []
    }
  }

  addToFavorite = (movie) => {
    const isAlreadyFavorite = this.state.favoriteMovies.some(favMovie => favMovie.id === movie.id);
    if (!isAlreadyFavorite) {
      this.setState(prevState => ({
        favoriteMovies: [...prevState.favoriteMovies, movie]
      }));
    }

    console.log(this.state.favoriteMovies);
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
              removeFromFavorites={this.removeFromFavorites} />} />
            <Route path="/favorites" element={<Favorites favoriteMovies={this.state.favoriteMovies}
            removeFromFavorites={this.removeFromFavorites}/>} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
