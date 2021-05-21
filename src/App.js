import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Vote from './components/Vote';
import Results from './components/Results';
import Archive from './components/Archive';
import Data from './components/Data';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/movie-list'>
            <MovieList />
          </Route>
          <Route path='/vote'>
            <Vote />
          </Route>
          <Route path='/results'>
            <Results />
          </Route>
          <Route path='/archive'>
            <Archive />
          </Route>
          <Route path='/data'>
            <Data />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
