import React from "react";
import { Button } from "reactstrap";

function Pagination(props) {
    const { moviesLength, startDisplayIndex, numberOfMovies, setStartDisplayIndex } = props;

    return (
        <div className="pagination-container">
            {startDisplayIndex > 0 ?
                <Button className="pagination-button" onClick={() => setStartDisplayIndex(startDisplayIndex - numberOfMovies)} type="button">Prev</Button>
                : <Button className="pagination-button" disabled type="button">Prev</Button>}
            {startDisplayIndex + numberOfMovies < moviesLength ?
                <Button className="pagination-button" onClick={() => setStartDisplayIndex(startDisplayIndex + numberOfMovies)} type="button">Next</Button>
                : <Button className="pagination-button" disabled type="button">Next</Button>}
        </div>
    )

}

export default Pagination;