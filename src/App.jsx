import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer'
import { ProductosProvider } from './core/providers/ProductosProvider'
import { CarritoProvider } from './core/providers/CarritoProvider.jsx';
import Carrito from './components/Carrito/Carrito.jsx';
import Checkout from './components/Checkout/Checkout';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <CarritoProvider>
    <ProductosProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/productos/:id" element={<ItemDetailContainer />} />
          <Route path="*" element={<div className="not-found-center"><h1>Página no encontrada (404) 😕</h1></div>} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </ProductosProvider>
    <ToastContainer autoClose={2000} position="bottom-right"/>
    </CarritoProvider>
  );
}

export default App