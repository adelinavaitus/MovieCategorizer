import React, { Component } from 'react';
import { Button, Dropdown, Form, DropdownToggle, Input, DropdownItem, DropdownMenu } from 'reactstrap';
import { DropdownOptions } from './DropdownOptions';
import MovieComponent from './MovieComponent';

class MovieList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            searchedMovies: [],
            isModalMovieOpen: false,
            isDropDownOpen: false,
            selectedOption: '',
            inputValue: '',
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    };

    handleOptionSelect = (option) => {
        this.setState({
            selectedOption: option
        });
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    handleSearch = () => {
        this.setState({
            startDisplayIndex: 0
        })

        switch (this.state.selectedOption) {
            case DropdownOptions.TITLE:
                this.searchTitle();
                break;
            case DropdownOptions.RELEASE_DATE:
                this.searchReleaseDate();
                break;
            case DropdownOptions.GENRE:
                this.searchGenre();
                break;
            default:
                this.searchTitle();
        }
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.handleSearch();
        }
    }

    searchTitle() {
        const searchedMovies = this.state.movies.filter((movie) =>
            movie.title.toLowerCase().includes(this.state.inputValue.toLowerCase()));

        this.setState({ searchedMovies });
    }

    searchReleaseDate() {
        const searchedMovies = this.state.movies.filter((movie) =>
            movie.release_date.includes(this.state.inputValue));

        this.setState({ searchedMovies });
    }

    searchGenre() {
        const searchedGenre = this.props.genres.filter((genre) =>
            genre.name.toLowerCase().includes(this.state.inputValue.toLowerCase()));

        const searchedMovies = this.state.movies.filter(movie =>
            movie.genre_ids.some(movieGenreId =>
                searchedGenre.some(genre => genre.id === movieGenreId)
            )
        );

        this.setState({ searchedMovies });
    }


    componentDidMount() {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.results,
                    searchedMovies: data.results
                });
                console.log(data.results);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }

    render() {
        const isDropDownOpen = this.state.isDropDownOpen;
        const selectedOption = this.state.selectedOption;
        const { favoriteMovies, addToFavorite, removeFromFavorites, genres } = this.props;

        return (
            <div className="container">
                <Form>
                    <div className='form-container'>
                        <Dropdown isOpen={isDropDownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle className="dropdown" caret>{selectedOption ? selectedOption : "Title"}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptions.TITLE)}>{DropdownOptions.TITLE}</DropdownItem>
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptions.RELEASE_DATE)}>{DropdownOptions.RELEASE_DATE}</DropdownItem>
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptions.GENRE)}>{DropdownOptions.GENRE}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Input className='searchInput' value={this.state.inputValue} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder='Search...' />
                        <Button className="searchButton" onClick={this.handleSearch}>Search</Button>
                    </div>
                </Form>

                <div>
                    <MovieComponent
                        movies={this.state.searchedMovies}
                        favoriteMovies={favoriteMovies}
                        addToFavorite={addToFavorite}
                        removeFromFavorites={removeFromFavorites}
                        genres={genres}
                    />
                </div>
            </div>
        );
    }
}

export default MovieList;