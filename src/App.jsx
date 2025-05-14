import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/productos/:id" element={<ItemDetailContainer />} />
        <Route path="/categoria:idCat" element={<ItemDetailContainer />} />
        <Route path="*" element={<h1>Página no encontrada (404)</h1>} />
      </Routes>
    </>
  );
}

export default App


