import React from 'react';



export default class TestComponent extends React.Component {

    render() {

    console.log(this.props);

        return (<div>Hello test {this.props.match.params.topicId} </div>)

    }
}
