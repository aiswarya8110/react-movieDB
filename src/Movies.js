import React from 'react';
import { AppContext } from './context';
import { Link } from 'react-router-dom';

const noImgPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

class Movies extends React.Component{
    render(){
        if(this.context.loading)
        return <div className="loading" />

        return <section className="movies">
            {this.context.movies.map((movie)=>{
                const { imdbID: movieId, Poster: image, Title:title, Year:year } = movie;
                return (
                    <Link key={movieId} to={`/movies/${movieId}`} className="movie">
                        <article>
                            <img src={image === "N/A" ? noImgPlaceholder : image} alt={title} />
                            <div className="movie-info">
                                <h4>{title}</h4>
                                <p>{year}</p>
                            </div>
                        </article>
                    </Link>
                )
            })}
        </section>
    }
}

Movies.contextType = AppContext;

export default Movies;