import logo from './logo.svg';
import {Nav, Navbar, NavbarBrand} from 'reactstrap';
import MovieList from './components/MovieListComponent';
import './App.css';
import { Component } from 'react';

class App extends Component
{
  render(){
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Movie Application</NavbarBrand>
          </div>
        </Navbar>
        <MovieList />
      </div>
    )
  }
}

export default App;
