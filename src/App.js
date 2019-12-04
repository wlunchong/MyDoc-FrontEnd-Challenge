import React from 'react';
import './index.css';

import Home from "./pages/Home";

// Install react-router-dom to switch between pages
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path="/favourite">
          <h1>Favourite</h1>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
