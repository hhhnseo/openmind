import './App.css'
import CardFrame from './components/common/CardFrame';

function App() {
  const questions = [
    {
      id: 1,
      question: "좋아하는 음식?",
      answers: "피자"
    },
    {
      id: 2,
      question: "좋아하는 음식?",
      answers: []
    },
    {
      id: 3,
      question: "좋아하는 음식?",
      answers: "치킨"
    }
  ];

  return (
    <div>
      <CardFrame questions={questions} showMenu={true} />
    </div>
  )
}

export default App;
