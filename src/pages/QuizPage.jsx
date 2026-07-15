// src/pages/QuizPage.jsx
// Single generic quiz engine — replaces all 5 separate quiz HTML pages.
// Driven by useParams() to get the module key, loads data from quizData.js.
// React state replaces all DOM manipulation. Saves score to Firestore on finish.

import { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QUIZ_META } from '../data/quizData';
import { saveScore } from '../services/scoreService';
import '../styles/quizstyle.css';

const PASS_THRESHOLD = 6; // score > 5 = pass (matches original logic)

export default function QuizPage() {
  const { moduleKey } = useParams();
  const navigate      = useNavigate();
  const { user }      = useAuth();

  // Find quiz metadata + questions by route param
  const quiz = QUIZ_META.find((q) => q.key === moduleKey);

  // --- Guard: unknown quiz key ---
  if (!quiz) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#fff', background: '#001e4d', minHeight: '100vh' }}>
        <h2>Quiz not found.</h2>
        <Link to="/quiz" style={{ color: '#1DE9B6' }}>← Back to Quizzes</Link>
      </div>
    );
  }

  const questions = quiz.data;

  // --- State ---
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [score,        setScore]            = useState(0);
  const [result,       setResult]           = useState('');      // per-question feedback
  const [answered,     setAnswered]         = useState(false);   // lock options after pick
  const [selectedOpt,  setSelectedOpt]      = useState(null);
  const [quizDone,     setQuizDone]         = useState(false);
  const [saving,       setSaving]           = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  // --- Answer handler (mirrors checkAnswer() from original JS) ---
  const handleAnswer = useCallback(
    async (option) => {
      if (answered) return; // prevent double-click
      setAnswered(true);
      setSelectedOpt(option);

      const isCorrect = option === currentQuestion.answer;
      const newScore  = isCorrect ? score + 1 : score;

      if (isCorrect) {
        setResult('Correct answer!');
      } else {
        setResult(`Wrong answer! Correct answer: ${currentQuestion.answer}`);
      }

      // Short delay so the user sees the green/red color before advancing
      setTimeout(async () => {
        const nextIndex = currentIndex + 1;

        if (nextIndex < questions.length) {
          setCurrentIndex(nextIndex);
          setAnswered(false);
          setSelectedOpt(null);
          setResult('');
          setScore(newScore);
        } else {
          // Quiz done — save to Firestore
          setScore(newScore);
          setQuizDone(true);
          if (user) {
            setSaving(true);
            try {
              await saveScore(user.uid, moduleKey, newScore);
            } catch (e) {
              console.error('Score save failed:', e);
            } finally {
              setSaving(false);
            }
          }
        }
      }, 900);
    },
    [answered, currentIndex, currentQuestion, questions.length, score, user, moduleKey]
  );

  // --- Reset (Try Again) ---
  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setResult('');
    setAnswered(false);
    setSelectedOpt(null);
    setQuizDone(false);
  };

  // --- Score screen (mirrors showScore() from original JS) ---
  if (quizDone) {
    const passed = score > PASS_THRESHOLD;
    return (
      <div style={{ background: '#001e4d', minHeight: '100vh' }}>
        <div className="quiz-container">
          <h1>{quiz.label} QUIZ</h1>

          <div id="question" style={{ fontSize: '20px', marginBottom: '20px' }}>
            {passed
              ? `CONGRATS YOU HAVE PASSED THE TEST .. CONTINUE FOR NEXT TEST ${score} OUT OF ${questions.length}`
              : `You have scored less marks, please try again the quiz ${score} OUT OF ${questions.length}`
            }
          </div>

          {saving && (
            <div id="result" style={{ color: '#555', fontStyle: 'italic' }}>
              Saving score...
            </div>
          )}

          <div className="quiz-actions">
            <button className="action-btn" onClick={handleReset}>TRY AGAIN</button>
            <button className="action-btn" onClick={() => navigate(quiz.nextRoute)}>
              {quiz.nextLabel.toUpperCase()}
            </button>
          </div>
        </div>

        <div className="bottom">
          <button className="backbut" onClick={() => navigate('/quiz')}>BACK TO QUIZZES</button>
        </div>
      </div>
    );
  }

  // --- Active quiz screen ---
  return (
    <div style={{ background: '#001e4d', minHeight: '100vh' }}>
      <div className="quiz-container">
        <h1>{quiz.label} QUIZ</h1>

        {/* Progress bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="question-counter">
          Question {currentIndex + 1} of {questions.length}
        </div>

        {/* Question */}
        <div id="question">
          {currentIndex + 1}. {currentQuestion.question}
        </div>

        {/* Options */}
        <div id="options" className="option-container">
          {currentQuestion.options.map((option) => {
            let btnClass = 'option-btn';
            if (answered && option === currentQuestion.answer) btnClass += ' correct';
            else if (answered && option === selectedOpt)       btnClass += ' wrong';

            return (
              <button
                key={option}
                className={btnClass}
                onClick={() => handleAnswer(option)}
                disabled={answered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Per-question feedback */}
        <div id="result">{result}</div>
      </div>

      <div className="bottom">
        <button className="backbut" onClick={() => navigate('/quiz')}>BACK TO QUIZZES</button>
      </div>
    </div>
  );
}
