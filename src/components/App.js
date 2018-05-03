import React from 'react';

import {HashRouter as Router, Link, Route, Redirect} from 'react-router-dom';



const Home = (props) => {

    return (
        <div> Home</div>
    )
}


const About = (props) => {
    return (
        <div> About</div>
    )
}

const TestComponent = (props) => {

    return (
        null
        // <DynamicComponent load={() => import("./Test")}>
        //
        //     {(Component) => {
        //
        //         return Component=== null ? <div>Loading</div>: <Component {...props}/>
        //     }
        //
        //     }
        //
        // </DynamicComponent>
    )

}

class DynamicComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            component:null
        }
    }

    componentDidMount() {
        this.props.load().then((mod) => {
            this.setState(() => ({component: mod.default}))
        })
    }

    render() {
        return this.props.children(this.state.component);
    }

}


const CustomLink = (props) => {

    return (
        <Route exact={props.exact} path={props.to} children={(innerProps) => {

            return (
                <div>

                    {innerProps.match ? '>' : ''}
                        <Link to={props.to} >
                            {props.children}
                        </Link>
                </div>
            )
        }}/>
    )
}

const Topic= (props) => {

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li><CustomLink to="/topics/1">Topic 1</CustomLink></li>
                <li><CustomLink to="/topics/2">Topic 1</CustomLink></li>
                <li><CustomLink to="/topics/3">Topic 1</CustomLink></li>
            </ul>

            <Route path = "/topics/:topicId" component={TestComponent}/>
            <Route exact path = {props.match.url} component={() => (<h3>Select topic</h3>)}/>
        </div>
    )
}


const ProtectedRoute = ({component: Component, ...rest}) => {



    return (

        <Route {...rest}  render = {(innerProps) => {

            return(
                fakeAuth.isauth === true? <Component {...innerProps}/> :
                <Redirect to="/login"/>
            )

        }} />

    )
}


const fakeAuth = {
    isauth: false,
    login(cb) {
        this.isauth= true;
        return cb();
    },
    logout(cb) {
        this.isauth = false;
        return cb();
    }
}


const Protected = (props) => (<div>Protected</div>);

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: fakeAuth.isauth
        }


        this.login = this.login.bind(this);

    }

    login() {
        fakeAuth.login(() => {
            this.setState({isLoggedIn: true});
        })
    }


    render() {

        if (this.state.isLoggedIn === true) {
            return <Redirect to="/protected"/>;
        }


        return (<div><h2>Login</h2> <button onClick={this.login}> Click to login</button></div>)

    }




}

class  App extends  React.Component{

    render() {

        return (
            <Router>

                <div>

                    <ul>

                        <li><Link to="/">Home</Link></li>
                        <li><Link to={{pathname: '/about', search: '?name=vipul'}}>About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                        <li><Link to="/protected">Protected</Link></li>

                    </ul>


                    <hr/>

                    <Route path = "/" exact={true} component={Home}/>
                    <Route path = "/about" component={About}/>
                    <Route path = "/topics" component={Topic}/>
                    <Route path = "/login" component={Login}/>
                    <ProtectedRoute path = "/protected" component = {Protected}/>

                </div>
            </Router>
        )
    }
}


export default App;