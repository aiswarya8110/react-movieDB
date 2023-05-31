import React from 'react';
import Form from './SearchForm';
import Movies from './Movies';

class Home extends React.Component{
    render(){
        return (
            <main>
                <Form/>
                <Movies/>
            </main>
        )
    }
}

export default Home;