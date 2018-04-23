import React from 'react';
import PropTypes from 'prop-types';

class  App extends  React.Component{


    constructor() {
        super();

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {


        console.log(e);
        console.log(arguments);
    }


    render() {

        return (
            <div>
                Hello <Name name = "Vipul" onClick = {this.handleOnClick}/> !!
            </div>
        )
    }



}

class Name extends React.Component {

    render() {
        return (
            <span>
                {this.props.name}

                <button onClick={this.props.onClick}>Click</button>
            </span>
        )
    }
}

Name.propTypes = {
    name: PropTypes.string.isRequired
};

export default App;