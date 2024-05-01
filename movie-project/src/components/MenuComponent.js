import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function Menu(props) {
    return (
        // Navbar component for navigation
        <Navbar dark>
            <div className="navbar-container">
                {/* Logo or application name - left element */}
                <div className="left-element">
                    <Link to="/" className="navbar-link">Movie Aplication</Link>
                </div>
                {/* Link to the favorites page - right element */}
                <div className="right-element">
                    <Link to="/favorites" className="navbar-link">
                        <FontAwesomeIcon className="favorite-link" icon={faHeart} size='lg' />
                        Favorites
                    </Link>
                </div>
            </div>
        </Navbar>
    )
}

export default Menu;