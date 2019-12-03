import React from 'react';
import './App.css';

// Install react-router-dom to switch between pages
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/favourite">
            <h1>Favourite</h1>
          </Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
