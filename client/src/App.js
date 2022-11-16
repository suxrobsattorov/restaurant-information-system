import React from 'react'
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import ListProduct from './products/ListProduct';
import ViewProduct from './products/ViewProduct';
import ViewCustomer from "./customers/ViewCustomer";
import ListCustomer from "./customers/ListCustomer";


export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/product" index element={<ListProduct/>}/>
                <Route path="/product/:id" element={<ViewProduct tailwindcss init/>}/>
                <Route path="/customer" index element={<ListCustomer/>}/>
                <Route path="/customer/:id" element={<ViewCustomer tailwindcss init/>}/>
            </Routes>
        </Router>
    );
}

