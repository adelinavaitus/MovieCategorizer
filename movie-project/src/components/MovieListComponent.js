import React, { Component } from 'react';
import { Media, Row, Col, Modal, ModalHeader, ModalBody, Card, ModalFooter } from 'reactstrap';

class MovieList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            genres: [],
            isModalMovieOpen: false,
            selectedMovie: null
        };

        this.toggleModalMovie = this.toggleModalMovie.bind(this);
    }

    toggleModalMovie(movie) {
        this.setState({
            isModalMovieOpen: !this.state.isModalMovieOpen,
            selectedMovie: movie
        });
    }

    componentDidMount() {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({ movies: data.results });
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

        const movies = this.state.movies;
        const selectedMovie = this.state.selectedMovie;
        const genres = this.state.genres;

        // Diveded the movies into groups of 4 
        const movieGroups = movies.reduce((resultMovieArray, item, index) => {
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
                                <Media onClick={() => this.toggleModalMovie(movie)} object src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
                            </Media>
                            <Media body className='ml-3'>
                                <Media heading>{movie.original_title}</Media>
                                <p>{movie.overview}</p>
                            </Media>
                        </Col>
                    ))}
                </Row>
            );
        });

        return (
            <div className="container">
                <Media list>
                    {movieRows}
                </Media>

                <Modal isOpen={this.state.isModalMovieOpen}>
                    {
                        selectedMovie ? (
                            <div>
                                <ModalHeader toggle={this.toggleModalMovie}>{selectedMovie.original_title}</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col>
                                            <Media object src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={selectedMovie.original_title} />
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