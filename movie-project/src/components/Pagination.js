import React from "react";
import { Button } from "reactstrap";

function Pagination(props) {
    const {
        moviesLength,           // Total number of movies in the list
        startDisplayIndex,      //Index of the first movie displayed on the current page
        numberOfMoviesPerPage,  // Maximum number of movies to display per page
        setStartDisplayIndex    // Function to update the start index display, used to navigate between pages
    } = props;

    return (
        <div className="pagination-container">
            {/* Previous button */}
            {startDisplayIndex > 0 ?        // Check if there are movies before the current page
                // If there are, render a clickable button
                <Button className="pagination-button"
                    onClick={() => setStartDisplayIndex(startDisplayIndex - numberOfMoviesPerPage)}
                    type="button">
                    Prev
                </Button>
                // If there are not, render a disabled button
                : <Button className="pagination-button" disabled type="button">
                    Prev
                </Button>
            }

            {/* Next button */}
            {startDisplayIndex + numberOfMoviesPerPage < moviesLength ? //Check if there are movies after the current page
                // If there are, render a clickable button
                <Button className="pagination-button"
                    onClick={() => setStartDisplayIndex(startDisplayIndex + numberOfMoviesPerPage)}
                    type="button">
                    Next
                </Button>
                // If there are not, render a disabled button
                : <Button className="pagination-button" disabled type="button">
                    Next
                </Button>
            }
        </div>
    )
}

export default Pagination;