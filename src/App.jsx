import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import QuestionList from './pages/QuestionList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<QuestionList />} />
      {/* <Route path="/list" element={<Home />} /> */}
    </Routes>
  );
}

export default App;
