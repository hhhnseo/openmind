import { Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Home from './pages/Home';
import QuestionList from './pages/QuestionList';
import Ranking from './pages/Ranking';
import Answer from './pages/Answer';
import Chatbot from './components/chatbot/ChatBot';
import Post from './pages/Post';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<QuestionList />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/post/:id/answer" element={<Answer />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
