import React, { Component } from 'react';
import { Button, Dropdown, Form, DropdownToggle, Input, DropdownItem, DropdownMenu } from 'reactstrap';
import { DropdownOptions } from './DropdownOptions';
import MovieComponent from './MovieComponent';

class MovieList extends Component {

    constructor(props) {
        super(props);

        //Initialize component state
        this.state = {
            movies: [],                 // Holds the list of movies fetched from API
            searchedMovies: [],         // Hold the list of searched movies
            isDropDownOpen: false,      // Flag to indicate if the dropdown is open
            selectedOption: '',         // Hold the selected search option
            inputValue: '',             // Holds the value entered in the search input
        };
    }

    // Function to toggle the dropdown
    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    };

    // Function to handle the selection of search option
    handleOptionSelect = (option) => {
        this.setState({
            selectedOption: option
        });
    };

    // Function to handle input change in the search input
    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    // Function to handle search button click
    handleSearch = () => {
        this.movieComponentRef.handlePaginationReset(0);        // Reset pagination

        // Handle search based on the selected option
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

    // Function to handle key down event in the search input
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.handleSearch();
        }
    }

    // Function to search movies by title
    searchTitle() {
        const searchedMovies = this.state.movies.filter((movie) =>
            movie.title.toLowerCase().includes(this.state.inputValue.toLowerCase()));

        this.setState({ searchedMovies });
    }

    // Function to search movies by release date
    searchReleaseDate() {
        const searchedMovies = this.state.movies.filter((movie) =>
            movie.release_date.includes(this.state.inputValue));

        this.setState({ searchedMovies });
    }

    // Function to search the movies by genre
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

    // Function to fetch movies data from API
    componentDidMount() {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.results,   // set the fetched movies
                    searchedMovies: data.results    // Set the searched movies initally to all fetched movies
                });
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
                        {/* Dropdown for selecting search option */}
                        <Dropdown isOpen={isDropDownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle className="dropdown" caret>{selectedOption ? selectedOption : "Title"}</DropdownToggle>
                            <DropdownMenu>
                                {/* Dropdown options */}
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptions.TITLE)}>{DropdownOptions.TITLE}</DropdownItem>
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptions.RELEASE_DATE)}>{DropdownOptions.RELEASE_DATE}</DropdownItem>
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptions.GENRE)}>{DropdownOptions.GENRE}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        {/* Search input */}
                        <Input className='searchInput' value={this.state.inputValue} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder='Search...' />
                        {/* Search button */}
                        <Button className="searchButton" onClick={this.handleSearch}>Search</Button>
                    </div>
                </Form>

                {/* Render MovieComponent with searched movies */}
                <div>
                    <MovieComponent
                        movies={this.state.searchedMovies}
                        favoriteMovies={favoriteMovies}
                        addToFavorite={addToFavorite}
                        removeFromFavorites={removeFromFavorites}
                        genres={genres}
                        ref={(ref) => this.movieComponentRef = ref}     //References the MovieComponent for accessing its methods
                    />
                </div>
            </div>
        );
    }
}

export default MovieList;