import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import ItemPage from './pages/ItemPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="category/:categoryId/:itemId" element={<ItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;