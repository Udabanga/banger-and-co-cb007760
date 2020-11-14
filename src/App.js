import Navigation from './components/Navigation'
import CarListing from './pages/CarListing'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NoMatch from './pages/NoMatch'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from 'react';
import {AuthProvider} from './AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css'

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
      <Navigation/>
      
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/CarListing" component={CarListing} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
        </AuthProvider>
    </React.Fragment>
  );
}

export default App;
