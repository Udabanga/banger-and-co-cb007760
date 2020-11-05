import logo from './logo.svg';
import Navigation from './components/Navigation'
import CarListing from './pages/CarListing'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <React.Fragment>
      <Navigation/>
      
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/CarListing" component={CarListing} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
