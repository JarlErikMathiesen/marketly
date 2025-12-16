import { React, useState, useEffect } from 'react';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Contact } from './components/pages/Contact';
import { Home } from './components/pages/Home';
import { Product } from './components/pages/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
