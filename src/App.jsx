import { Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Home from './pages/Home';
import QuestionList from './pages/QuestionList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<QuestionList />} />
    </Routes>
  );
}

export default App;