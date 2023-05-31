import React, { createContext } from 'react';

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

export const AppContext = createContext();

export class AppContextProvider extends React.Component{
    constructor(){
        super();
        this.setQueryHandler = this.setQueryHandler.bind(this);
    }
    state = {loading: true, error: {show: false, msg: ''}, movies: [], query: "batman"}

    setQueryHandler(inputValue){
        this.setState({query: inputValue})
    }

    async fetchMovies(url){
        this.setState({loading: true});
        try{
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if(data.Response === "True"){
                this.setState((prevState)=>{
                    return {movies: data.Search, 
                            error: {...prevState.error, show: false}
                        }
                })
            }
            else{
                console.log(data);
                this.setState({error:{show: true, msg: data.Error}})
            }
            this.setState({loading: false});
        }catch(error){
            console.log(error);
        }
    }

    componentDidMount(){
        this.fetchMovies(`${API_ENDPOINT}&s=${this.state.query}`);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.query !== this.state.query){
            this.fetchMovies(`${API_ENDPOINT}&s=${this.state.query}`);
        }
    }

    render(){
        const { children } = this.props;
        const { loading, movies, error, query } = this.state;
        return <AppContext.Provider value={{loading, movies, error, query, setQueryHandler: this.setQueryHandler}}>
            {children}
        </AppContext.Provider>
    }
}