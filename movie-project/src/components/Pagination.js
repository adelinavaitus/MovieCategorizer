import React from "react";

function Pagination(props) {
    const { moviesLength, startDisplayIndex, numberOfMovies, setStartDisplayIndex } = props;

    return (
        <div>
            {startDisplayIndex > 0 && <button onClick={() => setStartDisplayIndex(startDisplayIndex - numberOfMovies)} type="button">Prev</button>}
            {startDisplayIndex + numberOfMovies < moviesLength && <button onClick={() => setStartDisplayIndex(startDisplayIndex + numberOfMovies)} type="button">Next</button>}
        </div>
    )

}

export default Pagination;