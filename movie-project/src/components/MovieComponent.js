import React, { Component } from 'react';
import { Row, Col, Media, Modal, ModalHeader, ModalBody, Card } from 'reactstrap';
import Pagination from './Pagination';
import FavoriteButtonComponent from './FavoriteButtonComponent';

class MovieComponent extends Component {
    constructor(props) {
        super(props);

        //Initialize component state
        this.state = {
            selectedMovie: null,        // Hold the selected movie for the modal
            startDisplayIndex: 0,       // Holds the starting index of displayed movies for pagination
            numberOfMoviesPerPage: 8    // Number of movies to display per page
        }

        // Bind the methods to the component context
        this.toggleModalMovie = this.toggleModalMovie.bind(this);
        this.setStartDisplayIndex = this.setStartDisplayIndex.bind(this);
    }

    // Function to toggle the movie modal
    toggleModalMovie(movie) {
        this.setState({
            isModalMovieOpen: !this.state.isModalMovieOpen,     // Toggle the modal state
            selectedMovie: movie    // Set the selected movie
        });
    }

    // Function to set the starting display index for paginatiin
    setStartDisplayIndex(startDisplayIndex) {
        this.setState({ startDisplayIndex })
    }

    // Function to reset pagination when called
    handlePaginationReset = (startDisplayIndex) => {
        this.setState({ startDisplayIndex });
    }

    render() {
        const selectedMovie = this.state.selectedMovie;
        const { movies, favoriteMovies, addToFavorite, removeFromFavorites, genres } = this.props;
        const { numberOfMoviesPerPage, startDisplayIndex } = this.state;

        // Filter movies based on pagination settings
        const moviesPerPage = movies.filter((movies, index) =>
            index >= startDisplayIndex && index < startDisplayIndex + numberOfMoviesPerPage)

        // Divide the movies into groups of 4 
        const movieGroups = moviesPerPage.reduce((resultMovieArray, item, index) => {
            const groupIndex = Math.floor(index / 4);

            if (!resultMovieArray[groupIndex]) {
                resultMovieArray[groupIndex] = [];
            }

            resultMovieArray[groupIndex].push(item);

            return resultMovieArray;
        }, []);

        // We render each chunk of movies in a separate row
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
                                        <FavoriteButtonComponent
                                            movie={movie}
                                            favoriteMovies={favoriteMovies}
                                            addToFavorite={addToFavorite}
                                            removeFromFavorites={removeFromFavorites}
                                        />
                                    </div>
                                </div>
                            </Media>
                        </Col>
                    ))}
                </Row>
            );
        });

        return (
            <div className='container'>
                {movieRows}

                {/* Render pagination component if movies exist and exceed the number of movies per page */}
                {
                    movies && movies.length > numberOfMoviesPerPage ?
                        <Pagination
                            moviesLength={movies.length}
                            startDisplayIndex={startDisplayIndex}
                            numberOfMoviesPerPage={numberOfMoviesPerPage}
                            setStartDisplayIndex={this.setStartDisplayIndex}
                        />
                        : null
                }

                {/* Movie modal */}
                <Modal isOpen={this.state.isModalMovieOpen}>
                    {
                        selectedMovie ? (
                            <div>
                                <ModalHeader toggle={this.toggleModalMovie}>{selectedMovie.title}</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col>
                                            <Media object src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                                            <FavoriteButtonComponent
                                                movie={selectedMovie}
                                                favoriteMovies={favoriteMovies}
                                                addToFavorite={addToFavorite}
                                                removeFromFavorites={removeFromFavorites}
                                            />
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
        )
    }
}

export default MovieComponent;