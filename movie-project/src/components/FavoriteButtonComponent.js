import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);
library.add(solidFaHeart);

const FavoriteButtonComponent = ({ movie, favoriteMovies, addToFavorite, removeFromFavorites }) => {
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

export default FavoriteButtonComponent;