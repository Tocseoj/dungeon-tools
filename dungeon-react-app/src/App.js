import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './layouts/App.css';

// import TurnTracker from './components/TurnTracker';
import SpotifyPlaylists from './components/SpotifyPlaylists';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const session = new URLSearchParams(props.location.search).get('session');
    if (session) {
      this.state = {
        session: session
      };
      props.cookies.set('session', session, { path: '/' });
      props.history.push('/');
      console.log("Test")
    }
    else {
      this.state = {
        session: props.cookies.get('session') || ""
      };
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

          <SpotifyPlaylists />

        </header>
      </div>
    );
  }
}

export default withCookies(App);
