import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';

// Add heart icons to the FontAwesome icon library
library.add(faHeart);
library.add(solidFaHeart);

//FavoriteButtonComponent component
const FavoriteButtonComponent = ({
    movie,                  // The movie for which the favorite button is being rendered
    favoriteMovies,         // The list of favorite movies
    addToFavorite,          // Function to add a movie to the list of favorite movies
    removeFromFavorites     // Function to remove a movie from the list of favorite movies
}) => {
    return (
        // Check if the movie is already in the favorite list and display the corresponding button
        favoriteMovies.some(favMovie => favMovie.id === movie.id) ?
            //If the movie is already in the favorite list, then display the remove from favorites button
            <button className='favorite-button' onClick={() => removeFromFavorites(movie)}>
                <FontAwesomeIcon className="favorite-button-heart" icon={solidFaHeart} size='xl' />
            </button>
            :
            // If the movie is not in the favorite list, then display add to favorites button
            <button className='favorite-button' onClick={() => addToFavorite(movie)}>
                <FontAwesomeIcon className="favorite-button-heart" icon={faHeart} size='xl' />
            </button>
    );
}

export default FavoriteButtonComponent;