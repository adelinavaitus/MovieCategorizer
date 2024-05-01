import React, { Component } from "react";
import { Media } from "reactstrap";
import MovieComponent from "./MovieComponent";

// Favorites page component
class Favorites extends Component {
    constructor(props) {
        super(props);

        // Initialize state to manage the number of movies that should be displayed on a page
        this.state = {
            numberOfMoviesPerPage: 8
        }

        // Create a ref to MovieComponent to access its methods
        this.movieComponentRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        // Check if the number of favorite movies has changes
        if (prevProps.favoriteMovies.length !== this.props.favoriteMovies.length) {
            //If the number of fav movies is less than or equal to the number of movies per page
            if (this.props.favoriteMovies.length <= this.state.numberOfMoviesPerPage) {
                // Reset the pagination to the first page
                if (this.movieComponentRef.current) {
                    this.movieComponentRef.current.handlePaginationReset(0);
                }
            }
        }
    }

    render() {
        const { favoriteMovies, removeFromFavorites, addToFavorite, genres } = this.props;

        return (
            <div className="container">
                <h3 className="center">Favorite Movies</h3>
                <Media list>
                    {
                        // Render MovieComponent if there are favorite movies, otherwise display a message
                        favoriteMovies && favoriteMovies.length > 0 ?
                            <MovieComponent
                                movies={favoriteMovies}
                                favoriteMovies={favoriteMovies}
                                addToFavorite={addToFavorite}
                                removeFromFavorites={removeFromFavorites}
                                genres={genres}
                                ref={this.movieComponentRef}        // Pass the ref to access MovieComponent's methods
                            />
                            :
                            <div className="center">
                                <p>Save your favorite movies and they will appear here</p>
                            </div>
                    }
                </Media>
            </div>
        )
    }
}

export default Favorites;