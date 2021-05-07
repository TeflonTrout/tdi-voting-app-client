import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import Vote from './components/Vote';
import Results from './components/Results';

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
          <Route>
            <Results />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
