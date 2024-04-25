import React, {Component} from 'react';
import {Media} from 'reactstrap';

class MovieList extends Component{

    constructor(props){
        super(props);

        this.state = {
            movies: []
        };
    }

    componentDidMount(){
        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({ movies: data.results });
                console.log(data.results);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });

    }

    render(){

        const menu = this.state.movies.map((movie)=> {
            return (
                <div key={movie.id} className='col-12 mt-5'>
                    <Media tag="li">
                        <Media body className='ml-5'>
                            <Media left middle>
                                <Media object src= {`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
                            </Media>
                            <Media heading>{movie.original_title}</Media>
                            <p>{movie.overview}</p>
                        </Media>
                    </Media>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Media list>
                        {menu}
                    </Media>
                </div>
            </div>
        );
    }
}

export default MovieList;