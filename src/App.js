import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <main className="app">
        <Router>
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </Router>
    </main>
  );
}

export default App;
