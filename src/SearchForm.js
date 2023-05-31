import React, { createRef } from 'react';
import { AppContext } from './context';

class Form extends React.Component{
    input = createRef();

    componentDidMount(){
        this.input.current.focus();
    }

    render(){
        return (
            <form onSubmit={(e)=> e.preventDefault()} className="search-form">
                <h2>Search Movies</h2>
                <input type="text"
                ref={this.input}
                value={this.context.query}
                className="form-input" 
                onChange={(e)=> this.context.setQueryHandler(e.target.value)}/>
                {this.context.error.show && <p className="error">{this.context.error.msg}</p>}
            </form>
        )
    }
}

Form.contextType = AppContext;

export default Form;