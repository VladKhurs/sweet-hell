import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import ItemPage from './pages/ItemPage';
import Game from './pages/Game';

function App() {
  return (
    <BrowserRouter basename="/sweet-hell">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="game" element={<Game />} />
          <Route path="category/:categoryId/:itemId" element={<ItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;