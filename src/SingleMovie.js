import React from 'react';
import { withRouter } from 'react-router';
import { API_ENDPOINT } from './context';
import { Link } from 'react-router-dom';

class SingleMovie extends React.Component{
    state = {loading: true, movie: {}, error: {show: false, msg: ""}}
    async fetchMovies(url){
        const response = await fetch(url);
        const data = await response.json();
        if(data.Response === "True"){
            this.setState({loading: false, movie: data})
        }
        else{
            this.setState({loading: false, error: {show: true, msg: data.Error}})
        }
    }
    componentDidMount(){
        const {params: { movieId }} = this.props.match;
        this.fetchMovies(`${API_ENDPOINT}&i=${movieId}`);
    }
    render(){
        if(this.state.loading)
        return <div className="loading"/>

        if(this.state.error.show)
        return (
            <div className="page-error">
                <h1>{this.state.error.msg}</h1>
                <Link className="btn" to="/" >
                    back to movies
                </Link>
            </div>
        )

        const { Poster:image, Title: title, Plot:plot, Year:year } = this.state.movie;

        return (
        <section className="single-movie">
            <img src={image} alt={title}/>
            <div className="single-movie-info">
                <h2>{title}</h2>
                <p>{plot}</p>
                <h4>{year}</h4>
                <Link to="/" className="btn">
                    back to movies
                </Link>
            </div>
        </section>
        )
    }
}

export default withRouter(SingleMovie);