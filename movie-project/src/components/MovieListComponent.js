import React, { Component } from 'react';
import { Button, Dropdown, Form, DropdownToggle, Input, DropdownItem, DropdownMenu } from 'reactstrap';
import { DropdownOptionsSearch, DropdownOptionsOrder } from './DropdownOptions';
import MovieComponent from './MovieComponent';

class MovieList extends Component {

    constructor(props) {
        super(props);

        //Initialize component state
        this.state = {
            movies: [],                 // Holds the list of movies fetched from API
            searchedMovies: [],         // Hold the list of searched movies
            isDropDownOpen: false,      // Flag to indicate if the search dropdown is open
            isDropDownOpenDate: false,  // Flag to indicate if the order dropdown is open
            selectedOption: '',         // Holds the selected search option
            selectedOptionDate: '',     // Holds the selected date order option
            inputValue: '',             // Holds the value entered in the search input
        };
    }

    // Function to toggle the dropdown
    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    };

    // Function to toggle the dropdown
    toggleDropdownDate = () => {
        this.setState((prevState) => ({
            isDropDownOpenDate: !prevState.isDropDownOpenDate
        }));
    };

    // Function to handle the selection of search options
    handleOptionSelect = (option) => {
        this.setState({
            selectedOption: option
        });
    };

    // Function tp handle the selection of dropdown options
    handleOptionSelectOrder = (option) => {
        this.setState({
            selectedOptionDate: option
        });

        let searchedMovies = this.state.searchedMovies;

        // Apply sorting to the searched movies list based on the selected option
        searchedMovies = this.handleDataOrder(option, searchedMovies);

        this.setState({
            searchedMovies: searchedMovies
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
            case DropdownOptionsSearch.TITLE:
                this.searchTitle();
                break;
            case DropdownOptionsSearch.GENRE:
                this.searchGenre();
                break;
            default:
                this.searchTitle();
                break;
        }
    }

    // Function to handle sorting options for date
    handleDataOrder = (option, movies) => {
        switch (option) {
            case DropdownOptionsOrder.NEW:
                movies = this.handleOrderDescending(movies);
                break;
            case DropdownOptionsOrder.OLD:
                movies = this.handleOrderAscending(movies);
                break;
            default:
                console.error("Invalid option for date order:", option);
        }

        return movies;
    }

    // Function to sort movies in descending order by release order
    handleOrderDescending(searchedMovies) {
        const sortedMovies = searchedMovies.sort((movie1, movie2) =>
            new Date(movie2.release_date) - new Date(movie1.release_date));

        return sortedMovies;
    }

    // Function to sort movies in ascending order by release date
    handleOrderAscending(searchedMovies) {
        const sortedMovies = searchedMovies.sort((movie1, movie2) =>
            new Date(movie1.release_date) - new Date(movie2.release_date));

        return sortedMovies;
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
        let searchedMovies = this.state.movies.filter((movie) =>
            movie.title.toLowerCase().includes(this.state.inputValue.toLowerCase()));

        searchedMovies = this.handleDataOrder(this.state.selectedOptionDate, searchedMovies);

        this.setState({ searchedMovies });
    }

    // Function to search the movies by genre
    searchGenre() {
        const searchedGenre = this.props.genres.filter((genre) =>
            genre.name.toLowerCase().includes(this.state.inputValue.toLowerCase()));

        let searchedMovies = this.state.movies.filter(movie =>
            movie.genre_ids.some(movieGenreId =>
                searchedGenre.some(genre => genre.id === movieGenreId)
            )
        );

        searchedMovies = this.handleDataOrder(this.state.selectedOptionDate, searchedMovies);

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
        const { isDropDownOpen, selectedOption, isDropDownOpenDate, selectedOptionDate } = this.state;
        const { favoriteMovies, addToFavorite, removeFromFavorites, genres } = this.props;

        return (
            <div className="container">
                <Form>
                    <div className='form-container'>
                        {/* Dropdown for selecting search option */}
                        <Dropdown isOpen={isDropDownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle className="dropdown-toggle" caret>{selectedOption ? selectedOption : "Title"}</DropdownToggle>
                            <DropdownMenu>
                                {/* Dropdown options */}
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptionsSearch.TITLE)}>{DropdownOptionsSearch.TITLE}</DropdownItem>
                                <DropdownItem onClick={() => this.handleOptionSelect(DropdownOptionsSearch.GENRE)}>{DropdownOptionsSearch.GENRE}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        {/* Search input */}
                        <Input className='searchInput' value={this.state.inputValue} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder='Search...' />
                        {/* Search button */}
                        <Button className="searchButton" onClick={this.handleSearch}>Search</Button>
                    </div>
                </Form>

                <div className="dropdown-menu-right">
                    {/* Dropdown for selecting released date order option */}
                    <Dropdown isOpen={isDropDownOpenDate} toggle={this.toggleDropdownDate} >
                        <DropdownToggle className="dropdown-date" caret>{selectedOptionDate ? selectedOptionDate : "Order by"}</DropdownToggle>
                        <DropdownMenu >
                            {/* Dropdown options */}
                            <DropdownItem onClick={() => this.handleOptionSelectOrder(DropdownOptionsOrder.NEW)}>{DropdownOptionsOrder.NEW}</DropdownItem>
                            <DropdownItem onClick={() => this.handleOptionSelectOrder(DropdownOptionsOrder.OLD)}>{DropdownOptionsOrder.OLD}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

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