// src/pages/QuizHomePage.jsx
// Mirrors quizeshomepage.html: flip cards for all 5 quiz categories.
// Fixed the broken HTML nesting from the original.

import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { QUIZ_META } from '../data/quizData';
import '../styles/AR.css';

export default function QuizHomePage() {
  // Split into rows: first row 2 cards, second row 2, last row 1 (TAXES)
  const row1 = QUIZ_META.slice(0, 2);
  const row2 = QUIZ_META.slice(2, 4);
  const row3 = QUIZ_META.slice(4);

  const FlipCard = ({ quiz }) => (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {quiz.key === 'taxes'
            ? <span className="tax">{quiz.label}</span>
            : <span className="text">{quiz.label}</span>
          }
        </div>
        <div className="flip-card-back">
          <h1>{quiz.label}</h1>
          <p>
            {quiz.description}
            <br /><br />
            <Link to={`/quiz/${quiz.key}`}>GET INTO QUIZ</Link>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="OVERALL">
        {row1.map((q) => <FlipCard key={q.key} quiz={q} />)}
      </div>

      <div className="OVERALL">
        {row2.map((q) => <FlipCard key={q.key} quiz={q} />)}
      </div>

      <div className="LAST">
        {row3.map((q) => <FlipCard key={q.key} quiz={q} />)}
      </div>
    </>
  );
}
