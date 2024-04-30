import React, { Component } from 'react';
import { Media, Row, Col, Modal, ModalHeader, ModalBody, Button, Card, Dropdown, Form, DropdownToggle, Input, DropdownItem, DropdownMenu, FormGroup } from 'reactstrap';
import { DropdownOptions } from './DropdownOptions';
import Pagination from './Pagination';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);
library.add(solidFaHeart);

class MovieList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            genres: [],
            searchedMovies: [],
            isModalMovieOpen: false,
            isDropDownOpen: false,
            selectedMovie: null,
            selectedOption: '',
            inputValue: '',
            startDisplayIndex: 0,
            numberOfMovies: 8,

        };

        this.toggleModalMovie = this.toggleModalMovie.bind(this);
        this.setStartDisplayIndex = this.setStartDisplayIndex.bind(this);
    }

    toggleModalMovie(movie) {
        this.setState({
            isModalMovieOpen: !this.state.isModalMovieOpen,
            selectedMovie: movie
        });
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

    setStartDisplayIndex(startDisplayIndex) {
        this.setState({ startDisplayIndex })
    }

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
        const searchedGenre = this.state.genres.filter((genre) =>
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
        const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

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

        fetch(GENRE_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({ genres: data.genres });
                console.log(data.genres);
            })
            .catch(error => {
                console.error('Error fetching genres from API:', error);
            });
    }

    render() {
        const { searchedMovies } = this.state;
        const selectedMovie = this.state.selectedMovie;
        const genres = this.state.genres;
        const isDropDownOpen = this.state.isDropDownOpen;
        const selectedOption = this.state.selectedOption;
        const startDisplayIndex = this.state.startDisplayIndex;
        const numberOfMovies = this.state.numberOfMovies;
        const { favoriteMovies, addToFavorite, removeFromFavorites } = this.props;

        const favoriteButton = (movie) => {
            return (
                favoriteMovies.some(favMovie => favMovie.id === movie.id) ?
                    <button className='favorite-button' onClick={() => removeFromFavorites(movie)}>
                        <FontAwesomeIcon className="favorite-button-heart" icon={solidFaHeart} size='xl' />
                    </button>
                    :
                    <button className='favorite-button' onClick={() => addToFavorite(movie)}>
                        <FontAwesomeIcon className="favorite-button-heart" icon={faHeart} size='xl' />
                    </button>
            );
        }

        const moviesPerPage = searchedMovies.filter((movies, index) =>
            index >= startDisplayIndex && index < startDisplayIndex + numberOfMovies)

        // Diveded the movies into groups of 4 
        const movieGroups = moviesPerPage.reduce((resultMovieArray, item, index) => {
            const groupIndex = Math.floor(index / 4);

            if (!resultMovieArray[groupIndex]) {
                resultMovieArray[groupIndex] = [];
            }

            resultMovieArray[groupIndex].push(item);

            return resultMovieArray;
        }, []);

        // We render each chunk in a separate row
        const movieRows = movieGroups.map((group, index) => {
            return (
                <Row key={index} className='mt-4'>
                    {group.map(movie => (
                        <Col key={movie.id} sm="3">
                            <Media left middle>
                                <Media onClick={() => this.toggleModalMovie(movie)} object src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            </Media>
                            <Media body className='ml-3'>
                                <div className='movie-overview'>
                                    <Media heading>{movie.title}</Media>
                                    <p >{movie.overview}</p>
                                </div>
                                <div className="readmore-container">
                                    <div className="left-element">
                                        <p className='read-more' onClick={() => this.toggleModalMovie(movie)}>Read more</p>
                                    </div>
                                    <div className="right-element">
                                        {favoriteButton(movie)}
                                    </div>
                                </div>
                            </Media>
                        </Col>
                    ))}
                </Row>
            );
        });

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

                <Media list>
                    {movieRows}
                </Media>

                <Pagination
                    moviesLength={searchedMovies.length}
                    startDisplayIndex={startDisplayIndex}
                    numberOfMovies={numberOfMovies}
                    setStartDisplayIndex={this.setStartDisplayIndex}
                />

                <Modal isOpen={this.state.isModalMovieOpen}>
                    {
                        selectedMovie ? (
                            <div>
                                <ModalHeader toggle={this.toggleModalMovie}>{selectedMovie.title}</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col>
                                            <Media object src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                                            {favoriteButton(selectedMovie)}
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Card>Genres:
                                                    {
                                                        selectedMovie.genre_ids ? selectedMovie.genre_ids.map((genreId) => {
                                                            const genre = genres.find(genre => genre.id === genreId);
                                                            return (<p>{genre.name}</p>);
                                                        }) : null
                                                    }
                                                </Card>
                                            </Row>
                                            <Row>
                                                <Card>Release date: {selectedMovie.release_date}</Card>
                                            </Row>
                                            <Row>
                                                <Card>Description: {selectedMovie.overview}</Card>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ModalBody>
                            </div>
                        ) : null}
                </Modal>
            </div>
        );
    }
}

export default MovieList;