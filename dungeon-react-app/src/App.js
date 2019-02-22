import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import cookie from 'react-cookies'
import './layouts/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    var session = new URLSearchParams(props.location.search).get('session');
    if (session) {
      this.state = {
        session: session
      };
      props.cookies.set('session', session, { path: '/' });
      props.history.push('/');
      console.log("Test")
    }
    else {
      session = props.cookies.get('session')
      if (session) {
        this.state = {
          session: session
        };
      } else {
        session = cookie.load('session')
        this.state = {
          session: session || ""
        };
      }
      
    }
  }

  spotifyLogout(name) {
    const { cookies } = this.props;
 
    cookies.set('session', '', { path: '/' });
    this.setState({ session: '' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            style={{position: 'absolute', top:0, right:0}}
            className="App-link"
            href="http://localhost:5907/auth/spotify"
          >
            Login to Spotify
          </a>


        </header>
      </div>
    );
  }
}

export default withCookies(App);
