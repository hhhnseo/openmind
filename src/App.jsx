import { Routes, Route } from 'react-router-dom';
import './index.css';
import AnswerPage from './pages/AnswerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AnswerPage />} />
    </Routes>
  )

}

export default App;