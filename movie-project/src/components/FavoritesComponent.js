import React, { Component } from "react";
import { Media } from "reactstrap";
import MovieComponent from "./MovieComponent";

class Favorites extends Component {
    constructor(props) {
        super(props);

        this.setStartDisplayIndex = this.setStartDisplayIndex.bind(this);
    }

    setStartDisplayIndex(startDisplayIndex) {
        this.setState({ startDisplayIndex })
    }

    render() {
        const { favoriteMovies, removeFromFavorites, addToFavorite, genres } = this.props;

        return (
            <div className="container">
                <h3 className="center">Favorite Movies</h3>
                <Media list>
                    {
                        favoriteMovies && favoriteMovies.length > 0 ?
                            <MovieComponent
                                movies={favoriteMovies}
                                favoriteMovies={favoriteMovies}
                                addToFavorite={addToFavorite}
                                removeFromFavorites={removeFromFavorites}
                                genres={genres}
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