import { Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Home from './pages/Home';
import QuestionList from './pages/QuestionList';
import Ranking from './pages/Ranking';
import Answer from './pages/Answer';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<QuestionList />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/post/:id/answer" element={<Answer />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
