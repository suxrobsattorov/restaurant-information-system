import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import List from './products/List';
import ViewProduct from './products/ViewProduct';


export default function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<List />} />
        <Route path="/products/:id" element={<ViewProduct tailwindcss init/>} />
      </Routes>
    </Router>
  );
}

