import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cities from './components/Cities';
import Search from './components/Seach';
import Weather from './components/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Cities />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
