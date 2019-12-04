import React from 'react';
import './index.css';

import Home from "./pages/Home";
import ViewSaved from "./pages/ViewSaved";

// Install react-router-dom to switch between pages
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path="/saved" component={ViewSaved}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
