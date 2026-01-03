// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;