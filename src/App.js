import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <main className="app">
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
