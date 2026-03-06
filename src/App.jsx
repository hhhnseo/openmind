import './App.css'
import KebabMenu from './components/AnswerPage/KebabMenu';
import LikeButton from './components/LikeButton';
import Badge from './components/Badge';

function App() {
  return (
    <>
      <Badge $answerd={true} />
      <Badge $answerd={false} />
    </>

  )
}

export default App;
