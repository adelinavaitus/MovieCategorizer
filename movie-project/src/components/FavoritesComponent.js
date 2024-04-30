import React, { Component } from "react";
import { Row, Col, Media } from "reactstrap";
import Pagination from './Pagination';

class Favorites extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDisplayIndex: 0,
            numberOfMovies: 8
        }

        this.setStartDisplayIndex = this.setStartDisplayIndex.bind(this);
    }

    setStartDisplayIndex(startDisplayIndex) {
        this.setState({ startDisplayIndex })
    }

    render() {
        const { favoriteMovies, removeFromFavorites } = this.props;
        const { numberOfMovies, startDisplayIndex } = this.state

        const moviesPerPage = favoriteMovies.filter((movies, index) =>
            index >= startDisplayIndex && index < startDisplayIndex + numberOfMovies)

        const movieGroups = moviesPerPage.reduce((resultMovieArray, item, index) => {
            const groupIndex = Math.floor(index / 4);

            if (!resultMovieArray[groupIndex]) {
                resultMovieArray[groupIndex] = [];
            }

            resultMovieArray[groupIndex].push(item);

            return resultMovieArray;
        }, []);

        const movieRows = movieGroups.map((group, index) => {
            return (
                <Row key={index} className='mt-4'>
                    {group.map(movie => (
                        <Col key={movie.id} sm="3">
                            <Media left middle>
                                <Media onClick={() => this.toggleModalMovie(movie)} object src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            </Media>
                            <Media body className='ml-3'>
                                <Media heading>{movie.title}</Media>
                                <p>{movie.overview}</p>
                            </Media>
                            <button className='favorite-button-remove' onClick={() => removeFromFavorites(movie)}>Remove from favorites</button>
                        </Col>
                    ))}
                </Row>
            );
        });

        return (
            <div className="container">
                <h3 className="center">Favorite Movies</h3>
                <Media list>
                    {
                        favoriteMovies && favoriteMovies.length > 0 ? movieRows :
                            <div className="center">
                                <p>Save your favorite movies and they will appear here</p>
                            </div>
                    }
                </Media>

                {
                    favoriteMovies && favoriteMovies.length > 0 ?
                        <Pagination
                            moviesLength={favoriteMovies.length}
                            startDisplayIndex={startDisplayIndex}
                            numberOfMovies={numberOfMovies}
                            setStartDisplayIndex={this.setStartDisplayIndex}
                        />
                        : null
                }
            </div>
        )
    }
}

export default Favorites;